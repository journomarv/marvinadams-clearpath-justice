# ClearPath Justice Android APK Implementation Guide

## Project Overview
Converting the existing ClearPath Justice React/Vite web application into a functional Android APK using Capacitor while preserving the existing web version and all functionality.

## Current Repository Status
- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.9
- **Type**: Module (ES6)
- **Mobile-first**: Yes (existing responsive design)
- **Live Site**: https://marvinadams-clearpath-justice-l1m6.vercel.app/
- **GitHub**: https://github.com/journomarv/marvinadams-clearpath-justice

## Phase 1: Environment Setup

### 1.1 Install Capacitor CLI (Globally, on Local Machine)
```bash
npm install -g @capacitor/cli
```

### 1.2 Install Capacitor Dependencies (In Project Root)
```bash
npm install @capacitor/core @capacitor/cli
npm install -D @capacitor/android
```

### 1.3 Initialize Capacitor
```bash
npx cap init
```

When prompted, provide:
- App name: `ClearPath Justice`
- App ID: `za.org.clearpathjustice.app`
- Directory: `dist` (or accept default web directory location)

This creates:
- `capacitor.config.ts` (main Capacitor configuration file)
- `capacitor.config.json` (alternative format)

---

## Phase 2: Configuration Files

### 2.1 Update `capacitor.config.ts`
After running `cap init`, the configuration should reference your web directory and build setup.

**Expected structure**:
```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'za.org.clearpathjustice.app',
  appName: 'ClearPath Justice',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // Add any platform-specific plugins here if needed
  }
};

export default config;
```

### 2.2 Ensure Build Directory
Your `package.json` already has:
- `npm run build` → Vite production build
- Output directory: `dist/`

Verify `vite.config.js` includes:
```javascript
build: {
  outDir: 'dist',
  emptyOutDir: true
}
```

---

## Phase 3: Android Platform Setup

### 3.1 Add Android Platform
```bash
npx cap add android
```

This creates the `android/` directory with:
- Full Android Studio project structure
- Gradle configuration
- AndroidManifest.xml
- Android app resources

### 3.2 Update Android App Configuration

**File**: `android/app/build.gradle`

Ensure:
- `compileSdkVersion`: 34 (current stable)
- `minSdkVersion`: 24 (API level 24 = Android 7.0, modern minimum)
- `targetSdkVersion`: 34

---

## Phase 4: App Branding & Assets

### 4.1 Launcher Icon
**Location**: `android/app/src/main/res/mipmap-*/ic_launcher.png`

Replace default launcher icons with ClearPath Justice logo:
- `mipmap-ldpi/`: 36×36 px
- `mipmap-mdpi/`: 48×48 px
- `mipmap-hdpi/`: 72×72 px
- `mipmap-xhdpi/`: 96×96 px
- `mipmap-xxhdpi/`: 144×144 px
- `mipmap-xxxhdpi/`: 192×192 px

### 4.2 App Name
**File**: `android/app/src/main/res/values/strings.xml`

Set:
```xml
<string name="app_name">ClearPath Justice</string>
```

### 4.3 Splash Screen (Optional)
**File**: `android/app/src/main/res/drawable/splash.xml`

Configure splash screen appearance and duration.

---

## Phase 5: Build Process

### 5.1 Production Build (Vite)
```bash
npm run build
```

Generates optimized production files in `dist/` directory.

### 5.2 Sync Web Assets to Android
```bash
npx cap sync android
```

Copies the `dist/` directory contents into the Android project's web assets directory.

**Destination**: `android/app/src/main/assets/public/`

### 5.3 Compile Android APK

#### Debug APK (For Testing)
```bash
cd android
./gradlew assembleDebug
```

**Output**: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Release APK (For App Store Submission)
Requires signing credentials (see Phase 6).

```bash
cd android
./gradlew assembleRelease
```

---

## Phase 6: APK Signing (Release)

### 6.1 Generate Keystore (First Time Only)
```bash
keytool -genkey -v -keystore clearpath-release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias clearpath-key
```

**Output**: `clearpath-release.keystore` (store securely, **never commit**)

### 6.2 Configure Gradle Signing

**File**: `android/app/build.gradle`

Add signing configuration:
```gradle
signingConfigs {
  release {
    storeFile file("path/to/clearpath-release.keystore")
    storePassword 'YOUR_KEYSTORE_PASSWORD'
    keyAlias 'clearpath-key'
    keyPassword 'YOUR_KEY_PASSWORD'
  }
}

buildTypes {
  release {
    signingConfig signingConfigs.release
  }
}
```

### 6.3 Build Signed APK
```bash
cd android
./gradlew assembleRelease
```

**Output**: `android/app/build/outputs/apk/release/app-release.apk`

---

## Phase 7: Permissions & Manifest

### 7.1 Review AndroidManifest.xml
**File**: `android/app/src/main/AndroidManifest.xml`

**Current requirements** (for ClearPath Justice):
- `INTERNET` ✓ (required for web content)
- `ACCESS_NETWORK_STATE` ✓ (optional but recommended)

