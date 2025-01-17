/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { IpcChannels } from '../general/IpcChannels';
import { handleIpcPrismaCalls } from './prisma/prismaIpcRenderer';
import { GoogleAuth } from 'google-auth-library';
const fs = require('fs');
const http = require('http');
const https = require('https');

class AppUpdater {
    constructor() {
        log.transports.file.level = 'debug';
        autoUpdater.logger = log;
        autoUpdater.setFeedURL({
            provider: 'github',
            owner: 'tobsterclark',
            repo: 'basketball-administrator',
            token: process.env.GH_TOKEN
        })
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow: BrowserWindow | null = null;

// ipc handlers get defined here
// implementation should be in a separate file
ipcMain.handle(IpcChannels.PrismaClient, handleIpcPrismaCalls);

ipcMain.handle(IpcChannels.SavePDF, async (event, { url, defaultFileName }) => {
    // Open Save As Dialog
    const { filePath } = await dialog.showSaveDialog({
        title: 'Save PDF',
        defaultPath: path.join(app.getPath('downloads'), defaultFileName),
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });

    if (!filePath) {
        return { success: false, message: 'User cancelled save dialog' };
    }

    const auth = new GoogleAuth({
        keyFile: path.join(__dirname, '../../runsheetcontrol-e5e8685ae733.json'),
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();
    console.log('Access Token:', token.token);

    // Download PDF and save
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(filePath);

        const options = {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }

        // For prod functions
        if (url.startsWith('https')) {
            https.get(url, options, (response: any) => {
                if (response.statusCode === 200) {
                    response.pipe(fileStream);
                    fileStream.on('finish', () => {
                        fileStream.close();
                        resolve({ success: true, filePath });
                    });
                } else {
                    reject({ success: false, message: `HTTP ${response.statusCode}` });
                }
            }).on('error', (err: any) => {
                reject({ success: false, message: err.message });
            });
        } else {
            http.get(url, (response: any) => {
                if (response.statusCode === 200) {
                    response.pipe(fileStream);
                    fileStream.on('finish', () => {
                        fileStream.close();
                        resolve({ success: true, filePath });
                    });
                } else {
                    reject({ success: false, message: 'Failed to download PDF' });
                }
            }).on('error', (err: any) => {
                reject({ success: false, message: err.message });
            });
        }
    });
});

ipcMain.handle(IpcChannels.SaveZIP, async (event, { url, defaultFileName }) => {
    // Open Save As Dialog
    try {
        const { filePath } = await dialog.showSaveDialog({
            title: 'Save ZIP',
            defaultPath: path.join(app.getPath('downloads'), defaultFileName),
            filters: [{ name: 'ZIP Files', extensions: ['zip'] }],
        });

        if (!filePath) {
            return { success: false, message: 'User cancelled save dialog' };
        }

        // Download ZIP and save
        return new Promise((resolve, reject) => {
            const fileStream = fs.createWriteStream(filePath);

            if (url.startsWith('https')) {
                // Add auth header for GCloud functions - TEMP bearer using jamie's account
                const options = {
                    headers: {
                        Authorization: `Bearer ${process.env.GCLOUD_AUTH_BEARER}`,
                    }
                };
                https.get(url, options, (response: any) => {
                    if (response.statusCode === 200) {
                        response.pipe(fileStream);
                        fileStream.on('finish', () => {
                            fileStream.close();
                            resolve({ success: true, filePath });
                        });
                    } else {
                        const errMsg = `Failed to download ZIP: ${response.statusCode} ${response.statusMessage}`;
                        console.error(errMsg);
                        reject({ success: false, message: errMsg });
                    }
                }).on('error', (err: any) => {
                    console.error('HTTP Request Error:', err);
                    reject({ success: false, message: err.message });
                });
            } else {
                http.get(url, (response: any) => {
                    if (response.statusCode === 200) {
                        response.pipe(fileStream);
                        fileStream.on('finish', () => {
                            fileStream.close();
                            resolve({ success: true, filePath });
                        });
                    } else {
                        const errMsg = `Failed to download ZIP: ${response.statusCode} ${response.statusMessage}`;
                        console.error(errMsg);
                        reject({ success: false, message: errMsg });
                    }
                }).on('error', (err: any) => {
                    console.error('HTTP Request Error:', err);
                    reject({ success: false, message: err.message });
                });
            };
        });
    }
    catch (e) {
        console.error("Error in SaveZIP handler:");
        console.error(e);
        return { success: false, message: (e instanceof Error) ? e.message : 'Unknown error' };
    }
});



if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
    require('electron-debug')();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload,
        )
        .catch(console.log);
};

const createWindow = async () => {
    if (isDebug) {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
        show: false,
        width: 1920,
        height: 1080,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../.erb/dll/preload.js'),
        },
    });

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    // Remove this if your app does not use auto updates
    
    new AppUpdater();
    // mainWindow.once('ready-to-show', () => {
    //     autoUpdater.checkForUpdatesAndNotify();
    // });
};

autoUpdater.on('update-available', (updateInfo) => {
    mainWindow?.webContents.send('update_available', {
        version: updateInfo.version,
        releaseNotes: updateInfo.releaseNotes,
        releaseName: updateInfo.releaseName,
    });
});

autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('update_downloaded');
});

ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady()
    .then(() => {
        createWindow();
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow();
        });
    })
    .catch(console.log);
