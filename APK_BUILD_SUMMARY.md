# ClearPath Justice - GitHub APK Build Setup

**Complete delivery of automatic Android APK building configuration.**

---

## 📦 What You're Getting

### 4 Essential Files

1. **`.github/workflows/build-apk.yml`**
   - GitHub Actions workflow configuration
   - Automatically builds APK on every push
   - Runs in the cloud (no local setup needed)
   - Uploads APK as downloadable artifact

2. **`package.json` (updated)**
   - Added APK build scripts
   - Capacitor configuration for Android
   - All dependencies for building

3. **`build-apk.sh`**
   - Local build script (optional)
   - For building APK on your machine
   - Handles all steps automatically

4. **Documentation**
   - `APK_QUICK_START.md` — Get started in 5 minutes
   - `GITHUB_APK_SETUP.md` — Complete reference guide
   - This summary file

---

## 🎯 What This Enables

✅ **Automatic APK builds** on every code push
✅ **No local Android SDK** needed
✅ **No Java installation** on your machine
✅ **Zero configuration** hassle
✅ **Download APK** from GitHub Actions
✅ **Test on Android** immediately
✅ **Share with testers** easily
✅ **Full build history** on GitHub
✅ **Real-time build logs** for debugging
✅ **Manual triggers** if needed

---

## 🚀 Setup (5 Minutes Total)

### Minute 1-2: Add Workflow File

**GitHub Web UI:**
1. Go to your repo: https://github.com/journomarv/marvinadams-clearpath-justice
2. Click "Add file" → "Create new file"
3. Name: `.github/workflows/build-apk.yml`
4. Paste content from `build-apk.yml`
5. Commit

**Or Command Line:**
```bash
cd ~/path/to/marvinadams-clearpath-justice
mkdir -p .github/workflows
cp build-apk.yml .github/workflows/
git add .github/workflows/build-apk.yml
git commit -m "ci: Add APK build workflow"
git push
```

### Minute 3-4: Update package.json

**GitHub Web UI:**
1. Click on `package.json` in repo
2. Click pencil to edit
3. Replace all content with `package.json.apk`
4. Commit

**Or Command Line:**
```bash
cp package.json.apk package.json
git add package.json
git commit -m "build: Add APK scripts"
git push
```

### Minute 5: Enable Actions

1. Go to repo Settings
2. Click "Actions" → "General"
3. Select "Allow all actions"
4. Save

**Done!** ✅

---

## 📱 Your First APK Build

### Automatic Build (Recommended)

Just push code:
```bash
git push origin main
```

Then:
1. Go to **Actions** tab on GitHub
2. See "Build ClearPath Justice APK" running
3. Watch it build (takes 5-10 minutes)
4. Download APK when complete

### Manual Build

1. Go to **Actions** tab
2. Click "Build ClearPath Justice APK"
3. Click "Run workflow" dropdown
4. Select build type
5. Click "Run workflow"

---

## 📥 Download & Install APK

### Download from GitHub

1. Go to **Actions** tab
2. Click completed build
3. Scroll to "Artifacts"
4. Click `clearpath-justice-apk` to download
5. Unzip the .zip file

### Install on Android Device

```bash
# Enable USB Debugging on your phone first!
# Settings → About → Tap "Build Number" 7 times
# Settings → Developer Options → USB Debugging ✓

# Connect phone via USB
adb install ClearPath-Justice-v1.0.0-debug.apk

# Or manually: Send file to phone, tap it, install
```

---

## 💻 Files Provided

```
clearpath-justice-apk-build/
├── build-apk.yml                    # GitHub Actions workflow ← Add to .github/workflows/
├── package.json.apk                 # Updated package.json ← Replace existing
├── build-apk.sh                     # Local build script (optional)
├── APK_QUICK_START.md               # 5-minute setup guide ← START HERE
├── GITHUB_APK_SETUP.md              # Complete reference
├── APK_BUILD_SUMMARY.md             # This file
└── README.md                        # General project info
```

---

## ✅ The Process (What Happens Behind Scenes)

### When You Push Code