**DO NOT ADD**:
- `CAMERA`, `RECORD_AUDIO`, `ACCESS_FINE_LOCATION`, `READ_CONTACTS`
- Unless ClearPath Justice explicitly requires them (it doesn't)

---

## Phase 8: GitHub Actions Workflow

### 8.1 Create Workflow File
**Location**: `.github/workflows/build-apk.yml`

```yaml
name: Build ClearPath Justice APK

on:
  push:
    branches:
      - android-apk
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install npm dependencies
        run: npm install

      - name: Build production web assets (Vite)
        run: npm run build

      - name: Set up Java
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Sync Capacitor Android platform
        run: npx cap sync android

      - name: Build Android Debug APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug

      - name: Upload APK to artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ClearPath-Justice-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk
          retention-days: 30

      - name: Rename APK for release
        run: |
          cp android/app/build/outputs/apk/debug/app-debug.apk ClearPath-Justice-v1.0.0-debug.apk

      - name: Upload renamed APK
        uses: actions/upload-artifact@v4
        with:
          name: ClearPath-Justice-v1.0.0-debug
          path: ClearPath-Justice-v1.0.0-debug.apk
```

---

## Phase 9: Quality Checks

### 9.1 Pre-Submission Verification

Run these checks before final submission:

```bash
# 1. Verify production build succeeds
npm run build
ls -lh dist/

# 2. Verify Capacitor sync succeeds
npx cap sync android

# 3. Verify Android project compiles
cd android
./gradlew clean assembleDebug
ls -lh app/build/outputs/apk/debug/app-debug.apk

# 4. Verify APK size (should be < 100MB for initial submission)
du -h app/build/outputs/apk/debug/app-debug.apk

# 5. Verify web version still works
# Visit: https://marvinadams-clearpath-justice-l1m6.vercel.app/
```

### 9.2 Testing on Device

1. Install Android Debug Bridge (ADB):
   ```bash
   # macOS:
   brew install android-platform-tools
   
   # Linux: Follow platform-specific instructions
   ```

2. Connect Android device via USB with USB debugging enabled

3. Install APK:
   ```bash
   adb install ClearPath-Justice-v1.0.0-debug.apk
   ```

4. Verify:
   - App launches with ClearPath Justice icon
   - App name displays correctly
   - Home page loads
   - Eligibility checker functions
   - Navigation between pages works
   - External links (if any) behave correctly

---

## Phase 10: Release Preparation for FNB App of the Year 2026

### 10.1 Signing Requirements for App Stores
For Google Play Store or other distribution:
- Create release-signed APK (see Phase 6)
- Keep keystore secure and backed up
- Document keystore password and key alias
- Never commit keystore to repository

### 10.2 GitHub Secrets Setup (For Automated Release Builds)
Add these secrets to GitHub repository if automating release builds:
- `KEYSTORE_BASE64`: Base64-encoded keystore file
- `KEYSTORE_PASSWORD`: Keystore password
- `KEY_ALIAS`: Key alias
- `KEY_PASSWORD`: Key password

### 10.3 App Store Submission Requirements
- Valid APK signature
- Version code increment (start at 1)
- App icon (192×192 px minimum)
- Screenshots (Google Play requires specific dimensions)
- App description and privacy policy
- Content rating questionnaire

---

## Phase 11: Troubleshooting

### Issue: Capacitor plugin conflicts
**Solution**: Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
npx cap sync android
```

### Issue: Gradle build fails
**Solution**: Update Gradle wrapper
```bash
cd android
./gradlew wrapper --gradle-version 8.0
```

### Issue: Assets not loading in APK
**Solution**: Verify sync was successful
```bash
npx cap sync android --deployment
```

### Issue: External links not working
**Add to capacitor.config.ts**:
```typescript
plugins: {
  CapacitorHttp: {
    enabled: true
  }
}
```

---

## Key Files Checklist

✅ `capacitor.config.ts` - Main configuration  
✅ `package.json` - Dependencies including @capacitor/*  
✅ `vite.config.js` - Build output to `dist/`  
✅ `android/` directory - Generated Capacitor Android project  
✅ `android/app/build.gradle` - SDK versions and signing config  
✅ `android/app/src/main/AndroidManifest.xml` - Permissions  
✅ `android/app/src/main/res/values/strings.xml` - App name  
✅ `android/app/src/main/res/mipmap-*/` - Launcher icons  
✅ `.github/workflows/build-apk.yml` - CI/CD pipeline  

---

## Next Steps

1. **Create branch**: `git checkout -b android-apk`
2. **Install Capacitor**: `npm install @capacitor/core @capacitor/cli -D && npm install @capacitor/android -D`
3. **Initialize**: `npx cap init`
4. **Add Android**: `npx cap add android`
5. **Update icons and branding**: Place assets in `android/app/src/main/res/`
6. **Build and test**: `npm run build && npx cap sync android && cd android && ./gradlew assembleDebug`
7. **Commit**: Push to android-apk branch
8. **GitHub Actions**: Set up workflow in `.github/workflows/build-apk.yml`

---

## Output APK Locations

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk` (after signing)
- **GitHub Actions Artifact**: Available in Actions tab for manual download

---

## Support & Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Studio**: https://developer.android.com/studio
- **Gradle Reference**: https://gradle.org/
- **GitHub Actions**: https://github.github.com/actions

