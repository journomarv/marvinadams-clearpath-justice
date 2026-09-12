# ClearPath Justice Android Implementation Guide

**Practical, step-by-step guide with code examples and scripts.**

---

## 🎯 Part 1: Android Icon Implementation

### 1.1 Icon File Preparation

**Prerequisites:**
- High-resolution ClearPath Justice logo (provided: 1000099827.png)
- Image processing tool: ImageMagick, GIMP, or online tool
- Android project structure ready

### 1.2 Create Icon Directory Structure

```bash
# Navigate to Android app resources
cd android/app/src/main/res/

# Create all required directories if they don't exist
mkdir -p mipmap-ldpi
mkdir -p mipmap-mdpi
mkdir -p mipmap-hdpi
mkdir -p mipmap-xhdpi
mkdir -p mipmap-xxhdpi
mkdir -p mipmap-xxxhdpi
mkdir -p mipmap-anydpi-v26

# Verify structure
tree mipmap-* values/
```

Expected output:
```
mipmap-ldpi/
mipmap-mdpi/
mipmap-hdpi/
mipmap-xhdpi/
mipmap-xxhdpi/
mipmap-xxxhdpi/
mipmap-anydpi-v26/
values/
```

### 1.3 Generate Icon Sizes (Option A: Using ImageMagick)

**Install ImageMagick (if needed):**

```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Windows
# Download from: https://imagemagick.org/script/download.php
```

**Generate all icon sizes:**

```bash
#!/bin/bash
# save as: generate_icons.sh

SOURCE_LOGO="1000099827.png"
ANDROID_RES="android/app/src/main/res"

# Define sizes in format: density:size
SIZES=(
    "ldpi:36"
    "mdpi:48"
    "hdpi:72"
    "xhdpi:96"
    "xxhdpi:144"
    "xxxhdpi:192"
)

echo "Generating ClearPath Justice icons..."

for density_size in "${SIZES[@]}"; do
    DENSITY="${density_size%:*}"
    SIZE="${density_size#*:}"
    
    # Create output directory
    mkdir -p "${ANDROID_RES}/mipmap-${DENSITY}"
    
    # Convert and resize
    convert "$SOURCE_LOGO" \
        -resize "${SIZE}x${SIZE}" \
        -background white \
        -gravity center \
        -extent "${SIZE}x${SIZE}" \
        "${ANDROID_RES}/mipmap-${DENSITY}/ic_launcher.png"
    
    echo "✓ Generated mipmap-${DENSITY}/ic_launcher.png (${SIZE}x${SIZE})"
done

echo ""
echo "✓ All icon sizes generated successfully!"
ls -la "${ANDROID_RES}"/mipmap-*/ic_launcher.png
```

**Run the script:**

```bash
chmod +x generate_icons.sh
./generate_icons.sh
```

### 1.4 Generate Icon Sizes (Option B: Using Online Tool)

If ImageMagick is not available:

1. Go to: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
2. Upload the ClearPath Justice logo
3. Download generated icons
4. Extract to: `android/app/src/main/res/`

### 1.5 Set Up Adaptive Icon (Android 8+)

**Create:** `android/app/src/main/res/values/ic_launcher_background.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- White background for adaptive icon -->
    <color name="ic_launcher_background">#FFFFFF</color>
</resources>
```

**Create:** `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

**Alternative (if using separate foreground):**

If you want to separate logo and background:

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

### 1.6 Verify AndroidManifest.xml

**File:** `android/app/src/main/AndroidManifest.xml`

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    ...
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:label="@string/app_name"
        android:theme="@style/AppTheme"
        ...
    >
        ...
    </application>
</manifest>
```

**Key Points:**
- `android:icon` → Points to ic_launcher (rasterized icons)
- `android:roundIcon` → Points to ic_launcher_round (if available)
- `android:label` → App name shown under icon
- Note: Adaptive icons (Android 8+) are auto-detected

### 1.7 Verify Files Created