1. **GitHub detects push** → Your repository changes
2. **Actions starts** → GitHub cloud machine spins up
3. **Installs dependencies** → Node.js, Java, Android tools (all automatic)
4. **Builds React app** → Vite builds your TypeScript/React code
5. **Sets up Capacitor** → Wraps React app for Android
6. **Runs Gradle** → Android build system compiles APK
7. **Uploads artifact** → APK available for download
8. **Sends report** → Shows build status and logs

Total time: **5-10 minutes** (first build slower, subsequent faster)

Result: **APK ready to download and install** ✅

---

## 🎯 Daily Workflow

### Your Typical Day

```
1. Make changes to App.jsx
   git add .
   git commit -m "feat: Add new eligibility question"
   git push origin main
   ↓
2. GitHub Actions automatically builds APK (5-10 min)
   ↓
3. APK is ready to download from GitHub Actions
   ↓
4. Send APK to testers or install on your phone
   ↓
5. Get feedback and iterate
```

No manual building. No Android SDK setup. No Gradle commands.

**Just push code. GitHub builds APK automatically.** 🚀

---

## 🔄 Update Workflow

When you make changes:

```bash
# Make your changes
# (e.g., fix eligibility checker, update UI)

# Commit locally
git add .
git commit -m "fix: Correct eligibility criteria calculation"

# Push to GitHub
git push origin main

# GitHub Actions starts automatically
# APK builds in ~5-10 minutes
# Download from Actions tab
```

---

## 🧪 Testing the Build

### Immediate Testing

After first build:

1. **Download APK** from GitHub Actions
2. **Connect Android device** via USB
3. **Enable USB Debugging** on phone
4. **Install APK:** `adb install app-debug.apk`
5. **Launch app** and test
6. **Report issues** so you can fix them

### For Testers

1. **Share APK file** (email/cloud storage)
2. **Testers install** on their phones
3. **They test features** and report bugs
4. **You fix and push** new version
5. **GitHub rebuilds** automatically

---

## 🔍 Monitoring Builds

### View Build Status

1. Go to **Actions** tab
2. See all builds (newest first)
3. Green ✓ = successful
4. Red ✗ = failed

### Check Build Logs

1. Click a build
2. Expand each step
3. See what happened
4. Troubleshoot any issues

### Download Any APK

Even old builds!
1. Click a past build
2. Scroll to Artifacts
3. Download (available 30 days)

---

## 🛠️ Build Scripts (Reference)

Once set up, you can use these npm scripts:

```bash
# Build web + sync to Android + create APK (all in one)
npm run apk:build

# Just build web assets
npm run build

# Sync Capacitor to Android
npm run build:android

# Build debug APK (requires sync first)
npm run apk:debug

# Build release APK (requires sync first)
npm run apk:release

# Add Android platform (if missing)
npm run cap:add:android

# Sync Capacitor
npm run cap:sync
```

---

## 📊 Build Artifacts

### What Gets Built

✅ **Debug APK** (for testing)
- App with debug symbols
- Easier to test
- Larger file size
- Not for production

✅ **Release APK** (for distribution)
- Optimized for production
- No debug symbols
- Smaller file size
- Requires signing key (setup optional)

### Download Locations

- **GitHub Actions Artifacts** → 30 day retention
- **GitHub Releases** (if configured) → Indefinite
- **Build Logs** → 90 day retention

---

## 🎯 Advanced Features (Optional)

### Manual Build Locally

For developers who have Android setup:

```bash
# Make build script executable
chmod +x build-apk.sh

# Run it
./build-apk.sh

# Builds everything locally
```

### GitHub Releases

To automatically create releases:
1. Tag your code: `git tag v1.0.0`
2. Workflow creates release
3. APK attached to release
4. Testers can download from releases

### Signing Release APKs

To sign APKs for Play Store:
1. Create signing key
2. Add to GitHub Secrets
3. Update workflow configuration
4. Release APKs automatically signed

---

## 🐛 Troubleshooting

### Build Failed?

**Check the logs:**
1. Go to Actions tab
2. Click failed build
3. Expand failed step
4. Read error message

**Common issues:**
- `npm` cache → Retry or clear cache
- Java version → Usually temporary
- Network timeout → Retry

### APK Not Downloading?

