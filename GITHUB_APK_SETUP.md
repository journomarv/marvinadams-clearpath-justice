# GitHub Actions APK Build Setup for ClearPath Justice

Complete guide to set up automatic Android APK building on GitHub.

---

## 🎯 What This Does

This setup enables GitHub to **automatically build your Android APK** whenever you push code. You get:

✅ **Automatic builds** on every push to main/android-apk branch
✅ **Manual builds** via GitHub Actions UI
✅ **Automatic releases** of APKs
✅ **Build artifacts** available for download
✅ **Build logs** for debugging
✅ **No local Android SDK** needed

---

## 📋 Prerequisites

- ✅ GitHub repository (you have this)
- ✅ React/Vite project (you have this)
- ✅ git installed locally

**You do NOT need:**
- Android SDK installed locally
- Gradle installed locally
- Java installed locally
- Android Studio

GitHub Actions runs everything in the cloud.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create GitHub Actions Directory

On GitHub web interface or locally:

```bash
mkdir -p .github/workflows
```

### Step 2: Add Workflow File

Create `.github/workflows/build-apk.yml` with the content from `build-apk.yml` (provided).

**Via GitHub Web UI:**
1. Go to your repository
2. Click "Add file" → "Create new file"
3. Name it: `.github/workflows/build-apk.yml`
4. Paste the workflow content
5. Commit with message: `ci: Add APK build workflow`

**Via Command Line:**
```bash
# Copy the workflow file
cp build-apk.yml .github/workflows/

# Commit and push
git add .github/workflows/build-apk.yml
git commit -m "ci: Add APK build workflow"
git push origin main
```

### Step 3: Update package.json

Replace your `package.json` with the updated version that includes:
- APK build scripts
- Capacitor configuration
- Required dependencies

```bash
# Backup original
cp package.json package.json.bak

# Use the new one
cp package.json.apk package.json

# Commit
git add package.json
git commit -m "build: Add APK build scripts and Capacitor config"
git push origin main
```

### Step 4: Enable GitHub Actions

1. Go to repository Settings
2. Click "Actions" → "General"
3. Ensure "Actions permissions" is set to "Allow all actions"
4. Save

### Step 5: Test the Build

1. Go to "Actions" tab
2. You should see "Build ClearPath Justice APK" workflow
3. Click it
4. Click "Run workflow" → "Run workflow"
5. Watch the build progress in real-time

---

## 📲 Using GitHub Actions

### Automatic Builds

Builds run automatically when you:
- Push to `main` branch
- Push to `android-apk` branch
- Push to `android-apk-setup` branch

### Manual Builds

To manually trigger a build:

1. Go to **Actions** tab
2. Click **"Build ClearPath Justice APK"** workflow
3. Click **"Run workflow"** dropdown
4. Select build type (debug or release)
5. Click **"Run workflow"**

### Monitoring Build Progress

1. Go to **Actions** tab
2. Click the latest build
3. Watch the progress in real-time
4. See detailed logs for each step

### Downloading APK

#### After Successful Build:

1. Go to **Actions** tab
2. Click the completed build
3. Scroll down to **"Artifacts"**
4. Download `clearpath-justice-apk`
5. Extract the .zip file
6. Your APK is inside

---

## 🛠️ Build Scripts

### npm Scripts Added

```bash
# Full build: web + Android sync + APK
npm run apk:build

# Just build web assets
npm run build

# Sync to Android (after build)
npm run build:android

# Build debug APK (requires sync first)
npm run apk:debug

# Build release APK (requires sync first)
npm run apk:release

# Sync Capacitor
npm run cap:sync

# Open Android Studio
npm run cap:open:android
```

---

## 💻 Local Building (Optional)

You can also build locally using the provided script:

### Quick Local Build

```bash
chmod +x build-apk.sh
./build-apk.sh
```

This handles everything and outputs the APK location.

### Manual Local Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build web assets:**
   ```bash
   npm run build
   ```

3. **Add Android platform (if needed):**
   ```bash
   npx cap add android
   ```

4. **Sync to Android:**
   ```bash
   npx cap sync android
   ```

5. **Build APK:**
   ```bash
   npm run apk:debug
   ```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📱 Installing on Android Device

### Prerequisites
- USB cable
- Android device with USB debugging enabled
- ADB (Android Debug Bridge) installed

### Enable USB Debugging on Phone

1. Open Settings
2. Go to About Phone
3. Tap "Build Number" 7 times
4. Go back to Settings
5. Find "Developer Options"
6. Enable "USB Debugging"

### Install APK

