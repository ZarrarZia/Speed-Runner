import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.speedrunner.app',
    appName: 'Speed Runner',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    }
};

export default config;
