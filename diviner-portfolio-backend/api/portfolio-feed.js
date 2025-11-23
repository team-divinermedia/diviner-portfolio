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

module.exports = async function handler(req, res) {
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
        const fetchFiles = async (folderId, type, defaultLayout = 'static') => {
            if (!folderId) return [];

            const q = `'${folderId}' in parents and trashed = false`;
            const response = await drive.files.list({
                q,
                fields: 'files(id, name, mimeType, createdTime, webContentLink, webViewLink, description, imageMediaMetadata, videoMediaMetadata)',
                pageSize: 100,
            });

            const items = [];

            for (const file of (response.data.files || [])) {
                // Check if it's a folder (Carousel/Series)
                if (file.mimeType === 'application/vnd.google-apps.folder') {
                    // Fetch children of this folder
                    const childrenRes = await drive.files.list({
                        q: `'${file.id}' in parents and trashed = false`,
                        fields: 'files(id, name, mimeType, webContentLink, webViewLink)',
                        orderBy: 'name', // Ensure slides are in order
                        pageSize: 50,
                    });

                    const children = childrenRes.data.files || [];
                    if (children.length === 0) continue; // Skip empty folders

                    // Filter for media only
                    const mediaChildren = children.filter(c => c.mimeType.startsWith('image/') || c.mimeType.startsWith('video/'));
                    if (mediaChildren.length === 0) continue;

                    const slides = mediaChildren.map(c => c.webContentLink || c.webViewLink);

                    // Parse description from the FOLDER itself
                    let category = 'Social Design';
                    let subtitle = '';
                    if (file.description) {
                        const parts = file.description.split('|');
                        if (parts.length > 0) category = parts[0].trim();
                        if (parts.length > 1) subtitle = parts[1].trim();
                    }

                    items.push({
                        id: file.id,
                        type,
                        category,
                        title: file.name,
                        subtitle,
                        imageUrl: slides[0], // Cover image is the first slide
                        slides, // Array of all slide URLs
                        layout: 'carousel', // Force carousel layout for folders
                        createdAt: file.createdTime,
                        likes: 0,
                        views: 0,
                        isConceptArt: false
                    });

                } else {
                    // It's a single file
                    let category = 'Social Design';
                    let subtitle = '';

                    if (file.description) {
                        const parts = file.description.split('|');
                        if (parts.length > 0) category = parts[0].trim();
                        if (parts.length > 1) subtitle = parts[1].trim();
                    }

                    const url = file.webContentLink || file.webViewLink;
                    const isImage = file.mimeType.startsWith('image/');
                    const isVideo = file.mimeType.startsWith('video/');

                    if (!isImage && !isVideo) continue;

                    items.push({
                        id: file.id,
                        type,
                        category,
                        title: file.name.replace(/\.[^/.]+$/, ""),
                        subtitle,
                        imageUrl: isImage ? url : undefined,
                        videoUrl: isVideo ? url : undefined,
                        slides: [url], // Single slide
                        layout: defaultLayout,
                        createdAt: file.createdTime,
                        likes: 0,
                        views: 0,
                        isConceptArt: false
                    });
                }
            }

            return items;
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