```bash
# Connect phone via USB
# Then run:
adb install path/to/ClearPath-Justice-*.apk

# Or use the APK file directly:
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Verify Installation

- App appears in your app drawer as "ClearPath Justice"
- Tap to launch
- Test the eligibility checker

---

## 🐛 Troubleshooting

### Build Fails in GitHub Actions

**Check:**
1. Go to **Actions** tab
2. Click failed build
3. Expand failed step
4. Read the error message
5. Common issues below

### Common Issues

#### "dist directory is empty"
**Problem:** Web build failed
**Solution:**
```bash
npm run build
# Check for errors in output
# Fix the error, then retry
```

#### "gradlew: Permission denied"
**Problem:** Gradle wrapper not executable
**Solution:**
```bash
chmod +x android/gradlew
git add android/gradlew
git commit -m "fix: Make gradlew executable"
git push
```

#### "java: command not found" (Local)
**Problem:** Java not installed
**Solution:**
- **macOS:** `brew install openjdk@17`
- **Linux:** `sudo apt-get install openjdk-17-jdk`
- **Windows:** Download from adoptopenjdk.net

#### Build takes too long
**Note:** First build takes 15-20 minutes. Subsequent builds are faster due to caching.

#### APK not found
**Problem:** Build failed silently
**Solution:**
- Check Actions logs for errors
- Verify `npm run build` works locally
- Ensure dist/ has files

---

## 🔒 Security Notes

### Keep Secrets Safe

The workflow file contains no secrets. If you need to:

1. **Sign APKs:** Add signing keys to GitHub Secrets
2. **Upload to Play Store:** Add credentials to Secrets
3. **Send notifications:** Add webhook URLs to Secrets

See GitHub documentation on Actions Secrets.

### No Sensitive Data

✓ No credentials in code
✓ No API keys in workflow
✓ No personal data collected
✓ Logs are private (except public releases)

---

## 📊 Build Matrix (Advanced)

To build for multiple Android versions:

```yaml
strategy:
  matrix:
    android-api: [29, 30, 31, 32, 33]
```

See GitHub Actions documentation for details.

---

## 📈 Monitoring

### Build History

1. Go to **Actions** tab
2. See all previous builds
3. Check duration and status
4. Download artifacts from past builds

### Build Insights

- **Successful builds** show green ✓
- **Failed builds** show red ✗
- **Logs** show all details
- **Artifacts** available for 30 days

---

## 🚀 Next Steps

### Immediate
1. ✅ Add `.github/workflows/build-apk.yml`
2. ✅ Update `package.json`
3. ✅ Push to GitHub
4. ✅ Watch first build in Actions

### Short Term
1. Test APK on Android device
2. Verify all features work
3. Collect feedback

### Long Term
1. Set up release automation
2. Add signing keys for production
3. Automate Play Store uploads
4. Set up beta testing program

---

## 📚 Reference

### Workflow Triggers

Build runs automatically on:
- Push to `main`
- Push to `android-apk`
- Push to `android-apk-setup`
- Manual trigger via Actions UI

### Build Outputs

After successful build:
- `android/app/build/outputs/apk/debug/app-debug.apk` (debug)
- `android/app/build/outputs/apk/release/app-release.apk` (release, if signing configured)

### Artifact Retention

- Debug APKs: 30 days
- Released APKs: Indefinite (on Releases page)
- Logs: 90 days

---

## 💡 Pro Tips

1. **Name your commits clearly:**
   ```bash
   git commit -m "feat(eligibility): Add new question section"
   # Triggers build automatically
   ```

2. **Test locally first:**
   ```bash
   npm run build
   # Verify no errors before pushing
   ```

3. **Monitor Actions regularly:**
   - Go to Actions tab after each push
   - Catch build issues early
   - Download successful APKs

4. **Use GitHub Releases:**
   - Attach APKs to releases
   - Share with testers
   - Version control for APKs

5. **Create release notes:**
   - Document changes in each build
   - Help testers understand updates
   - Track what changed

---

## ✅ Checklist

Before launching:
- [ ] `.github/workflows/build-apk.yml` added
- [ ] `package.json` updated with APK scripts
- [ ] GitHub Actions enabled in repo settings
- [ ] First build successful
- [ ] APK downloaded and tested
- [ ] Build logs reviewed
- [ ] Team knows how to download APKs

---

## 🆘 Support

### GitHub Actions Documentation
- https://docs.github.com/en/actions

### Capacitor Documentation
- https://capacitorjs.com/docs

### Android Development
- https://developer.android.com/guide

### Common Gradle Issues
- https://gradle.org/troubleshooting/

---

## 🎉 Done!

You now have automatic APK building on GitHub.

**Every push** → **Automatic build** → **APK ready to download**

No more manual building. No more Android SDK setup headaches.

Just push code, and GitHub builds your APK automatically! 🚀

---

**Questions?** Check the troubleshooting section or GitHub Actions documentation.
**Ready to build?** Push your code to GitHub and watch the magic happen!
