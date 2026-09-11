import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'za.org.clearpathjustice.app',
  appName: 'ClearPath Justice',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    appendUserAgent: 'ClearPathJusticeAndroid'
  },
  plugins: {
    // Splashscreen plugin configuration (optional)
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
