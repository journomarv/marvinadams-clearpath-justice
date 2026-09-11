# ClearPath Justice Android APK - Quick Start Commands

Copy and paste these commands to get started quickly.

---

## Prerequisites Check (2 minutes)

```bash
# Verify Node.js (should be 18+)
node -v

# Verify npm (should be 9+)
npm -v

# Verify Java (should be 17+)
java -version

# If Java not installed:
# macOS:
brew install openjdk@17

# Linux:
sudo apt-get install openjdk-17-jdk
```

---

## Repository Setup (5 minutes)

```bash
# Navigate to your project
cd ~/path/to/marvinadams-clearpath-justice

# Create android-apk branch
git checkout -b android-apk

# Verify you're on new branch
git branch
```

---

## Copy Files from /home/claude/ (3 minutes)

```bash
# Copy configuration files
cp /home/claude/capacitor.config.ts ./
cp /home/claude/setup-android.sh ./
chmod +x setup-android.sh

# Create workflows directory
mkdir -p .github/workflows

# Copy workflow
cp /home/claude/build-apk.yml .github/workflows/

# Verify files copied
ls -la capacitor.config.ts setup-android.sh
ls -la .github/workflows/build-apk.yml
```

---

## Update package.json (3 minutes)

```bash
# Option 1: Manual editing
# Open package.json in your editor and:
# 1. In devDependencies, add:
#    "@capacitor/cli": "^6.1.0",
#    "@capacitor/core": "^6.1.0",
#    "@capacitor/android": "^6.1.0"
#
# 2. In scripts, add:
#    "android:build": "npm run build && npx cap sync android && cd android && ./gradlew assembleDebug",
#    "android:sync": "npx cap sync android",
#    "android:open": "npx cap open android"

# Option 2: Command-line (npm install)
npm install --save-dev @capacitor/cli@^6.1.0 @capacitor/core@^6.1.0 @capacitor/android@^6.1.0
```

---

## Automated Setup (10-15 minutes)

```bash
# Run the setup script (handles everything automatically)
./setup-android.sh

# Script will:
# ✓ Check prerequisites
# ✓ Install Capacitor
# ✓ Initialize Capacitor
# ✓ Build web assets
# ✓ Add Android platform
# ✓ Sync assets
# ✓ Verify build configuration
```

---

## Manual Setup Alternative (if not using setup script)

```bash
# Install dependencies
npm install

# Build production assets
npm run build

# Initialize Capacitor (if not already done)
npx cap init "ClearPath Justice" "za.org.clearpathjustice.app" --web-dir dist

# Add Android platform
npx cap add android

# Sync web assets to Android
npx cap sync android
```

---

## Build APK Locally (10-15 minutes)

```bash
# Full build (build web + sync + build APK)
npm run android:build

# Or step-by-step:

# Step 1: Build web assets
npm run build

# Step 2: Sync with Android
npm run android:sync

# Step 3: Build APK
cd android
./gradlew assembleDebug
cd ..

# Verify APK created
ls -lh android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Test on Android Device

```bash
# Connect device via USB with debugging enabled
# Verify connection:
adb devices

# Install APK:
adb install android/app/build/outputs/apk/debug/app-debug.apk

# View logs (for debugging):
adb logcat | grep -i "clearpath\|error\|exception"

# Uninstall (if needed):
adb uninstall za.org.clearpathjustice.app
```

---

## Commit and Push Changes

```bash
# Check what changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "feat(android): Add Capacitor configuration and Android platform"

# Push to GitHub
git push -u origin android-apk
```

---

## Trigger GitHub Actions Build

```bash
# Option 1: Manually via GitHub UI
# 1. Go to: https://github.com/journomarv/marvinadams-clearpath-justice/actions
# 2. Find "Build ClearPath Justice Android APK" workflow
# 3. Click "Run workflow"
# 4. Select branch: android-apk
# 5. Click "Run workflow"
# 6. Wait for build to complete (~15-20 minutes)

# Option 2: Push to android-apk branch (auto-triggers)
git push origin android-apk
# Workflow starts automatically
```

---

## Download APK from GitHub Actions

```bash
# After workflow completes:
# 1. Go to: https://github.com/journomarv/marvinadams-clearpath-justice/actions
# 2. Click latest "Build ClearPath Justice Android APK" run
# 3. Scroll to "Artifacts" section
# 4. Download "ClearPath-Justice-APK-debug"
# 5. Extract and use: ClearPath-Justice-v1.0.0-debug.apk
```

---

## Troubleshooting Commands

```bash
# Clear all caches and rebuild
npm run build
rm -rf android/
npx cap add android
npx cap sync android
cd android
./gradlew clean assembleDebug
cd ..

# Check Gradle version
cd android && ./gradlew --version && cd ..

# View detailed build errors
cd android
./gradlew assembleDebug --stacktrace
cd ..

# Check web assets in Android
ls -la android/app/src/main/assets/public/

# Verify APK contents
unzip -l android/app/build/outputs/apk/debug/app-debug.apk | grep "public/"

# View app logs on device
adb logcat | grep ClearPath

# View all app logs
adb logcat

# Check device info
adb shell getprop ro.build.version.sdk

