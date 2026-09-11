# ClearPath Justice Android APK - Implementation Steps

## Overview
This document provides step-by-step instructions to convert your existing React/Vite ClearPath Justice web application into an Android APK using Capacitor.

**Important**: These steps preserve your existing web application while adding native Android support.

---

## Pre-Requirements

Before you start, ensure you have:

1. **Node.js 18+**
   - Check: `node -v`
   - Install: https://nodejs.org/

2. **npm**
   - Check: `npm -v`
   - Usually installed with Node.js

3. **Java Development Kit (JDK) 17**
   - macOS: `brew install openjdk@17`
   - Linux: `sudo apt-get install openjdk-17-jdk`
   - Windows: https://www.oracle.com/java/technologies/downloads/

4. **Android SDK** (Optional but recommended)
   - Install Android Studio: https://developer.android.com/studio
   - Or: Android Command-line Tools: https://developer.android.com/studio#command-tools

5. **Git**
   - For version control

---

## Step-by-Step Implementation

### STEP 1: Prepare Your Repository (5 minutes)

1. **Create a new branch** for Android development:
   ```bash
   cd ~/path/to/marvinadams-clearpath-justice
   git checkout -b android-apk
   git branch -u origin/main
   ```

2. **Verify current state**:
   ```bash
   npm --version          # Should be 9+
   node --version         # Should be 18+
   npm ls                 # Review current dependencies
   ```

### STEP 2: Install Capacitor (3 minutes)

1. **Install Capacitor CLI globally** (optional but recommended):
   ```bash
   npm install -g @capacitor/cli
   ```

2. **Install Capacitor packages locally**:
   ```bash
   cd ~/path/to/marvinadams-clearpath-justice
   npm install --save-dev @capacitor/cli @capacitor/core @capacitor/android
   ```

3. **Verify installation**:
   ```bash
   npm list @capacitor/cli
   npm list @capacitor/core
   npm list @capacitor/android
   ```

### STEP 3: Configure Capacitor (2 minutes)

1. **Copy the Capacitor configuration** I've provided:
   - File: `capacitor.config.ts` (from `/home/claude/capacitor.config.ts`)
   - Location: Save to root of your repository: `/marvinadams-clearpath-justice/capacitor.config.ts`

2. **Verify the configuration**:
   - Check that `webDir` is set to `dist`
   - Check that `appId` is `za.org.clearpathjustice.app`
   - Check that `appName` is `ClearPath Justice`

### STEP 4: Build Production Assets (2 minutes)

1. **Create Vite production build**:
   ```bash
   npm run build
   ```

   Expected output:
   ```
   ✓ built in 2.34s
   dist/
   ├── assets/
   │   ├── index-XXXXX.js
   │   └── index-XXXXX.css
   ├── index.html
   └── [other assets]
   ```

2. **Verify build output**:
   ```bash
   ls -la dist/
   du -sh dist/
   ```

   Size should be reasonable (typically 100-500KB gzipped).

### STEP 5: Add Android Platform (5 minutes)

1. **Initialize Capacitor** (if not already done):
   ```bash
   npx cap init "ClearPath Justice" "za.org.clearpathjustice.app" --web-dir dist
   ```

   This creates `capacitor.config.ts` and necessary files.

2. **Add Android platform**:
   ```bash
   npx cap add android
   ```

   This creates the `android/` directory with full Android project structure.

3. **Verify Android project**:
   ```bash
   ls -la android/
   ls -la android/app/
   ls -la android/app/build.gradle
   ```

### STEP 6: Sync Web Assets to Android (1 minute)

1. **Sync Capacitor** (copies `dist/` to Android assets):
   ```bash
   npx cap sync android
   ```

   Expected output:
   ```
   ✓ Copying web assets from dist/ to android/app/src/main/assets/public
   ✓ Updating Android Configuration
   ✓ update android build.gradle
   ```

### STEP 7: Verify Build Configuration (2 minutes)

1. **Check Android build file**:
   ```bash
   cat android/app/build.gradle | grep -A 5 "compileSdk\|minSdk\|targetSdk"
   ```

   Should show:
   - `compileSdk 34` (or higher)
   - `minSdk 24` (Android 7.0)
   - `targetSdk 34`

2. **Make Gradle executable**:
   ```bash
   chmod +x android/gradlew
   chmod +x android/gradlew.bat
   ```

### STEP 8: Build Android APK (10-15 minutes)

1. **Navigate to Android directory**:
   ```bash
   cd android
   ```

