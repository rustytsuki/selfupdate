const ver = require('./src/version.js')

const version = `${ver.ver_major}.${ver.ver_minor}.${ver.ver_patch}`;

let exe_name = 'SelfUpdate';

const config = {
    appId: 'com.selfupdate.app',
    productName: 'SelfUpdate',
    'extraMetadata': {
        // "name": "selfupdate",
        'version': version,
        // "description": "SelfUpdate",
        // "author": "@rustytsuki", // do not set!!! or copyright cannot find ${author}!!! use package.json
        // "license": "BSD-3-CLAUSE"
    },
    directories: {
        buildResources: 'build',
    },
    files: ['src'],
    win: {
        executableName: exe_name,
        target: ['nsis'],
    },
    nsis: {
        artifactName: 'selfupdate-setup-${platform}-${arch}-v${version}.${ext}',
        shortcutName: '${productName}',
        uninstallDisplayName: '${productName}',
        createDesktopShortcut: 'always',
        createStartMenuShortcut: true,
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        deleteAppDataOnUninstall: false,
        menuCategory: 'SelfUpdate',
        runAfterFinish: true,
        warningsAsErrors: false,
        include: 'HidpiAware.nsh',
    },
    mac: {
        entitlementsInherit: 'electron/build/entitlements.mac.plist',
        extendInfo: [
            { NSCameraUsageDescription: "Application requests access to the device's camera." },
            { NSMicrophoneUsageDescription: "Application requests access to the device's microphone." },
            { NSDocumentsFolderUsageDescription: "Application requests access to the user's Documents folder." },
            { NSDownloadsFolderUsageDescription: "Application requests access to the user's Downloads folder." },
        ],
        notarize: false,
    },
    dmg: {
        artifactName: 'selfupdate-v${version}.${ext}',
    },
    linux: {
        target: ['AppImage', 'snap', 'deb'],
        maintainer: 'electronjs.org',
        category: 'Utility',
    },
    appImage: {
        artifactName: 'selfupdate-v${version}.${ext}',
    },
    npmRebuild: false,
    publish: {
        provider: 'github',
        host: 'github.com',
        owner: 'rustytsuki',
        repo: 'selfupdate',
        private: false,
        protocol: 'https',
        publishAutoUpdate: true,
        releaseType: 'release',
        vPrefixedTagName: true,
        channel: 'latest-${platform}-${arch}', // https://github.com/electron-userland/electron-builder/issues/5592#issuecomment-2571750991
    },
};

module.exports = config;
