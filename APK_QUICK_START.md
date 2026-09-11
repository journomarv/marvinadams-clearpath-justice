# APK Build Setup - Quick Start for ClearPath Justice

Get your Android APK building on GitHub in **5 minutes**.

---

## 🚀 Step 1: Add GitHub Actions Workflow

### Via GitHub Web Interface (Easiest)

1. Go to https://github.com/journomarv/marvinadams-clearpath-justice
2. Click **"Add file"** → **"Create new file"**
3. Name: `.github/workflows/build-apk.yml`
4. Copy entire content from `build-apk.yml` (provided file)
5. Click **"Commit changes"**
6. Message: `ci: Add automatic APK build workflow`

### Via Command Line

```bash
cd ~/path/to/marvinadams-clearpath-justice

# Create directory
mkdir -p .github/workflows

# Copy the workflow file
cp build-apk.yml .github/workflows/

# Commit and push
git add .github/workflows/build-apk.yml
git commit -m "ci: Add automatic APK build workflow"
git push origin main
```

---

## 🚀 Step 2: Update package.json

Replace your current `package.json` with the updated one that includes APK build scripts.

### Via GitHub Web Interface

1. Go to your repo
2. Find `package.json`
3. Click **pencil icon** to edit
4. Replace all content with content from `package.json.apk`
5. Click **"Commit changes"**
6. Message: `build: Add APK build scripts and Capacitor config`

### Via Command Line

```bash
# Backup original
cp package.json package.json.bak

# Copy new version
cp package.json.apk package.json

# Commit
git add package.json
git commit -m "build: Add APK build scripts and Capacitor config"
git push origin main
```

---

## 🚀 Step 3: Enable GitHub Actions

1. Go to repo **Settings**
2. Click **"Actions"** in left menu
3. Click **"General"**
4. Under "Actions permissions", select **"Allow all actions"**
5. Click **"Save"**

Done! ✅

---

## 🚀 Step 4: Test the Build

### First Automatic Build

Just push code! The workflow runs automatically:

```bash
# Make any change to trigger build
echo "# Building APK" >> README.md
git add README.md
git commit -m "docs: Note about APK building"
git push origin main
```

Then check progress:
1. Go to **Actions** tab
2. See "Build ClearPath Justice APK" running
3. Watch it build in real-time

### Manual Build

1. Go to **Actions** tab
2. Click **"Build ClearPath Justice APK"**
3. Click **"Run workflow"**
4. Select build type (debug)
5. Click **"Run workflow"**

---

## 📥 Step 5: Download Your First APK

### After Build Completes

1. Go to **Actions** tab
2. Click the completed workflow
3. Scroll down to **Artifacts** section
4. Click **download icon** next to `clearpath-justice-apk`
5. Unzip the file

Inside you'll find:
- `app-debug.apk` (ready to install)
- `ClearPath-Justice-*.apk` (renamed version)

---

## 📱 Step 6: Install on Android Device

### Connect Your Phone

1. Enable **USB Debugging** on your Android device:
   - Settings → About Phone → Tap "Build Number" 7 times
   - Settings → Developer Options → USB Debugging ✓

2. Connect via USB cable

### Install APK

```bash
# Download the APK artifact from GitHub Actions

# Then install:
adb install ClearPath-Justice-*.apk

# Or:
adb install app-debug.apk
```

### Or Install Manually

1. Download APK file from GitHub Actions
2. Copy to your phone (email, cloud storage, etc.)
3. Open file manager on phone
4. Tap the APK file
5. Tap "Install"
6. Open "ClearPath Justice" from app drawer

---

## ✅ You're Done!

That's it! Now you have:

✅ **Automatic APK builds** on every push
✅ **GitHub Actions** handling the building
✅ **APK downloads** from artifacts
✅ **No local setup** needed

---

## 🎯 Common Tasks

### Download Latest APK