```bash
# Check all icon files exist
find android/app/src/main/res/mipmap* -name "ic_launcher*" -type f

# Expected output:
# android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml
# android/app/src/main/res/mipmap-ldpi/ic_launcher.png
# android/app/src/main/res/mipmap-mdpi/ic_launcher.png
# android/app/src/main/res/mipmap-hdpi/ic_launcher.png
# android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
# android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
# android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png

# Check file sizes (should be similar to each other)
du -h android/app/src/main/res/mipmap*/ic_launcher.png

# Check icon quality
file android/app/src/main/res/mipmap-mdpi/ic_launcher.png
```

---

## 🔍 Part 2: Eligibility Screening Audit

### 2.1 Locate Screening Files

**Common project structure:**

```
src/
├── components/
│   ├── EligibilityChecker.jsx       ← Main screening UI
│   ├── Question.jsx                  ← Individual question
│   ├── Result.jsx                    ← Results display
│   └── Navigation.jsx
├── pages/
│   ├── CheckEligibility.jsx          ← Page wrapper
│   └── Home.jsx
├── logic/
│   ├── eligibilityLogic.js           ← Decision logic (CRITICAL)
│   ├── questions.js                  ← Question definitions
│   └── constants.js                  ← CPPA criteria
├── styles/
│   └── eligibility.css
└── App.jsx
```

### 2.2 Audit Template for eligibilityLogic.js

**Find and review this file:**

```javascript
// src/logic/eligibilityLogic.js

// CRITICAL SECTION 1: Input validation
export function validateInput(answers) {
    // ✓ CHECK: Does this validate all required fields?
    // ✓ CHECK: Are optional fields handled correctly?
}

// CRITICAL SECTION 2: Section 5(1) Logic
export function checkSection5_1(answers) {
    // ✓ CHECK: Conviction date < CPPA effective date?
    // ✓ CHECK: Was it a cannabis-only offense?
    // ✓ CHECK: No violence/aggravating factors?
    
    const isPreCPPA = new Date(answers.convictionDate) < CPPA_DATE;
    const isCannabisOnly = answers.offenseType === 'CANNABIS_ONLY';
    const hasNoViolence = !answers.involvedViolence;
    
    return isPreCPPA && isCannabisOnly && hasNoViolence;
}

// CRITICAL SECTION 3: Section 5(2) Logic
export function checkSection5_2(answers) {
    // ✓ CHECK: Does this check all 5(2) criteria?
    // ✓ CHECK: Is discretionary nature clear?
}

// CRITICAL SECTION 4: Ineligibility Checks
export function checkIneligibility(answers) {
    // ✓ CHECK: Violence/harm → INELIGIBLE?
    // ✓ CHECK: Recent conviction → INELIGIBLE?
    // ✓ CHECK: Aggravating factors → INELIGIBLE?
    
    if (answers.involvedViolence) {
        return {
            eligible: false,
            reason: "VIOLENCE_DISQUALIFIES",
            message: "Offenses involving violence do not qualify..."
        };
    }
}

// CRITICAL SECTION 5: Final Decision
export function calculateEligibility(answers) {
    // ✓ CHECK: Does this call all pathways?
    // ✓ CHECK: Are results mutually exclusive?
    // ✓ CHECK: Are results deterministic?
    
    if (checkSection5_1(answers)) {
        return ELIGIBLE_SECTION_5_1;
    }
    if (checkIneligibility(answers)) {
        return ineligibilityResult;
    }
    if (checkSection5_2(answers)) {
        return ELIGIBLE_SECTION_5_2;
    }
    return REQUIRES_FURTHER_REVIEW;
}
```

### 2.3 Audit Template for questions.js

**Find and review this file:**

