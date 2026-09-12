# ClearPath Justice Android Update — Quick Reference Card

**Keep this handy while implementing!**

---

## 🎯 Three Main Tasks

### 1. APP ICON
**What:** Replace Android app icon with ClearPath Justice logo  
**Where:** `android/app/src/main/res/mipmap-*/`  
**Guide:** ANDROID_APP_ICON_SETUP.md  
**Time:** 15 min  
**Key:** Create 6 sizes (36×36 to 192×192)

### 2. ELIGIBILITY SCREENING
**What:** Audit and test the screening logic  
**Where:** `src/logic/` & `src/components/`  
**Guide:** ELIGIBILITY_SCREENING_AUDIT.md  
**Time:** 1-2 hours  
**Key:** Verify all pathways match CPPA criteria

### 3. BUILD & TEST
**What:** Build APK and test on Android device  
**Where:** Project root & Android device  
**Guide:** ANDROID_IMPLEMENTATION_GUIDE.md  
**Time:** 1.5 hours  
**Key:** Verify icon displays correctly

---

## 🚀 Five Quick Commands

```bash
# 1. Generate all icon sizes (from logo)
convert 1000099827.png -resize 36x36 android/app/src/main/res/mipmap-ldpi/ic_launcher.png
# Repeat for: 48, 72, 96, 144, 192 pixels

# 2. Build web assets
npm run build

# 3. Sync to Android
npx cap sync android --deployment

# 4. Build APK
cd android && ./gradlew clean assembleDebug && cd ..

# 5. Install on device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📂 Icon Directory Structure

```
android/app/src/main/res/
├── mipmap-ldpi/          ic_launcher.png (36×36)
├── mipmap-mdpi/          ic_launcher.png (48×48)
├── mipmap-hdpi/          ic_launcher.png (72×72)
├── mipmap-xhdpi/         ic_launcher.png (96×96)
├── mipmap-xxhdpi/        ic_launcher.png (144×144)
├── mipmap-xxxhdpi/       ic_launcher.png (192×192)
├── mipmap-anydpi-v26/    ic_launcher.xml (config)
└── values/               ic_launcher_background.xml (color)
```

---

## 🔍 Screening Audit Checklist

**Questions to Review:**
- [ ] Question 1: Cannabis conviction?
- [ ] Question 2: When was conviction?
- [ ] Question 3: Violence/injury involved?
- [ ] Question 4: Personal use only?
- [ ] Question 5: Other factors?

**Logic to Verify:**
- [ ] Section 5.1 (automatic): Pre-2024 + no violence + personal use = ELIGIBLE
- [ ] Section 5.2 (application): Meets criteria + no disqualifiers = ELIGIBLE  
- [ ] Ineligible: Violence/injury element present = INELIGIBLE
- [ ] Ineligible: No conviction on record = INELIGIBLE

**Test Scenarios:**
- [ ] Eligible pre-2024, no violence (Case A1)
- [ ] Eligible Section 5.2 criteria (Case A2)
- [ ] Ineligible with violence (Case B1)
- [ ] Ineligible no record (Case B3)

---

## 🧪 Testing on Device

### Install APK
```bash
# Enable USB Debugging on phone first!
# Settings → Developer Options → USB Debugging ✓

adb devices                    # Verify device shows
adb install app-debug.apk      # Install APK
```

### Verify Icon
- [ ] Icon visible on home screen
- [ ] Icon visible in app drawer
- [ ] Icon NOT pixelated/stretched
- [ ] Icon is professional
- [ ] Icon is ClearPath Justice logo

### Test Screening
- [ ] App launches without crash
- [ ] Can answer all questions
- [ ] Can go forward/backward
- [ ] Result matches answers
- [ ] Disclaimer is visible
- [ ] Can restart screening

---

## 🛠️ Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Icon pixelated | Regenerate from high-res logo |
| Icon not showing | Clean build: `./gradlew clean` |
| Build fails | Install Java: `brew install openjdk@17` |
| Logic wrong | Review src/logic/eligibilityLogic.js |
| App crashes | Check: `adb logcat \| grep crash` |
| APK not found | Check path: `android/app/build/outputs/apk/debug/` |

---

## 📋 Files & What They Do

| File | Purpose | Located In |
|------|---------|-----------|
| `CLEARPATH_ANDROID_UPDATE_PLAN.md` | Full project plan | /outputs |
| `ANDROID_IMPLEMENTATION_GUIDE.md` | Step-by-step how-to | /outputs |
| `ANDROID_APP_ICON_SETUP.md` | Icon details | /outputs |
| `ELIGIBILITY_SCREENING_AUDIT.md` | Audit framework | /outputs |
| `eligibilityLogic.js` | Decision logic | `src/logic/` |
| `EligibilityChecker.jsx` | Screening UI | `src/components/` |
| `AndroidManifest.xml` | App config | `android/app/src/main/` |
| `ic_launcher.png` | Icon files | `android/app/src/main/res/mipmap-*` |

---

## ⏱️ Time Breakdown

```
Icon Setup:           15 min  ████░░░░░░░░░░░░░░░░
Screening Audit:   1:30 hrs  ████████████░░░░░░░░
Build APK:           10 min  ████░░░░░░░░░░░░░░░░
Device Testing:      30 min  ███░░░░░░░░░░░░░░░░
Final Verify:        30 min  ███░░░░░░░░░░░░░░░░
────────────────────────────────────
Total:           3:00 hrs
```

---

## 🎯 Decision Tree

**Start Here → Which Task First?**

```
Do you have the logo?
├─ YES → Convert to icon sizes (Part 1)
└─ NO → Use provided logo: 1000099827.png

