# ClearPath Justice Android App Update Plan

**Objective:** Update the ClearPath Justice Android app with the professional logo as app icon and conduct comprehensive eligibility screening audit.

**Repository:** https://github.com/journomarv/marvinadams-clearpath-justice

---

## 🎯 Phase 1: Prepare the ClearPath Justice Logo for Android

### Step 1.1: Convert Logo to Android Icon Formats

**Current Logo Information:**
- Format: PNG with transparency
- Size: ~1000x1200px (approximate)
- Colors: Navy (#1a3a52), Green (#2d7a4f), Gold (#b59c5a)
- Design: Professional justice-focused with scales, tree, and path

**Action Items:**

```bash
# 1. Ensure you have the high-resolution logo
File: 1000099827.png (provided)

# 2. Create Android icon assets at required sizes
# Using ImageMagick or similar tool:

convert 1000099827.png -resize 36x36 \
  android/app/src/main/res/mipmap-ldpi/ic_launcher.png

convert 1000099827.png -resize 48x48 \
  android/app/src/main/res/mipmap-mdpi/ic_launcher.png

convert 1000099827.png -resize 72x72 \
  android/app/src/main/res/mipmap-hdpi/ic_launcher.png

convert 1000099827.png -resize 96x96 \
  android/app/src/main/res/mipmap-xhdpi/ic_launcher.png

convert 1000099827.png -resize 144x144 \
  android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png

convert 1000099827.png -resize 192x192 \
  android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
```

### Step 1.2: Set Up Adaptive Icon (Android 8+)

**Create:** `android/app/src/main/res/values/ic_launcher_background.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#ffffff</color>
</resources>
```

**Rationale:** White background allows the icon to adapt to different launcher themes while keeping the ClearPath logo as the foreground.

**Create:** `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

### Step 1.3: Verify Android Manifest

**File:** `android/app/src/main/AndroidManifest.xml`

Ensure the application element references the correct icons:

```xml
<application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:label="@string/app_name"
    android:theme="@style/AppTheme"
    ...
>
```

---

## 🔍 Phase 2: Audit the Eligibility Screening Mechanism

### Step 2.1: Map the Current Screening Flow

**Locate the screening code:**

```
src/
├── components/
│   ├── EligibilityChecker.jsx (main screening component)
│   ├── Question.jsx (individual question component)
│   ├── Result.jsx (results display)
│   └── ...other components
├── pages/
│   └── Eligibility.jsx (or CheckEligibility.jsx)
└── logic/
    ├── eligibilityLogic.js (decision logic)
    ├── questions.js (question definitions)
    └── constants.js (legal criteria)
```

**Action Items:**

1. [ ] Open `src/components/EligibilityChecker.jsx` (or similar)
2. [ ] Review the complete component structure
3. [ ] Identify all question components
4. [ ] Map the state management (React hooks)
5. [ ] Find the decision logic implementation

### Step 2.2: Document Current Questions

**Create a questions audit spreadsheet:**

| # | Question ID | Question Text | Type | Answer Options | Conditional | Used in Logic |
|---|------------|---------------|------|-----------------|------------|--------------|
| 1 | CPPA_CONV | "Were you convicted under previous cannabis legislation?" | Yes/No | Yes/No | Base | ✓ |
| 2 | CONV_DATE | "When was your conviction?" | Date | [Date picker] | After Q1=Yes | ✓ |
| 3 | VIOLENCE | "Did your offense involve violence or injury?" | Yes/No | Yes/No | After Q2 | ✓ |
| ... | ... | ... | ... | ... | ... | ... |

### Step 2.3: Verify Decision Logic

**Review:** `src/logic/eligibilityLogic.js` (or similar)

Check for these critical elements:

```javascript
// CRITICAL: Verify these pathways exist and work correctly

// Pathway 1: CPPA Section 5(1) - Automatic Expungement
if (wasConvictedPre2024 && noViolence && personalUse) {
    return ELIGIBLE_SECTION_5_1; // ✓ Should be returned
}

// Pathway 2: CPPA Section 5(2) - By Application
if (meetsSection5Criteria && !(disqualifyingFactor)) {
    return ELIGIBLE_SECTION_5_2; // ✓ Should be returned
}

// Ineligible: Violence/Harm
if (offenseInvolvedViolence || haggravatingFactors) {
    return INELIGIBLE_VIOLENCE; // ✓ Should be returned
}

// Ineligible: No Record
if (!hasConviction) {
    return INELIGIBLE_NO_RECORD; // ✓ Should be returned
}
```

### Step 2.4: Test Decision Matrix

Create a test matrix to verify all pathways:

```
Test Case | Q1 | Q2 | Q3 | Q4 | Q5 | Expected | Actual | ✓/✗
----------|----|----|----|----|----|-----------|---------|----- 
CASE-001  | Y  | <2024 | N | N | N | ELIGIBLE_5_1 | [RUN] | 
CASE-002  | Y  | <2024 | Y | - | - | INELIGIBLE   | [RUN] | 
CASE-003  | Y  | >2024 | N | Y | N | ELIGIBLE_5_2 | [RUN] | 
CASE-004  | N  | -   | -  | - | - | INELIGIBLE   | [RUN] | 
CASE-005  | Y  | <2024 | N | Y | Y | [varies]     | [RUN] | 
```

---

## 🧪 Phase 3: Build and Test the Updated APK

### Step 3.1: Prepare the Build Environment

```bash
# 1. Navigate to project root
cd ~/path/to/marvinadams-clearpath-justice

# 2. Update all dependencies
npm install

# 3. Verify Android platform is added
ls -la android/

# If android/ directory doesn't exist:
npx cap add android
```

### Step 3.2: Ensure Proper Package Configuration

**File:** `package.json`

Verify Capacitor configuration:

```json
{
  "capacitor": {
    "appId": "org.clearpath.justice",
    "appName": "ClearPath Justice",
    "webDir": "dist",
    "server": {
      "androidScheme": "https"
    }
  }
}
```

**Action:** If not present, add the above configuration to `package.json`.

### Step 3.3: Build Web Assets

```bash
# Build the React app with Vite
npm run build

# Verify dist folder has content
ls -la dist/

# Should contain: index.html, assets/, etc.
```

### Step 3.4: Sync Capacitor to Android

```bash
# Sync the built web app to the Android native project
npx cap sync android --deployment

# This copies web assets to Android and updates native code
```

### Step 3.5: Build Debug APK

```bash
# Navigate to Android directory
cd android

# Make gradle executable
chmod +x gradlew

# Clean build
./gradlew clean

# Build debug APK
./gradlew assembleDebug --stacktrace

# Navigate back
cd ..

# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

### Step 3.6: Verify APK Creation

```bash
# Check if APK was created
ls -lh android/app/build/outputs/apk/debug/app-debug.apk

# Get file size
du -h android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 Phase 4: Test on Android Device

### Step 4.1: Prepare Test Environment

**Requirements:**
- Android device (or emulator) with:
  - USB Debugging enabled (if physical device)
  - API level 26+ (Android 8+)
  - At least 100MB free storage

**Enable USB Debugging (Physical Device):**
1. Settings → About Phone
2. Tap "Build Number" 7 times
3. Go back to Settings
4. Find "Developer Options"
5. Enable "USB Debugging"

### Step 4.2: Install APK

```bash
# Connect device via USB
# Verify connection:
adb devices

# Should show your device listed

# Install the APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Wait for installation to complete
# Should see: "Success"
```

### Step 4.3: Verify App Icon

**Critical Testing Step:**

1. [ ] **Home Screen Check**
   - Locate app on home screen
   - Verify icon is the ClearPath Justice logo
   - Icon should NOT be pixelated or stretched
   - Icon should be centered with white background
   - Tap icon to launch app

2. [ ] **App Drawer Check**
   - Open app drawer/launcher
   - Find "ClearPath Justice"
   - Verify icon matches home screen version
   - Icon should display correctly at different sizes

3. [ ] **Installed Apps List Check**
   - Settings → Apps → "ClearPath Justice"
   - Verify icon displays correctly
   - Verify app name is correct

4. [ ] **App Switcher Check**
   - Hold Home button or use recent apps
   - Look for ClearPath Justice app card
   - Verify icon is visible and correct

### Step 4.4: Test Eligibility Screening

**Run Full Screening Test:**

```
Test Checklist:

1. [ ] App launches without crashes
2. [ ] Eligibility checker menu appears
3. [ ] Can start screening
4. [ ] First question displays clearly
5. [ ] Answer options are selectable
6. [ ] Can proceed to next question
7. [ ] Can go back to previous question
8. [ ] Changing answer updates logic
9. [ ] Conditional questions appear correctly
10. [ ] Final result displays
11. [ ] Result matches answers provided
12. [ ] Disclaimer is visible
13. [ ] Can restart screening
14. [ ] No crashes during full flow
15. [ ] UI is responsive on phone screen
```

### Step 4.5: Run Test Scenarios

**Test Scenario 1: Eligible (Section 5.1)**
```
Path: Person convicted pre-CPPA of cannabis-only offense
Steps:
  1. Answer: "Yes" to cannabis conviction
  2. Answer: "Before July 2024" for date
  3. Answer: "No" to violence/injury
  4. Answer: "Yes" to personal use only
  
Expected Result: "ELIGIBLE for automatic expungement (Section 5.1)"
Actual Result: [____________]
Status: [ ] Pass [ ] Fail
```

**Test Scenario 2: Eligible (Section 5.2)**
```
Path: Person who may apply for expungement
Steps:
  1. Answer: "Yes" to cannabis conviction
  2. Provide date/details
  3. Meet Section 5.2 criteria
  
Expected Result: "ELIGIBLE to apply (Section 5.2) - Follow application process"
Actual Result: [____________]
Status: [ ] Pass [ ] Fail
```

**Test Scenario 3: Ineligible (Violence)**
```
Path: Conviction involved violence/harm
Steps:
  1. Answer: "Yes" to cannabis conviction
  2. Answer: "Yes" to violence/injury element
  
Expected Result: "INELIGIBLE - Disqualifying factors present"
Actual Result: [____________]
Status: [ ] Pass [ ] Fail
```

**Test Scenario 4: Ineligible (No Record)**
```
Path: No criminal conviction
Steps:
  1. Answer: "No" to any conviction
  
Expected Result: "INELIGIBLE - No criminal record to expunge"
Actual Result: [____________]
Status: [ ] Pass [ ] Fail
```

---

## ✅ Phase 5: Quality Assurance Checklist

### Icon Quality

- [ ] Icon appears on home screen
- [ ] Icon appears in app drawer
- [ ] Icon appears in installed apps list
- [ ] Icon is not pixelated or stretched
- [ ] Icon is properly centered
- [ ] Icon is professional appearance
- [ ] Icon works on different screen sizes
- [ ] Adaptive icon displays correctly (Android 8+)
- [ ] Icon color scheme is correct
- [ ] Icon is consistent across all locations

### Functionality Quality

- [ ] App launches without errors
- [ ] No console errors in logcat
- [ ] All questions load correctly
- [ ] All answer options are visible
- [ ] Navigation works (forward/back)
- [ ] State is managed correctly
- [ ] Results are accurate
- [ ] Disclaimer is present
- [ ] App doesn't freeze/hang
- [ ] No memory leaks
- [ ] App can be restarted
- [ ] No existing features broken

### User Experience Quality

- [ ] Questions are clearly worded
- [ ] Answer options are clear
- [ ] Progress is visible (if applicable)
- [ ] Results are understandable
- [ ] Instructions are helpful
- [ ] Error messages are clear
- [ ] UI is responsive
- [ ] Touch targets are large enough
- [ ] Colors have sufficient contrast
- [ ] Text is readable

### Screening Logic Quality

- [ ] CPPA Section 5.1 logic works correctly
- [ ] CPPA Section 5.2 logic works correctly
- [ ] Ineligible cases are handled correctly
- [ ] Alternative pathways are clear
- [ ] Conditional questions appear correctly
- [ ] Results match answers provided
- [ ] Changing answers updates results
- [ ] No hardcoded results
- [ ] Legal wording is accurate
- [ ] Disclaimers are appropriate

---

## 🚀 Phase 6: Deployment

### Step 6.1: Final Verification

Before considering complete:

```
Final Sign-Off Checklist:

Icon Verified:
  [ ] Icon visible on physical Android device
  [ ] Icon displays correctly
  [ ] No pixelation/stretching
  [ ] Professional appearance

Screening Tested:
  [ ] All test scenarios pass
  [ ] No crashes during testing
  [ ] Results are accurate
  [ ] Logic is correct
  [ ] Legal accuracy confirmed
  [ ] Disclaimer present

App Quality:
  [ ] No console errors
  [ ] No broken functionality
  [ ] UI is responsive
  [ ] Performance acceptable
  [ ] Accessibility adequate

Ready to Deploy: [ ] Yes [ ] No
```

### Step 6.2: Archive the APK

```bash
# Copy APK to outputs folder
cp android/app/build/outputs/apk/debug/app-debug.apk \
   ~/Desktop/ClearPath-Justice-v1.0.0-debug.apk

# Verify copy
ls -lh ~/Desktop/ClearPath-Justice-v1.0.0-debug.apk

# Get file checksum for distribution
sha256sum ~/Desktop/ClearPath-Justice-v1.0.0-debug.apk
```

### Step 6.3: Distribution

**To share with testers:**

```bash
# Email APK file directly, or:
# Upload to cloud storage
# Send download link to testers

# Installation instructions for testers:
# 1. Download APK file
# 2. Enable "Unknown Sources" in Settings
# 3. Open file and tap "Install"
# 4. Launch "ClearPath Justice" app
```

---

## 📋 Troubleshooting Guide

### Icon Not Appearing

**Problem:** App icon shows default icon instead of ClearPath logo

**Solutions:**
1. Verify icon files exist in all mipmap folders
2. Verify AndroidManifest.xml references ic_launcher
3. Clean build: `./gradlew clean assembleDebug`
4. Reinstall app: `adb uninstall org.clearpath.justice && adb install ...`

### Eligibility Results Incorrect

**Problem:** Result doesn't match answers provided

**Solutions:**
1. Review decision logic in eligibilityLogic.js
2. Check if all questions are being used in calculation
3. Verify condition logic (AND vs OR)
4. Test individual branches separately
5. Add console.log() to debug variable values

### App Crashes on Startup

**Problem:** App crashes when launched

**Solutions:**
1. Check logcat for error: `adb logcat | grep -i crash`
2. Verify Capacitor sync was successful
3. Verify dist/ folder has content after build
4. Check for JavaScript errors in browser console

### APK Build Fails

**Problem:** Gradle build fails with errors

**Solutions:**
1. Clean everything: `./gradlew clean`
2. Verify Java is installed: `java -version`
3. Check Android SDK: `$ANDROID_SDK_ROOT is set`
4. Update Gradle wrapper: `./gradlew wrapper --gradle-version latest`

---

## 📝 Documentation Files

**Reference these guides during implementation:**

1. **ANDROID_APP_ICON_SETUP.md** - Detailed icon setup guide
2. **ELIGIBILITY_SCREENING_AUDIT.md** - Complete audit framework
3. **ANDROID_BUILD_SUMMARY.md** - Build instructions
4. **APK_QUICK_START.md** - Quick setup reference

---

## ✨ Success Criteria

Your update is complete when:

✅ ClearPath Justice logo appears as app icon
✅ Icon is professional and correctly sized
✅ App launches without errors
✅ Eligibility screening runs correctly
✅ All test scenarios pass
✅ No existing functionality is broken
✅ APK is installable and functional
✅ User can complete full screening
✅ Results are accurate
✅ App is ready for distribution

---

## 🔗 Next Steps

1. **Prepare Logo:** Convert logo to icon sizes
2. **Update Android:** Add icon files and configuration
3. **Audit Screening:** Review and test logic
4. **Build APK:** Run build process
5. **Test Device:** Install and verify on Android
6. **Sign Off:** Verify all quality criteria
7. **Distribute:** Share APK with testers

---

**Ready to update ClearPath Justice?** Follow each phase systematically and document your progress!