```javascript
// src/logic/questions.js

export const QUESTIONS = [
    {
        id: 'CPPA_CONVICTION',
        question: 'Were you convicted of a cannabis offense before 2024?',
        type: 'yes-no',
        options: [
            { value: true, label: 'Yes' },
            { value: false, label: 'No' }
        ],
        required: true,
        next: [
            { if: true, goto: 'CONVICTION_DATE' },
            { if: false, goto: 'RESULT_SCREEN' }
        ]
    },
    {
        id: 'CONVICTION_DATE',
        question: 'When was your conviction?',
        type: 'date',
        required: true,
        dependsOn: 'CPPA_CONVICTION',
        next: [
            { if: 'date < CPPA_DATE', goto: 'VIOLENCE_QUESTION' },
            { if: 'date >= CPPA_DATE', goto: 'RESULT_SCREEN' }
        ]
    },
    // ... more questions
];

// ✓ CHECKLIST FOR EACH QUESTION:
// - [ ] Question text is clear
// - [ ] All possible answers are covered
// - [ ] Next question logic is correct
// - [ ] Answer is used in final calculation
// - [ ] Conditional logic matches CPPA
```

### 2.4 Audit Checklist for EligibilityChecker.jsx

**Review the main screening component:**

```jsx
// src/components/EligibilityChecker.jsx

function EligibilityChecker() {
    // ✓ CHECK: State management
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // ✓ CHECK: Answer handler updates state correctly
    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };
    
    // ✓ CHECK: Navigation works forward/backward
    const goNext = () => {
        // Does this:
        // - Validate current answer is provided?
        // - Calculate next question based on answer?
        // - Update current question index?
    };
    
    const goPrevious = () => {
        // Does this:
        // - Preserve answers?
        // - Go to previous question?
        // - Not allow going before first question?
    };
    
    // ✓ CHECK: Final result is calculated correctly
    const handleFinish = () => {
        const calculatedResult = calculateEligibility(answers);
        setResult(calculatedResult);
    };
    
    // ✓ CHECK: Restart clears everything
    const handleRestart = () => {
        setAnswers({});
        setCurrentQuestion(0);
        setResult(null);
    };
    
    return (
        <div>
            {/* ✓ CHECK: Progress indicator? */}
            {/* ✓ CHECK: Current question displays? */}
            {/* ✓ CHECK: Answer options are clickable? */}
            {/* ✓ CHECK: Navigation buttons work? */}
            {/* ✓ CHECK: Results screen displays? */}
        </div>
    );
}
```

---

## 🧪 Part 3: Build Process

### 3.1 Pre-Build Checklist

```bash
#!/bin/bash
# save as: pre_build_check.sh

echo "ClearPath Justice - Pre-Build Checklist"
echo "========================================"
echo ""

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✓ $NODE_VERSION"
else
    echo "✗ Node.js not found"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✓ $NPM_VERSION"
else
    echo "✗ npm not found"
    exit 1
fi

# Check Java
echo -n "Checking Java... "
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | grep -oP '(?<=version ")[^"]*')
    echo "✓ $JAVA_VERSION"
else
    echo "✗ Java not found"
    exit 1
fi

# Check Android SDK
echo -n "Checking Android SDK... "
if [ ! -z "$ANDROID_SDK_ROOT" ]; then
    echo "✓ $ANDROID_SDK_ROOT"
else
    echo "⚠ ANDROID_SDK_ROOT not set"
fi

# Check package.json
echo -n "Checking package.json... "
if [ -f "package.json" ]; then
    echo "✓ Found"
else
    echo "✗ Not found"
    exit 1
fi

# Check for node_modules
echo -n "Checking dependencies... "
if [ -d "node_modules" ]; then
    echo "✓ node_modules exists"
else
    echo "✗ Need to run: npm install"
fi

# Check icon files
echo -n "Checking app icons... "
ICON_COUNT=$(find android/app/src/main/res/mipmap* -name "ic_launcher.png" 2>/dev/null | wc -l)
if [ "$ICON_COUNT" -ge 6 ]; then
    echo "✓ All icon sizes found ($ICON_COUNT)"
else
    echo "⚠ Missing icon sizes (found $ICON_COUNT, need 6)"
fi

echo ""
echo "Pre-build checks complete!"
```

