const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');
const log = require('electron-log');
const { platform, arch } = process;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'rustytsuki',
    repo: 'selfupdate',
    channel: `latest-${platform}-${arch}`,
});

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;

function checkUpdateWithPrompt() {
    autoUpdater.checkForUpdates();

    autoUpdater.once('update-available', (info) => {
        log.info('🆕 Update available:', info.version);
        dialog
            .showMessageBox({
                type: 'info',
                buttons: ['Yes', 'No'],
                defaultId: 0,
                cancelId: 1,
                title: 'Update Available',
                message: `A new version (${info.version}) is available.`,
                detail: 'Do you want to download it now?',
            })
            .then((result) => {
                if (result.response === 0) {
                    log.info('⬇️ User chose to download the update');
                    autoUpdater.downloadUpdate();
                } else {
                    log.info('❌ User declined to download the update');
                }
            });
    });

    autoUpdater.once('update-not-available', () => {
        log.info('✅ No updates found');
    });

    autoUpdater.once('error', (err) => {
        log.error('❌ Update error:', err);
    });

    autoUpdater.once('update-downloaded', (info) => {
        log.info('📦 Update downloaded:', info.version);
        dialog
            .showMessageBox({
                type: 'info',
                buttons: ['Install and Restart', 'Later'],
                defaultId: 0,
                cancelId: 1,
                title: 'Update Ready',
                message: `Version ${info.version} has been downloaded.`,
                detail: 'Would you like to install it now?',
            })
            .then((result) => {
                if (result.response === 0) {
                    autoUpdater.quitAndInstall();
                }
            });
    });
}

module.exports = { checkUpdateWithPrompt };
