import { ILanguage } from './interface';

const language: ILanguage = {
    general: {
        copied: 'Copied',
        copy: 'Copy',
        seeKey: 'See keys',
        lostNetwork:
            'Your internet connection is currently<br />unstable. Please check your network<br />settings and try again.',
        btnReload: 'Reload',
        loadingTx: `Please do not navigate away till this<br />window closes.`,
        btnRetry: 'Retry',
        switched: 'Switched',
        removed: 'Removed',
        keys: 'keys',
        readyDesc: 'You’re ready to go Incognito.',
        hasCameraDesc: 'To continue using Incognito, please close this window and reopen the extension.',
        scanQrCode: 'Scan QR Code',
        placeQrCode: 'Place the QR code in front of your camera',
        cameraReadyDesc: 'Scan function enabled.',
        success: 'Success',
        masterKey: 'Master keys',
        masterLess: 'Masterless',
        keychainName: 'Keychain name',
        masterKeyName: 'Master key name',
        privateKey: 'Private key',
        phrase: 'Phrase',
        btnSetting: 'Setting',
        btnTrash: 'Clear',
    },
    setting: {
        headerTitle: 'Settings',
        network: {
            title: 'Network',
        },
        dev: {
            title: 'Dev Sections',
            homeConfigs: 'Use staging home configs',
        },
        addressBook: {
            title: 'Address Book',
            desc: 'Manage your saved addresses',
        },
        keychain: {
            title: 'Keychain',
            desc: 'Manage your keychains',
        },
        decimalDigits: {
            title: 'Decimal Digits',
            desc: 'Limit main asset<br />displays to 5 decimal digits',
        },
        darkMode: {
            title: 'Theme',
            desc: 'Use dark mode and light mode',
        },
        logout: {
            title: 'Logout',
        },
    },
};

export default language;