2. **Build Debug APK** (suitable for testing):
   ```bash
   ./gradlew assembleDebug
   ```

   First build takes longer (~5-10 minutes) as it downloads dependencies.

   Expected output:
   ```
   > Task :app:assembleDebug
   Built the following APK(s):
   android/app/build/outputs/apk/debug/app-debug.apk
   
   BUILD SUCCESSFUL in XXs
   ```

3. **Verify APK was created**:
   ```bash
   ls -lh app/build/outputs/apk/debug/app-debug.apk
   du -h app/build/outputs/apk/debug/app-debug.apk
   ```

   Typical size: 30-50MB for a Vite-built React app.

### STEP 9: Add App Branding (10 minutes - Optional but recommended)

1. **Replace Launcher Icons**:
   ```bash
   # Create your icon at different resolutions using your ClearPath logo
   # Then copy to:
   android/app/src/main/res/mipmap-mdpi/ic_launcher.png (48x48)
   android/app/src/main/res/mipmap-hdpi/ic_launcher.png (72x72)
   android/app/src/main/res/mipmap-xhdpi/ic_launcher.png (96x96)
   android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png (144x144)
   android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png (192x192)
   ```

2. **Update App Name**:
   ```bash
   # Edit: android/app/src/main/res/values/strings.xml
   # Change: <string name="app_name">ClearPath Justice</string>
   ```

### STEP 10: Test the APK (5 minutes)

#### Option A: Test on Physical Android Device

1. **Enable USB Debugging on Android Device**:
   - Settings → Developer Options → USB Debugging (enable)

2. **Connect device via USB**:
   ```bash
   # Verify connection:
   adb devices
   ```

3. **Install APK**:
   ```bash
   adb install ClearPath-Justice-v1.0.0-debug.apk
   # Or from android directory:
   adb install app/build/outputs/apk/debug/app-debug.apk
   ```

4. **Verify Installation**:
   - App should appear in your device's app drawer
   - Tap to launch
   - Verify ClearPath Justice icon and name display
   - Test navigation and eligibility checker

#### Option B: Test with Android Emulator

1. **Create AVD** (Android Virtual Device) in Android Studio

2. **Start emulator**

3. **Install APK**:
   ```bash
   adb -e install app/build/outputs/apk/debug/app-debug.apk
   ```

### STEP 11: Verify Web Version Still Works (2 minutes)

1. **Check Vercel deployment**:
   ```bash
   curl -I https://marvinadams-clearpath-justice-l1m6.vercel.app/
   ```

   Should return 200 status.

2. **Visit in browser**:
   - https://marvinadams-clearpath-justice-l1m6.vercel.app/
   - Verify all pages load
   - Verify eligibility checker works

### STEP 12: Set Up GitHub Actions (5 minutes)

