const fs = require('fs');
const path = require('path');

// Try to load googleapis
let google;
try {
    // Try root node_modules
    google = require('googleapis').google;
} catch (e) {
    try {
        // Try backend node_modules
        google = require('./diviner-portfolio-backend/node_modules/googleapis').google;
    } catch (e2) {
        console.error('❌ Could not load googleapis. Please run: npm install googleapis');
        process.exit(1);
    }
}

// Load credentials
const CREDENTIALS_PATH = path.join(__dirname, '..', 'diviner-portfolio-e19af4b73db5.json');
if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`❌ Credentials file not found at ${CREDENTIALS_PATH}`);
    process.exit(1);
}

const credentials = require(CREDENTIALS_PATH);
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

async function debugDrive() {
    console.log('🔍 Authenticating with Service Account:', credentials.client_email);

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });

    const drive = google.drive({ version: 'v3', auth });

    // Folder IDs to check (User needs to fill these or pass as args)
    // I will try to read them from args or prompt user
    const folderIds = process.argv.slice(2);

    if (folderIds.length === 0) {
        console.log('\n⚠️  No folder IDs provided.');
        console.log('Usage: node scripts/debug-drive.js <FOLDER_ID_1> <FOLDER_ID_2> ...');
        console.log('Example: node scripts/debug-drive.js 16HrSBj41VWeRCzqErTEVr-B7j-P2J8-E');
        return;
    }

    for (const folderId of folderIds) {
        console.log(`\n📂 Checking Folder ID: ${folderId}`);
        try {
            // 1. Check if folder exists and is accessible
            const folderRes = await drive.files.get({
                fileId: folderId,
                fields: 'id, name, mimeType, trashed, capabilities',
            });

            const folder = folderRes.data;
            console.log(`   ✅ Found Folder: "${folder.name}"`);
            console.log(`   ℹ️  Trashed: ${folder.trashed}`);
            console.log(`   ℹ️  Can List Children: ${folder.capabilities.canListChildren}`);

            if (folder.trashed) {
                console.error('   ❌ ERROR: Folder is in trash!');
                continue;
            }

            // 2. List children
            const q = `'${folderId}' in parents and trashed = false`;
            const listRes = await drive.files.list({
                q,
                fields: 'files(id, name, mimeType, webViewLink)',
                pageSize: 10,
            });

            const files = listRes.data.files || [];
            console.log(`   📄 Found ${files.length} visible files (showing first 10):`);

            if (files.length === 0) {
                console.log('   ⚠️  Folder appears empty to this service account.');
                console.log('       Possible causes:');
                console.log('       1. Folder is actually empty.');
                console.log('       2. Files inside are "Restricted" and not shared with service account.');
            } else {
                files.forEach(f => {
                    console.log(`      - [${f.mimeType}] ${f.name} (${f.id})`);
                });
            }

        } catch (err) {
            console.error(`   ❌ Failed to access folder: ${err.message}`);
            if (err.code === 404) {
                console.error('      -> Service account likely does NOT have permission to view this folder.');
            }
        }
    }
}

debugDrive();