1. Ensure build shows green ✓ (successful)
2. Scroll down to Artifacts section
3. Click download icon
4. Wait for .zip download
5. Extract the file

### Installation Issues?

```bash
# Clear old installation first
adb uninstall org.clearpath.justice

# Then install new APK
adb install app-debug.apk
```

---

## 📚 Additional Resources

### GitHub Actions
- Docs: https://docs.github.com/en/actions
- Learn: https://github.com/actions

### Capacitor & Android
- Capacitor: https://capacitorjs.com
- Android: https://developer.android.com

### ADB (Android Debug Bridge)
- Docs: https://developer.android.com/tools/adb
- Install: https://developer.android.com/tools/releases/platform-tools

---

## ✨ Key Benefits

| Feature | Benefit |
|---------|---------|
| **Automatic builds** | No manual work |
| **Cloud-based** | No local setup needed |
| **Fast** | 5-10 minutes per build |
| **Reliable** | Consistent environment |
| **Shareable** | Easy to give testers APK |
| **Archived** | Build history available |
| **Logged** | Full build logs for debugging |
| **Free** | Included with GitHub |

---

## 🎓 Learning Path

### Day 1: Setup (5 min)
- [ ] Add workflow file
- [ ] Update package.json
- [ ] Enable Actions
- [ ] Watch first build

### Day 2: Test (15 min)
- [ ] Download APK
- [ ] Install on phone
- [ ] Test basic features
- [ ] Report any issues

### Day 3: Iterate (varies)
- [ ] Make code changes
- [ ] Push to GitHub
- [ ] Build automatically
- [ ] Share with testers

### Day 4+: Scale (ongoing)
- [ ] Collect tester feedback
- [ ] Fix bugs
- [ ] Add features
- [ ] Repeat

---

## 🚀 Next Steps

### Immediate (Right Now)

1. ✅ Read this summary
2. ✅ Follow **APK_QUICK_START.md**
3. ✅ Add workflow file
4. ✅ Update package.json

### First Hour

5. ✅ Push to GitHub
6. ✅ Watch first build in Actions
7. ✅ Download APK
8. ✅ Install on phone

### That Day

9. ✅ Test the app
10. ✅ Report any issues
11. ✅ Plan improvements

### That Week

12. ✅ Make improvements
13. ✅ Build new APK
14. ✅ Share with testers
15. ✅ Iterate

---

## 📞 Support

### Questions?

**5-minute setup?** → See **APK_QUICK_START.md**
**Detailed setup?** → See **GITHUB_APK_SETUP.md**
**Troubleshooting?** → Check "Troubleshooting" section above
**GitHub help?** → docs.github.com/en/actions
**Android help?** → developer.android.com

### Common Questions

**Q: Do I need Android Studio?**
A: No! GitHub builds everything.

**Q: Do I need Java installed?**
A: No! GitHub has everything needed.

**Q: How long does building take?**
A: First build: 15-20 min. Later builds: 5-10 min.

**Q: Can I build locally?**
A: Yes, optional. Use build-apk.sh if you want.

**Q: How do I share APK with testers?**
A: Download from GitHub Actions, email/cloud storage, they install.

**Q: Can I automate Play Store uploads?**
A: Yes, but requires additional setup (optional).

---

## 🎉 You're All Set!

Everything you need to:

✅ **Build APK automatically** on GitHub
✅ **Download and test** on Android phones
✅ **Share with testers** easily
✅ **Iterate quickly** with your team
✅ **Scale to production** when ready

**No complex setup. No Android SDK. No manual building.**

Just push code. GitHub does the rest! 🚀

---

## 📋 Checklist

Before you start:
- [ ] Have GitHub account (you do)
- [ ] Have repository (you do)
- [ ] Have React/Vite project (you do)
- [ ] Read this file ✓

To get started:
- [ ] Follow APK_QUICK_START.md
- [ ] Add workflow file
- [ ] Update package.json
- [ ] Push to GitHub
- [ ] Watch first build
- [ ] Download APK
- [ ] Test on phone
- [ ] Share with team

---

**Congratulations!** 🎉

You now have everything needed for automatic APK building.

**Ready?** Start with **APK_QUICK_START.md** (5 minutes) →

Happy building! 🚀