### 3.2 Complete Build Script

```bash
#!/bin/bash
# save as: build_apk.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}ClearPath Justice - APK Build Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Step 1: Install dependencies
echo -e "${YELLOW}Step 1: Installing npm dependencies${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 2: Build web assets
echo -e "${YELLOW}Step 2: Building web assets${NC}"
npm run build
if [ -d "dist" ] && [ ! -z "$(ls -A dist 2>/dev/null)" ]; then
    DIST_SIZE=$(du -sh dist | cut -f1)
    echo -e "${GREEN}✓ Web build successful ($DIST_SIZE)${NC}"
else
    echo -e "${RED}✗ Build failed: dist directory empty${NC}"
    exit 1
fi
echo ""

# Step 3: Add Android platform (if needed)
echo -e "${YELLOW}Step 3: Checking Android platform${NC}"
if [ ! -d "android" ]; then
    echo "Adding Android platform..."
    npx cap add android
    echo -e "${GREEN}✓ Android platform added${NC}"
else
    echo -e "${GREEN}✓ Android platform exists${NC}"
fi
echo ""

# Step 4: Sync Capacitor
echo -e "${YELLOW}Step 4: Syncing Capacitor${NC}"
npx cap sync android --deployment
echo -e "${GREEN}✓ Capacitor synced${NC}"
echo ""

# Step 5: Make Gradle executable
echo -e "${YELLOW}Step 5: Preparing Gradle${NC}"
chmod +x android/gradlew
echo -e "${GREEN}✓ Gradle wrapper ready${NC}"
echo ""

# Step 6: Build APK
echo -e "${YELLOW}Step 6: Building Debug APK${NC}"
echo -e "${BLUE}(This may take 5-15 minutes)${NC}"
cd android
./gradlew clean assembleDebug --stacktrace
cd ..
echo -e "${GREEN}✓ Build completed${NC}"
echo ""

# Step 7: Verify APK
echo -e "${YELLOW}Step 7: Verifying APK${NC}"
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo -e "${GREEN}✓ APK built successfully${NC}"
    echo -e "${GREEN}  Path: $APK_PATH${NC}"
    echo -e "${GREEN}  Size: $SIZE${NC}"
else
    echo -e "${RED}✗ APK not found${NC}"
    exit 1
fi
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Build Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Install on device: adb install \"$APK_PATH\""
echo "2. Or verify app icon appears on home screen"
echo "3. Test eligibility screening workflow"
```

### 3.3 Run the Build

```bash
chmod +x build_apk.sh
./build_apk.sh
```

---

## 📱 Part 4: Testing on Android Device

### 4.1 Install and Test Script

```bash
#!/bin/bash
# save as: test_on_device.sh

set -e

APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"

echo "ClearPath Justice - Device Testing"
echo "==================================="
echo ""

# Check if APK exists
if [ ! -f "$APK_PATH" ]; then
    echo "✗ APK not found at: $APK_PATH"
    echo "Please run build_apk.sh first"
    exit 1
fi

# Check if device is connected
echo -n "Checking for connected devices... "
DEVICES=$(adb devices | grep -v "^List" | grep -v "^$" | wc -l)
if [ "$DEVICES" -eq 0 ]; then
    echo "✗ No devices found"
    echo "Connect an Android device via USB and enable USB Debugging"
    exit 1
else
    echo "✓ Device(s) found"
    adb devices
fi

echo ""
echo "Uninstalling previous version..."
adb uninstall org.clearpath.justice || true

echo ""
echo "Installing new APK..."
adb install "$APK_PATH"

echo ""
echo "✓ APK installed successfully"
echo ""
echo "Next steps:"
echo "1. Look for 'ClearPath Justice' app on home screen or app drawer"
echo "2. Verify the icon is the ClearPath Justice logo (not pixelated)"
echo "3. Tap icon to launch app"
echo "4. Test the eligibility screening workflow"
echo ""
echo "To view logs:"
echo "  adb logcat"
echo ""
echo "To uninstall:"
echo "  adb uninstall org.clearpath.justice"
```