1. **Create workflow directory** (if it doesn't exist):
   ```bash
   mkdir -p .github/workflows
   ```

2. **Copy the GitHub Actions workflow**:
   - File: `build-apk.yml` (from `/home/claude/build-apk.yml`)
   - Location: `.github/workflows/build-apk.yml`

3. **Verify workflow file**:
   ```bash
   cat .github/workflows/build-apk.yml | head -20
   ```

### STEP 13: Commit Changes (5 minutes)

1. **Review changes**:
   ```bash
   git status
   git diff --stat
   ```

2. **Stage files**:
   ```bash
   git add package.json
   git add capacitor.config.ts
   git add .github/workflows/build-apk.yml
   git add android/
   ```

3. **Create meaningful commit messages**:
   ```bash
   git commit -m "feat(android): add Capacitor configuration and Android platform

   - Initialize Capacitor for Android app packaging
   - Configure app name (ClearPath Justice) and app ID (za.org.clearpathjustice.app)
   - Set up Android platform with API 24-34 compatibility
   - Add GitHub Actions workflow for automated APK building
   - Preserve existing web application and Vercel deployment"
   ```

4. **Push to GitHub**:
   ```bash
   git push -u origin android-apk
   ```

### STEP 14: Run GitHub Actions Workflow (Optional - 15 minutes)

1. **Go to GitHub repository**:
   - https://github.com/journomarv/marvinadams-clearpath-justice/actions

2. **Find workflow**:
   - "Build ClearPath Justice Android APK"

3. **Trigger manually** (if needed):
   - Click "Run workflow" → "Run workflow"
   - Select branch: `android-apk`
   - Wait for build to complete

4. **Download artifact**:
   - Once build completes, download APK from workflow artifacts
   - APK name: `ClearPath-Justice-v1.0.0-debug.apk` (or current version)

### STEP 15: Prepare for FNB App of the Year Submission (Optional)

For app store submission, you'll need a **release-signed APK**.

1. **Generate Keystore** (one-time, keep secure):
   ```bash
   keytool -genkey -v -keystore clearpath-release.keystore \
     -keyalg RSA -keysize 2048 -validity 10000 -alias clearpath-key
   ```

   This creates `clearpath-release.keystore` - **Never commit this file**.

2. **Configure signing** in `android/app/build.gradle`:
   ```gradle
   signingConfigs {
     release {
       storeFile file("../clearpath-release.keystore")
       storePassword "YOUR_PASSWORD"
       keyAlias "clearpath-key"
       keyPassword "YOUR_PASSWORD"
     }
   }
   
   buildTypes {
     release {
       signingConfig signingConfigs.release
     }
   }
   ```

3. **Build release APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

   Output: `app/build/outputs/apk/release/app-release.apk`

---

## Quality Checklist

Before submitting the APK to FNB App of the Year 2026:

- [ ] **Web version works**: https://marvinadams-clearpath-justice-l1m6.vercel.app/
- [ ] **APK installs on Android**: `adb install app-debug.apk` succeeds
- [ ] **App launches**: Icon appears, app name displays correctly
- [ ] **Home page loads**: Content renders properly
- [ ] **Eligibility checker works**: Can navigate through steps
- [ ] **Navigation works**: Can switch between pages
- [ ] **Responsive design**: Works on different screen sizes
- [ ] **No crash on startup**: LogCat shows no errors
- [ ] **External links work**: Links open in browser (if applicable)
- [ ] **APK size reasonable**: < 100MB (typical: 30-50MB)
- [ ] **No sensitive permissions**: Only `INTERNET` required
- [ ] **GitHub Actions builds successfully**: Workflow completes without errors

---

## Troubleshooting

### Problem: `gradlew assembleDebug` fails with Java error
**Solution**:
```bash
# Set JAVA_HOME explicitly
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
cd android
./gradlew assembleDebug
```

### Problem: `dist/` directory is empty after build
**Solution**:
```bash
rm -rf dist/
npm run build
# Check output carefully for errors
```

### Problem: Capacitor sync fails
**Solution**:
```bash
rm -rf android/
npx cap add android
npx cap sync android --deployment
```

### Problem: APK won't install on device
**Solution**:
```bash
# First uninstall existing version
adb uninstall za.org.clearpathjustice.app

# Then install fresh
adb install app/build/outputs/apk/debug/app-debug.apk
```

### Problem: App crashes on startup
**Solution**:
```bash
# Check Android logs
adb logcat | grep ClearPath
adb logcat | grep -i exception
```

---

## File Structure Summary

After completing all steps, your repository should look like:

```
marvinadams-clearpath-justice/
├── android/                          # NEW - Android project
│   ├── app/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── assets/
│   │   │   │   │   └── public/      # Web assets (from dist/)
│   │   │   │   ├── java/
│   │   │   │   ├── res/             # App resources
│   │   │   │   │   ├── mipmap-*/    # Icons
│   │   │   │   │   └── values/
│   │   │   │   └── AndroidManifest.xml
│   │   ├── build.gradle
│   │   └── ...
│   ├── build.gradle
│   ├── gradlew                       # Gradle wrapper
│   ├── settings.gradle
│   └── ...
├── .github/
│   └── workflows/
│       └── build-apk.yml            # NEW - GitHub Actions workflow
├── src/
│   ├── App.jsx
│   ├── components/
│   ├── pages/
│   └── ...
├── dist/                            # Web build output (Vite)
├── capacitor.config.ts              # NEW - Capacitor configuration
├── index.html
├── package.json                      # Updated with Capacitor deps
├── vite.config.js
├── README.md
└── ...
```

---

## Next Steps After Implementation

1. **Test thoroughly** on different Android devices and OS versions

2. **For FNB App of the Year submission**:
   - Generate release-signed APK (see Step 15)
   - Follow FNB requirements for app metadata, screenshots, description
   - Test on Google Play Console internal testing track first

3. **Continuous improvement**:
   - Monitor GitHub Actions builds
   - Keep dependencies updated
   - Test web and Android versions after each update

4. **Documentation**:
   - Update main README.md with Android build instructions
   - Document any platform-specific behavior
   - Keep setup guide for team members

---

## Support Resources

- **Capacitor Documentation**: https://capacitorjs.com/docs
- **Android Developers**: https://developer.android.com/docs
- **Gradle Build System**: https://gradle.org/docs
- **GitHub Actions**: https://github.com/features/actions
- **React Documentation**: https://react.dev

---

## Version Information

- **Last Updated**: September 2026
- **Node.js Version**: 18+
- **Capacitor Version**: 6.0+
- **Android API Level**: 24-34
- **Gradle Version**: 8.0+
- **Java Version**: JDK 17

