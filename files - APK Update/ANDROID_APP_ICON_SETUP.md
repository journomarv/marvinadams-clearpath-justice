# Android App Icon Setup for ClearPath Justice

**Objective:** Replace the Android app icon with the ClearPath Justice logo provided (scales correctly, appears professional, works on all devices).

---

## 📱 Android Icon Requirements

### Icon Sizes Needed (density-specific)

Android requires icons at multiple resolutions for different screen densities:

```
ldpi:    36x36 pixels   (low density)
mdpi:    48x48 pixels   (medium density - baseline)
hdpi:    72x72 pixels   (high density)
xhdpi:   96x96 pixels   (extra high density)
xxhdpi:  144x144 pixels (extra extra high density)
xxxhdpi: 192x192 pixels (extra extra extra high density)
```

### Adaptive Icon (Android 8+)

Modern Android (API 26+) supports **adaptive icons** with:
- Foreground layer (108x108 dp)
- Background layer (108x108 dp)
- Safe zone (72x72 dp at center)

This allows the launcher to apply visual effects (corners, masks, scaling).

---

## 🎨 Icon Design Considerations

The provided ClearPath Justice logo:
- ✅ Is vector-based (scales perfectly)
- ✅ Has clear foreground and background elements
- ✅ Uses brand colors (navy, green, gold)
- ✅ Is professional and recognizable
- ✅ Works well at small sizes

### Safe Design Areas

For the logo to display correctly on Android:

```
Safe Icon Zone:
- Foreground (scales): 72x72 dp
- Background (static): 108x108 dp
- Total viewport: 108x108 dp
```

The scales of justice and tree are the **foreground** (what changes).
The path/background could be the **background layer**.

---

## 📂 Android Project Structure

The app icon lives in:

```
android/
├── app/
│   └── src/
│       ├── main/
│       │   ├── res/
│       │   │   ├── mipmap-ldpi/
│       │   │   ├── mipmap-mdpi/
│       │   │   ├── mipmap-hdpi/
│       │   │   ├── mipmap-xhdpi/
│       │   │   ├── mipmap-xxhdpi/
│       │   │   ├── mipmap-xxxhdpi/
│       │   │   └── values/
│       │   │       └── ic_launcher_background.xml (color for background)
│       │   └── AndroidManifest.xml
│       └── ...
│   └── build.gradle
└── ...
```

---

## 🛠️ Step-by-Step Setup

### Option A: Using Android Studio (Easiest)

#### Step 1: Open Android Studio
```bash
cd android
npx cap open android
# This opens the Android project in Android Studio
```

#### Step 2: Create App Icons

1. Right-click `app/src/main/res/` → New → Image Asset
2. Select "Image" as asset type
3. Click "Path..." and select the ClearPath Justice logo PNG
4. Set name: `ic_launcher`
5. Change density: Generate all densities (ldpi through xxxhdpi)
6. Click "Next" → "Finish"

#### Step 3: Enable Adaptive Icon (Android 8+)

1. Follow same steps as above
2. In the dialog, check **"Create web icon"**
3. Set foreground layers to the logo elements
4. Keep background as solid color (navy or white)
5. Click "Finish"

#### Step 4: Update AndroidManifest.xml

The manifest should already reference the icon:

```xml
<application
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    ...
>
```

#### Step 5: Verify

1. Build the app: `Build` → `Make Project`
2. Run on emulator or device
3. Check app icon on home screen and app drawer
4. Verify it's not stretched, cropped, or pixelated

---

### Option B: Manual Setup (If Studio Not Available)

#### Step 1: Export Icon Images

From the logo PNG, create these files:

```
ic_launcher.png sizes:
- mipmap-ldpi/ic_launcher.png (36x36)
- mipmap-mdpi/ic_launcher.png (48x48)
- mipmap-hdpi/ic_launcher.png (72x72)
- mipmap-xhdpi/ic_launcher.png (96x96)
- mipmap-xxhdpi/ic_launcher.png (144x144)
- mipmap-xxxhdpi/ic_launcher.png (192x192)
```

**Use an image editor (Photoshop, Gimp, or online tool):**
1. Add padding around the logo (safe zone)
2. Center the logo
3. Export at each required resolution
4. Save to corresponding mipmap folders

#### Step 2: Create Adaptive Icon Configuration

Create `android/app/src/main/res/values/ic_launcher_background.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#1a3a52</color>
</resources>
```