# Verify app installed
adb shell pm list packages | grep clearpath
```

---

## Quick Status Checks

```bash
# Verify everything is in place
echo "=== Checking setup ==="
echo "✓ Capacitor config:" && [ -f capacitor.config.ts ] && echo "YES" || echo "NO"
echo "✓ Android directory:" && [ -d android ] && echo "YES" || echo "NO"
echo "✓ Gradle wrapper:" && [ -f android/gradlew ] && echo "YES" || echo "NO"
echo "✓ Build output:" && [ -d dist ] && echo "YES" || echo "NO"
echo "✓ GitHub workflow:" && [ -f .github/workflows/build-apk.yml ] && echo "YES" || echo "NO"
echo "=== Setup complete ==="
```

---

## Common One-Liners

```bash
# Everything at once (from clean state)
npm install && npm run build && npx cap sync android && cd android && ./gradlew assembleDebug && cd ..

# Clean rebuild
rm -rf dist android node_modules && npm install && npm run android:build

# Just update APK (after code changes)
npm run build && npx cap sync android && cd android && ./gradlew assembleDebug && cd ..

# Quick test (build + install)
npm run android:build && adb install android/app/build/outputs/apk/debug/app-debug.apk

# List all APK files
find android -name "*.apk" -type f -exec ls -lh {} \;

# Get APK size
du -h android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Important Paths

```
Project root:                    ~/path/to/marvinadams-clearpath-justice/
Capacitor config:                ./capacitor.config.ts
Android project:                 ./android/
Android app:                      ./android/app/
App manifest:                     ./android/app/src/main/AndroidManifest.xml
App resources:                    ./android/app/src/main/res/
App icons:                        ./android/app/src/main/res/mipmap-*/
App strings (name):              ./android/app/src/main/res/values/strings.xml
Web assets (from dist/):          ./android/app/src/main/assets/public/
Gradle wrapper:                   ./android/gradlew
Build output (Debug APK):         ./android/app/build/outputs/apk/debug/app-debug.apk
Gradle properties:                ./android/gradle.properties
GitHub workflow:                  ./.github/workflows/build-apk.yml
Web build output:                 ./dist/
```

---

## Documentation Files Location

```
All documentation is in: /home/claude/

Files:
- CLEARPATH_ANDROID_GUIDE.md          # Full technical reference
- ANDROID_IMPLEMENTATION_STEPS.md     # Step-by-step guide (15 steps)
- FINAL_DELIVERABLES.md               # Summary and checklist
- QUICK_START_COMMANDS.md             # This file (quick commands)
- capacitor.config.ts                 # Configuration file
- package.json.updated                # Updated dependencies
- build-apk.yml                       # GitHub Actions workflow
- setup-android.sh                    # Automation script
```

---

## Quick Verification

```bash
# After setup, verify everything works:

# 1. Web build
npm run build
echo "✓ Web build complete"

# 2. Capacitor sync
npx cap sync android
echo "✓ Capacitor synced"

# 3. APK build
cd android && ./gradlew assembleDebug && cd ..
echo "✓ APK built"

# 4. APK exists
[ -f android/app/build/outputs/apk/debug/app-debug.apk ] && echo "✓ APK verified" || echo "✗ APK missing"

# 5. APK size
du -h android/app/build/outputs/apk/debug/app-debug.apk

echo "=== All systems ready! ==="
```

---

## Emergency Clean

```bash
# If things break, start fresh:
rm -rf node_modules dist android
npm install
npm run build
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug && cd ..
```

---

## Release Build (After Testing)

```bash
# Generate keystore (ONE TIME - keep it safe!)
keytool -genkey -v -keystore clearpath-release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias clearpath-key

# Edit android/app/build.gradle and add signing config
# (See CLEARPATH_ANDROID_GUIDE.md Phase 6 for details)

# Build release APK
cd android
./gradlew assembleRelease
cd ..

# Verify release APK
ls -lh android/app/build/outputs/apk/release/app-release.apk
```

---

## Time Estimates

```
Task                          Time      Command
--------------------------------------------------
Prerequisites check           2 min     node -v && npm -v && java -version
Repository setup              5 min     git checkout -b android-apk
Copy files                    3 min     cp /home/claude/* ./
Update package.json           3 min     Manual edit or npm install
Automated setup               15 min    ./setup-android.sh
Manual setup (alternative)    15 min    Multiple commands
Build APK locally             15 min    npm run android:build
Test on device                10 min    adb install + testing
Commit and push               5 min     git add/commit/push
GitHub Actions build          20 min    Automatic in Actions
Download APK                  2 min     Download from Actions
--------------------------------------------------
TOTAL (first time)            ~90 min   (~1.5 hours)
TOTAL (subsequent)            ~30 min   (just build + test)
```

---

## Next Steps

1. ✅ Run prerequisite checks
2. ✅ Follow QUICK_START_COMMANDS.md top to bottom
3. ✅ Test APK locally first
4. ✅ Push to GitHub
5. ✅ Run GitHub Actions workflow
6. ✅ Download and test APK from GitHub
7. ✅ Read full guides for advanced topics

---

**Start with**: `./setup-android.sh`  
**Questions?**: Check `ANDROID_IMPLEMENTATION_STEPS.md`  
**Stuck?**: See troubleshooting section above