1. Go to **Actions** tab
2. Click latest build
3. Download artifact
4. Unzip

### View Build Logs

1. Go to **Actions** tab
2. Click a build
3. Click each step to expand logs
4. See what happened

### Trigger Manual Build

1. Go to **Actions** tab
2. Click **"Build ClearPath Justice APK"**
3. Click **"Run workflow"**
4. Select build type
5. Click **"Run workflow"**

### Add More Build Options

Edit `.github/workflows/build-apk.yml` to add:
- Release builds
- Different variants
- Testing builds
- Multiple APK formats

---

## 🆘 Troubleshooting

### Build Failed?

1. Go to **Actions** tab
2. Click the failed build
3. Click the failed step
4. Read the error
5. Common issues:
   - `npm` cache issue → Clear and retry
   - Java issue → Usually temporary on GitHub
   - Gradle issue → Check Android gradle config

### APK Not Downloading?

1. Ensure build completed successfully (green ✓)
2. Scroll down to **Artifacts** section
3. Click **download icon**
4. Check Downloads folder
5. Unzip the .zip file

### Can't Install on Phone?

1. Enable **Unknown Sources** in Settings
2. Ensure USB Debugging enabled
3. Try: `adb install -r` (reinstall with replace)
4. Check adb connection: `adb devices`

---

## 📊 What's Happening

### Behind the Scenes

When you push to GitHub:

1. **GitHub Actions** detects your push
2. **Spins up Ubuntu machine** in cloud
3. **Installs Node.js** and Java
4. **Builds your React** app with Vite
5. **Sets up Capacitor** for Android
6. **Runs Gradle** to build APK
7. **Uploads APK** as artifact
8. **Keeps for 30 days** for download

No local Android SDK needed. No Java installation needed. All in the cloud! ☁️

---

## 🎓 Next Steps

### Immediate
- [x] Add workflow file
- [x] Update package.json
- [x] Test build
- [x] Download APK
- [x] Install on phone

### Soon
- [ ] Share APK with testers
- [ ] Collect feedback
- [ ] Iterate on features

### Later
- [ ] Set up Play Store releases
- [ ] Sign release APKs
- [ ] Automate everything

---

## 📚 Full Documentation

For complete details, see: **GITHUB_APK_SETUP.md**

This guide covers:
- ✅ Full setup with screenshots
- ✅ Local building (optional)
- ✅ Advanced GitHub Actions
- ✅ Troubleshooting
- ✅ Security notes
- ✅ Best practices

---

## 💡 Pro Tips

### Tip 1: Keep Files Updated
```bash
# After you make changes to App.jsx, main.jsx, etc.
git push origin main
# APK builds automatically!
```

### Tip 2: Download While Building
- You can download artifacts from past builds
- No need to wait for new build
- Or trigger manual build anytime

### Tip 3: Share with Testers
1. Download APK from GitHub Actions
2. Share via email/cloud storage
3. They install and test
4. Get feedback
5. You fix and push new version
6. GitHub rebuilds automatically

### Tip 4: Version Tracking
APK filename shows timestamp:
```
ClearPath-Justice-v1.0.0-debug-20240115_143022.apk
                       ▲              ▲
                    version         timestamp
```

This helps track which version testers have.

---

## 🎉 Success!

You now have:

✅ Automatic Android APK building
✅ GitHub Actions handling compilation
✅ APK ready to download after each push
✅ No local setup headaches
✅ Easy sharing with testers
✅ Full build history and logs

**Congratulations!** 🚀

Your ClearPath Justice app can now be built as an Android APK automatically!

---

## 📞 Questions?

**Setup issues?** → Check "Troubleshooting" above
**Want more details?** → See GITHUB_APK_SETUP.md
**Android questions?** → Check developer.android.com
**GitHub Actions help?** → docs.github.com/en/actions

---

**Ready to build?** Push your code to GitHub and watch the APK build automatically! 🎉
