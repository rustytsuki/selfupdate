// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const { platform, arch } = process;

app.commandLine.appendSwitch('enable-logging');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile('src/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
};

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'rustytsuki',
    repo: 'selfupdate',
    channel: `latest-${platform}-${arch}`,
});

autoUpdater.on('checking-for-update', () => {
    console.log('🔍 正在检查更新...');
  });
  
  autoUpdater.on('update-available', (info) => {
    console.log('📦 检测到更新！版本：', info.version);
  });
  
  autoUpdater.on('update-not-available', (info) => {
    console.log('✅ 当前已是最新版');
  });
  
  autoUpdater.on('error', (err) => {
    console.error('❌ 检查更新出错：', err);
  });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    console.log('🔍 checking update...');
    autoUpdater.checkForUpdates();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
