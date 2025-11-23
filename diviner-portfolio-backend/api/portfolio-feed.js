const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// Load env vars
const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    DRIVE_POSTS_FOLDER_ID,
    DRIVE_CAROUSELS_FOLDER_ID,
    DRIVE_STORIES_FOLDER_ID,
    DRIVE_REELS_FOLDER_ID,
} = process.env;

export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        return res.status(500).json({ error: 'Missing Google credentials' });
    }

    try {
        // Auth
        const auth = new google.auth.JWT(
            GOOGLE_SERVICE_ACCOUNT_EMAIL,
            null,
            (GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            SCOPES
        );

        const drive = google.drive({ version: 'v3', auth });

        // Helper to fetch files
        const fetchFiles = async (folderId, type, layout = 'static') => {
            if (!folderId) return [];

            const q = `'${folderId}' in parents and trashed = false`;
            const response = await drive.files.list({
                q,
                fields: 'files(id, name, mimeType, createdTime, webContentLink, webViewLink, description, imageMediaMetadata, videoMediaMetadata)',
                pageSize: 100,
            });

            return (response.data.files || []).map(file => {
                // Parse description for metadata if present (e.g. "Category | Subtitle")
                let category = 'Social Design';
                let subtitle = '';

                if (file.description) {
                    const parts = file.description.split('|');
                    if (parts.length > 0) category = parts[0].trim();
                    if (parts.length > 1) subtitle = parts[1].trim();
                }

                // Use webContentLink (direct download) or fallback to webViewLink
                // The frontend's normalizeMediaUrl will handle Drive links if needed
                const url = file.webContentLink || file.webViewLink;

                return {
                    id: file.id,
                    type,
                    category,
                    title: file.name.replace(/\.[^/.]+$/, ""), // remove extension
                    subtitle,
                    imageUrl: file.mimeType.startsWith('image/') ? url : undefined,
                    videoUrl: file.mimeType.startsWith('video/') ? url : undefined,
                    layout,
                    createdAt: file.createdTime,
                    likes: 0,
                    views: 0,
                    isConceptArt: false
                };
            });
        };

        // Fetch all
        const [posts, carousels, stories, reels] = await Promise.all([
            fetchFiles(DRIVE_POSTS_FOLDER_ID, 'post', 'static'),
            fetchFiles(DRIVE_CAROUSELS_FOLDER_ID, 'post', 'carousel'),
            fetchFiles(DRIVE_STORIES_FOLDER_ID, 'story', 'story'),
            fetchFiles(DRIVE_REELS_FOLDER_ID, 'reel', 'reel'),
        ]);

        const items = [...posts, ...carousels, ...stories, ...reels];

        // Sort by date desc
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ items });

    } catch (error) {
        console.error('Drive API Error:', error);
        res.status(500).json({ error: 'Failed to fetch drive feed', details: error.message });
    }
}