### 4.2 Run Tests

```bash
chmod +x test_on_device.sh
./test_on_device.sh
```

---

## ✅ Part 5: Final Verification Checklist

### Icon Verification

```bash
# After installation on device, check:

# 1. Icon on home screen
#    - Open phone home screen
#    - Look for ClearPath Justice app
#    - Verify icon is the logo
#    - Verify icon is NOT pixelated/stretched

# 2. Icon in app drawer
#    - Open app drawer/launcher
#    - Search for "ClearPath"
#    - Verify icon displays correctly

# 3. Settings → Apps
#    - Find ClearPath Justice
#    - Verify icon, name, version
#    - Verify app details display correctly

# 4. App switcher
#    - Hold home button or swipe up
#    - Find ClearPath Justice card
#    - Verify icon is visible
```

### Screening Verification

```javascript
// In app, test these scenarios:

// SCENARIO 1: Eligible Section 5.1
// Answer: Yes → Pre-2024 → No Violence → Yes Personal Use
// Expected: "ELIGIBLE for automatic expungement"

// SCENARIO 2: Eligible Section 5.2
// Answer: Yes → [meets 5.2 criteria]
// Expected: "ELIGIBLE to apply"

// SCENARIO 3: Ineligible (Violence)
// Answer: Yes → [any date] → Yes Violence
// Expected: "INELIGIBLE - Violence involved"

// SCENARIO 4: Ineligible (No Record)
// Answer: No to conviction
// Expected: "INELIGIBLE - No record to expunge"

// After each scenario:
// ✓ Result matches answers
// ✓ Disclaimer is visible
// ✓ User can restart
// ✓ No crashes or errors
```

---

## 🎯 Quick Reference

### Build Commands

```bash
# Clean build
npm run clean

# Full build (web + Android + APK)
npm run apk:build

# Just build web
npm run build

# Just build APK (after web build)
cd android && ./gradlew assembleDebug && cd ..

# Install on device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Testing Commands

```bash
# List connected devices
adb devices

# Install APK
adb install app-debug.apk

# Uninstall app
adb uninstall org.clearpath.justice

# View logs
adb logcat

# Clear app data
adb shell pm clear org.clearpath.justice

# Launch app
adb shell am start -n org.clearpath.justice/.MainActivity
```

### Icon Troubleshooting

```bash
# Check if icon files exist
find android/app/src/main/res/mipmap* -name "ic_launcher*"

# View icon file info
file android/app/src/main/res/mipmap-mdpi/ic_launcher.png

# Check file sizes
du -h android/app/src/main/res/mipmap*/ic_launcher.png
```

---

## 📋 Implementation Checklist

- [ ] **Icons Prepared**
  - [ ] Logo converted to 6 different sizes
  - [ ] Adaptive icon XML created
  - [ ] Background color defined
  - [ ] Files placed in correct directories

- [ ] **Screening Audited**
  - [ ] Decision logic reviewed
  - [ ] All questions mapped
  - [ ] CPPA criteria verified
  - [ ] Test scenarios created

- [ ] **Build Completed**
  - [ ] Web assets built (dist/ created)
  - [ ] Android platform synced
  - [ ] APK compiled successfully
  - [ ] No build errors

- [ ] **Testing on Device**
  - [ ] APK installed successfully
  - [ ] App icon visible and correct
  - [ ] App launches without crashes
  - [ ] Screening workflow tested
  - [ ] Results are accurate

- [ ] **Quality Verified**
  - [ ] Icon displays correctly
  - [ ] All questions work
  - [ ] Navigation functions
  - [ ] Disclaimer present
  - [ ] No errors in logs

---

**Ready to implement?** Follow each section systematically, use the scripts provided, and verify at each step!