Is Android platform added?
├─ YES → Run build script
└─ NO → Run: npx cap add android

Have you tested the screening?
├─ YES → Build APK
└─ NO → Audit screening first (use framework)

APK built successfully?
├─ YES → Install on device
└─ NO → Check troubleshooting

Icon displays correctly?
├─ YES → Test screening on device
└─ NO → Regenerate icons (use script)

All tests pass?
├─ YES → ✅ PROJECT COMPLETE
└─ NO → Debug issue & retry
```

---

## 💾 Backup Commands

```bash
# Before you start
git stash                          # Save changes
git checkout main                  # Start fresh

# During work
git add .                          # Stage changes
git commit -m "feat: Update app icon and audit screening"

# After successful build
cp android/app/build/outputs/apk/debug/app-debug.apk \
   ~/Desktop/ClearPath-Justice-BACKUP.apk
```

---

## 📱 Android Versions

| Version | API | Support |
|---------|-----|---------|
| Android 8 (Oreo) | 26 | ✓ Min supported |
| Android 9 (Pie) | 28 | ✓ Tested |
| Android 10 | 29 | ✓ Recommended |
| Android 11+ | 30+ | ✓ Latest |

**Adaptive icons available:** Android 8+ (API 26+)

---

## 🎨 Icon Colors

| Element | Color | Hex |
|---------|-------|-----|
| Background | White | #FFFFFF |
| Navy (scales) | Navy | #1a3a52 |
| Green (tree) | Green | #2d7a4f |
| Gold (accents) | Gold | #b59c5a |

---

## 📞 One-Liners

```bash
# Icon: Generate all 6 sizes
for SIZE in 36 48 72 96 144 192; do convert 1000099827.png -resize ${SIZE}x${SIZE} "icon-${SIZE}.png"; done

# Build: Full process
npm run build && npx cap sync android && cd android && ./gradlew clean assembleDebug

# Test: Install and launch
adb install app-debug.apk && adb shell am start -n org.clearpath.justice/.MainActivity

# Debug: View crashes
adb logcat | grep -i crash
```

---

## ✅ Sign-Off Checklist

- [ ] **Icon**
  - [ ] 6 sizes created
  - [ ] XML config added
  - [ ] Displays correctly

- [ ] **Screening**
  - [ ] Logic reviewed
  - [ ] Tests passed
  - [ ] Legal verified

- [ ] **Build**
  - [ ] No errors
  - [ ] APK created
  - [ ] ~30MB size

- [ ] **Testing**
  - [ ] App installs
  - [ ] Icon correct
  - [ ] Screening works
  - [ ] No crashes

**Status: [ ] Complete [ ] In Progress [ ] Not Started**

---

## 🚀 Launch Sequence

```
1. Read ANDROID_UPDATE_EXECUTIVE_SUMMARY.md        (5 min)
2. Follow ANDROID_IMPLEMENTATION_GUIDE.md Part 1    (15 min)
3. Complete ELIGIBILITY_SCREENING_AUDIT.md          (1-2 hrs)
4. Run build_apk.sh script                          (15 min)
5. Run test_on_device.sh script                     (10 min)
6. Verify icon & test screening                     (30 min)
7. ✅ DONE!
```

---

## 📚 Document Map

```
START HERE
    ↓
ANDROID_UPDATE_EXECUTIVE_SUMMARY.md
    ├─ Icon → ANDROID_APP_ICON_SETUP.md
    ├─ Screening → ELIGIBILITY_SCREENING_AUDIT.md
    └─ Build → ANDROID_IMPLEMENTATION_GUIDE.md
```

---

## 🎯 Success Looks Like

```
Home Screen:  [ClearPath Logo] ✓ Not pixelated
App Drawer:   ClearPath Justice (icon correct) ✓
Settings:     App shows correct icon ✓
Run Screening: All scenarios pass ✓
Test Case 1:   "ELIGIBLE" ✓
Test Case 2:   "ELIGIBLE" ✓
Test Case 3:   "INELIGIBLE" ✓
Test Case 4:   "INELIGIBLE" ✓
Final Result:  APK ready for distribution ✓
```

---

## 🎓 Learning Resources

- Android: https://developer.android.com
- React: https://react.dev
- Capacitor: https://capacitorjs.com
- ImageMagick: https://imagemagick.org
- ADB: https://developer.android.com/tools/adb

---

## 📝 Notes

**Key Points to Remember:**

1. **Icon:** Use the provided logo (1000099827.png)
2. **Sizes:** 36, 48, 72, 96, 144, 192 pixels
3. **Screening:** Verify CPPA Section 5.1 and 5.2 logic
4. **Testing:** Must test on real Android device
5. **Verification:** Confirm icon displays correctly after install

---

## 📞 Stuck?

1. **Icon issue?** → ANDROID_APP_ICON_SETUP.md (Troubleshooting)
2. **Logic issue?** → ELIGIBILITY_SCREENING_AUDIT.md (Verification)
3. **Build issue?** → ANDROID_IMPLEMENTATION_GUIDE.md (Troubleshooting)
4. **Test issue?** → Run: `adb logcat` to see errors

---

**Print this page and keep it handy!** 📋

All detailed guides in `/outputs` folder.

**Ready? Open ANDROID_UPDATE_EXECUTIVE_SUMMARY.md and start now!** 🚀