(Use navy #1a3a52 or white #ffffff based on design)

#### Step 3: Create Adaptive Icon Layer

Create `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

#### Step 4: Verify AndroidManifest.xml

```xml
<application
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:label="@string/app_name"
    ...
>
```

---

### Option C: Using ImageMagick (Automated)

If you have ImageMagick installed:

```bash
#!/bin/bash
# Script to generate all required icon sizes

SOURCE="clearpath-logo.png"
DENSITY_SIZES=(
    "ldpi:36"
    "mdpi:48"
    "hdpi:72"
    "xhdpi:96"
    "xxhdpi:144"
    "xxxhdpi:192"
)

for density_size in "${DENSITY_SIZES[@]}"; do
    DENSITY="${density_size%:*}"
    SIZE="${density_size#*:}"
    
    convert "$SOURCE" -resize "${SIZE}x${SIZE}" \
        "android/app/src/main/res/mipmap-${DENSITY}/ic_launcher.png"
    
    echo "✓ Generated mipmap-${DENSITY}/ic_launcher.png (${SIZE}x${SIZE})"
done

echo "✓ All icon sizes generated!"
```

---

## ✅ Testing Checklist

After adding the icon, verify:

- [ ] Icon appears on home screen
- [ ] Icon appears in app drawer
- [ ] Icon appears in installed apps list
- [ ] Icon appears in launcher/switcher (hold home button)
- [ ] Icon is not stretched or pixelated
- [ ] Icon is properly centered
- [ ] Icon looks professional
- [ ] Icon works on different Android versions
- [ ] Icon works on different device sizes
- [ ] Adaptive icon (rounded corners) displays correctly
- [ ] Icon background color is visible
- [ ] No "crash" or error when app icon is tapped

---

## 🔍 Icon Design Best Practices

### Do's ✅
- [x] Use safe area (72x72 dp inside 108x108 dp)
- [x] Add 8dp padding within safe area
- [x] Use high contrast for recognition
- [x] Test on multiple densities
- [x] Keep design simple and clear
- [x] Use brand colors consistently

### Don'ts ❌
- [ ] Don't exceed safe zone (will be cut off)
- [ ] Don't use thin lines (< 2dp)
- [ ] Don't use text (won't be readable)
- [ ] Don't use semi-transparent colors
- [ ] Don't make background too dark (hard to see on dark launchers)
- [ ] Don't make background too light (hard to see on light launchers)

---

## 🎯 Icon Specifications Summary

| Spec | Value |
|------|-------|
| **Format** | PNG (32-bit, transparent background) |
| **Color Depth** | 32-bit RGBA |
| **Safe Area** | 72x72 dp (centered in 108x108 dp) |
| **Background** | Solid color (#1a3a52 navy or #ffffff white) |
| **Foreground** | Logo elements (scales) |
| **Resolution** | 6 different sizes required |
| **Naming** | `ic_launcher.png` |
| **Location** | `mipmap-{density}/` folders |
| **Adaptive Icon** | Android 8+ (`ic_launcher.xml`) |

---

## 🚀 Next Steps After Icon Setup

1. **Build the app:**
   ```bash
   npm run apk:build
   ```

2. **Install on device:**
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

3. **Verify icon on device:**
   - Look at home screen
   - Look in app drawer
   - Verify it's not stretched/pixelated
   - Tap icon to launch app

4. **Test on emulator (multiple API levels):**
   - Android 8 (API 26) - adaptive icon
   - Android 10 (API 29) - modern
   - Android 11+ (API 30+) - latest

---

## 📚 Resources

**Android Icon Guidelines:**
- https://developer.android.com/guide/practices/ui_guidelines/icon_design

**Adaptive Icons:**
- https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive

**ImageMagick:**
- https://imagemagick.org/

**Android Density:**
- https://developer.android.com/training/multiscreen/screendensities

---

## ⚠️ Common Issues & Solutions

### Issue: Icon appears pixelated
**Solution:** Ensure you're using the highest resolution source image. The logo should be vector (SVG) exported as high-res PNG.

### Issue: Icon is stretched or distorted
**Solution:** Check image aspect ratio is 1:1. Logo should be centered with padding.

### Issue: Icon not changing after rebuild
**Solution:** 
```bash
# Clean build
cd android
./gradlew clean
cd ..
npm run apk:build
```

### Issue: Icon doesn't appear on home screen
**Solution:** Reinstall app:
```bash
adb uninstall org.clearpath.justice
adb install path/to/app-debug.apk
```

### Issue: Adaptive icon not working (Android 8+)
**Solution:** Verify `ic_launcher_background.xml` exists and `ic_launcher.xml` references it correctly.

---

## 📋 Files Checklist

After setup, you should have:

```
android/app/src/main/res/
├── mipmap-ldpi/
│   └── ic_launcher.png (36x36)
├── mipmap-mdpi/
│   └── ic_launcher.png (48x48)
├── mipmap-hdpi/
│   └── ic_launcher.png (72x72)
├── mipmap-xhdpi/
│   └── ic_launcher.png (96x96)
├── mipmap-xxhdpi/
│   └── ic_launcher.png (144x144)
├── mipmap-xxxhdpi/
│   └── ic_launcher.png (192x192)
├── mipmap-anydpi-v26/
│   └── ic_launcher.xml (adaptive icon config)
└── values/
    └── ic_launcher_background.xml (background color)
```

---

## ✅ Success Criteria

Icon is correctly configured when:
- ✅ App icon visible on home screen
- ✅ App icon visible in app drawer
- ✅ Icon not pixelated or stretched
- ✅ Icon displays on all device densities
- ✅ Adaptive icon works (Android 8+)
- ✅ Icon looks professional
- ✅ App launches when icon is tapped
- ✅ No errors in build logs

---

**Done!** Your app icon is now set up. Move on to auditing the eligibility screening.
