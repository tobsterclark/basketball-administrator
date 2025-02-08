/* eslint-disable prefer-promise-reject-errors */
import path from 'path';
import { app, dialog } from 'electron';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';

// Get "target audience" for generating id tokens
const prodTargetAudience =
    'https://australia-southeast1-runsheetcontrol.cloudfunctions.net/generaterunsheets';
const devTargetAudience =
    'http://127.0.0.1:5001/runsheetcontrol/australia-southeast1/generaterunsheets';

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const targetAudience = isDebug ? devTargetAudience : prodTargetAudience;

// Get file from cloud run function (either zip or pdf)
async function getDownload(url: string, filePath: string | undefined) {
    if (!filePath) {
        return { success: false, message: 'User cancelled save dialog' };
    }

    const auth = new GoogleAuth({
        keyFile: path.join(
            __dirname,
            '../../../runsheetcontrol-e5e8685ae733.json',
        ),
    });

    const client = await auth.getIdTokenClient(targetAudience);
    const res = await client.request({ url, responseType: 'stream' });

    // Download PDF and save
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(filePath);

        if (res.status === 200) {
            try {
                res.data.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve({ success: true, filePath });
                });
            } catch (err) {
                reject({ success: false, message: err });
            }
        } else {
            reject({
                success: false,
                message: `HTTP request error: ${res.status} ${res.statusText}`,
            });
        }
    });
}

// Download single file from cloud run function api to the user specified file path
export async function savePDF(gameId: string, defaultFileName: string) {
    const url = `${targetAudience}/?gameId=${gameId}`;

    // Open Save As Dialog
    const { filePath } = await dialog.showSaveDialog({
        title: 'Save PDF',
        defaultPath: path.join(app.getPath('downloads'), defaultFileName),
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });

    return getDownload(url, filePath);
}

// Download single file from cloud run function api to the user specified file path
export async function saveZIP(gameIds: string[], defaultFileName: string) {
    const url = `${targetAudience}/?gameIds=[${gameIds.join(',')}]`;

    // Open Save As Dialog
    const { filePath } = await dialog.showSaveDialog({
        title: "Save PDF",
        defaultPath: path.join(app.getPath('downloads'), defaultFileName),
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });

    return getDownload(url, filePath);
}
