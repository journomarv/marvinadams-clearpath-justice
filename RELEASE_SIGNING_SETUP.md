# ClearPath Justice - Release APK Signing Setup

This guide covers generating and configuring the release keystore for signed APK builds.

## Overview

Android apps distributed via Google Play Store must be signed with a keystore (private key). This is permanent and **cannot be changed** without losing the ability to update your app.

---

## Step 1: Generate Release Keystore (First Time Only)

Run this command in your project root:

```bash
keytool -genkey -v -keystore clearpath-release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias clearpath-key
```

### Interactive Prompts

You'll be asked to provide:

```
Enter keystore password:                    [STRONG PASSWORD - min 6 chars]
Re-enter new password:                      [CONFIRM PASSWORD]
What is your first and last name?           [e.g., "Your Name"]
What is your organizational unit name?      [e.g., "Engineering"]
What is your organization name?             [e.g., "ClearPath Justice"]
What is your City or Locality name?         [e.g., "Cape Town"]
What is your State or Province name?        [e.g., "Western Cape"]
What is the two-letter country code?        [ZA] (South Africa)
Is CN=..., OU=..., O=..., L=..., ST=..., C=ZA correct?  [yes]

Enter key password for <clearpath-key>      [STRONG PASSWORD]
Re-enter new password:                      [CONFIRM PASSWORD]
```

### Output

Creates: `clearpath-release.keystore` (in your project root)

**⚠️ CRITICAL**: This file is permanent:
- **Never commit** to git
- **Never share** publicly
- **Backup securely** (encrypted)
- **Losing it** means losing ability to update your app

---

## Step 2: Secure the Keystore

### Add to .gitignore

Ensure it's never accidentally committed:

```bash
echo "clearpath-release.keystore" >> .gitignore
git add .gitignore
git commit -m "Add keystore to gitignore"
```

### Backup Securely

Store a backup in:
- Encrypted cloud storage (Google Drive, OneDrive, Dropbox with encryption)
- Password manager (1Password, LastPass, Bitwarden)
- Encrypted external drive
- Secure team storage (GitHub Secrets is NOT a backup)

### Document Credentials

Create a secure document (encrypted) with:
- **Keystore password**: [Your keystore password]
- **Key alias**: `clearpath-key`
- **Key password**: [Your key password]
- **Generation date**: [When created]
- **Backup location**: [Where backed up]

---

## Step 3: Build Signed Release APK

### Local Release Build

```bash
cd android
./gradlew assembleRelease
```

The build system will prompt for:
- **Keystore password**: Enter the password you created
- **Key password**: Enter the key password you created

**Output**: `android/app/build/outputs/apk/release/app-release.apk`

### Automated Signing (via gradle.properties)

Create: `android/local.properties`

```properties
KEYSTORE_PATH=/full/path/to/clearpath-release.keystore
KEYSTORE_PASSWORD=your_keystore_password
KEY_ALIAS=clearpath-key
KEY_PASSWORD=your_key_password
```

Then build:
```bash
cd android
./gradlew assembleRelease
```

**⚠️ WARNING**: `local.properties` contains passwords. Add to `.gitignore`:

```bash
echo "android/local.properties" >> .gitignore
```

---

## Step 4: GitHub Actions Automated Signing (Optional)

For CI/CD pipeline to automatically build release APKs, use GitHub Secrets.

### Prepare Keystore for GitHub

Convert keystore to base64:

```bash
# macOS:
base64 -i clearpath-release.keystore | pbcopy

# Linux:
base64 clearpath-release.keystore

# Windows (PowerShell):
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("clearpath-release.keystore"))
```

Copy the output.

### Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

| Secret Name | Value |
|---|---|
| `KEYSTORE_BASE64` | Base64-encoded keystore (from above) |
| `KEYSTORE_PASSWORD` | Your keystore password |
| `KEY_ALIAS` | `clearpath-key` |
| `KEY_PASSWORD` | Your key password |

### Update Workflow (if using secrets)

Add to `.github/workflows/build-apk.yml` before the build step:

```yaml
- name: Prepare keystore for CI
  run: |
    echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 -d > android/clearpath-release.keystore
    chmod 600 android/clearpath-release.keystore

- name: Configure signing
  run: |
    cat >> android/local.properties << EOF
    KEYSTORE_PATH=$(pwd)/android/clearpath-release.keystore
    KEYSTORE_PASSWORD=${{ secrets.KEYSTORE_PASSWORD }}
    KEY_ALIAS=${{ secrets.KEY_ALIAS }}
    KEY_PASSWORD=${{ secrets.KEY_PASSWORD }}
    EOF

- name: Build Release APK
  run: |
    cd android
    ./gradlew assembleRelease

- name: Upload Release APK
  uses: actions/upload-artifact@v4
  with:
    name: ClearPath-Justice-release-apk
    path: android/app/build/outputs/apk/release/app-release.apk
```

---

## Step 5: Verify Keystore

### Check Keystore Contents

```bash
keytool -list -v -keystore clearpath-release.keystore
```

You'll see:
```
Keystore type: PKCS12
Keystore provider: SUN
...
Alias name: clearpath-key
Creation date: [Date created]
Entry type: PrivateKeyEntry
Certificate chain length: 1
...
```

### Verify APK Signature

```bash
jarsigner -verify -verbose android/app/build/outputs/apk/release/app-release.apk
```

Should show:
```
sm     1234 Mon Sep 11 10:00:00 PDT 2026 AndroidManifest.xml
sm     5678 Mon Sep 11 10:00:00 PDT 2026 resources.pb
...
jar verified.
```

---

## Step 6: Upload to Google Play Store

### Prepare APK

1. Verify size: `ls -lh android/app/build/outputs/apk/release/app-release.apk`
   - Should be < 100 MB for initial upload
2. Test thoroughly on actual devices
3. Verify it installs: `adb install android/app/build/outputs/apk/release/app-release.apk`

### Create Play Store Listing

1. Go to [Google Play Console](https://play.google.com/console)
2. Sign in or create account
3. Click **Create app**
4. Fill in:
   - **App name**: ClearPath Justice
   - **Default language**: English
   - **App/Game**: App
   - **Free/Paid**: Free
   - **Declarations**: Accept the terms

### Upload APK

1. Go to **Testing** → **Internal testing**
2. Click **Create new release**
3. Click **Browse files** and select: `android/app/build/outputs/apk/release/app-release.apk`
4. Add **Release notes**
5. Click **Save**

### Complete App Store Listing

Fill in all required fields:
- App title (50 chars max)
- Short description (80 chars max)
- Full description (4000 chars max)
- Screenshots (minimum 2, max 8)
  - Format: 1080×1920 pixels (9:16 aspect ratio)
- Feature graphic: 1024×500 pixels
- Icon: 512×512 pixels (PNG)
- Video (optional)

### Content Rating

1. Go to **Settings** → **Content rating**
2. Fill out the **Content Rating Questionnaire**
3. Get your rating (Teen, Mature, etc.)

### Privacy Policy

1. Go to **Settings** → **App content**
2. Add privacy policy URL (if required)
3. Declare permissions usage

### Release to Public/Staged

1. Go to **Testing** → **Production** (or **Staged rollout**)
2. Click **Create new release**
3. Upload your signed APK
4. Review all details
5. Click **Start rollout**

For staged rollout:
- Start with 5-10% of users
- Monitor for crashes/issues
- Gradually increase to 100%

---

## Troubleshooting

### Issue: "Keystore password incorrect"

**Solution**: Make sure you're using the exact keystore password (case-sensitive)

### Issue: "Key password incorrect"

**Solution**: The key password can be different from keystore password. Use the key password you entered at the last prompt.

### Issue: "Invalid keystore format"

**Solution**: Verify the keystore file:
```bash
file clearpath-release.keystore
# Should output: PKCS12 keystore, version 3.0
```

### Issue: "APK won't install after signing"

**Solution**:
1. Uninstall previous version: `adb uninstall za.org.clearpathjustice.app`
2. Reinstall: `adb install android/app/build/outputs/apk/release/app-release.apk`

### Issue: "Lost keystore file"

**⚠️ CRITICAL**: You cannot recover it. You must:
1. Create a new app in Google Play with a different package name
2. Migrate users (if possible)
3. Never lose the backup again

---

## Best Practices

✅ **DO**:
- Store keystore in a secure location
- Backup encrypted copies
- Keep passwords in a password manager
- Rotate backups annually
- Document everything

❌ **DON'T**:
- Commit keystore to git
- Share keystore publicly
- Use simple passwords
- Store passwords in plain text
- Forget the keystore password (you cannot reset it)

---

## Reference

- **KeyTool Docs**: https://docs.oracle.com/en/java/javase/17/docs/specs/man/keytool.html
- **Google Play Console**: https://play.google.com/console
- **Android Signing**: https://developer.android.com/studio/publish/app-signing
- **Gradle Signing**: https://developer.android.com/studio/build/index

---

## Quick Reference

```bash
# Generate keystore (first time)
keytool -genkey -v -keystore clearpath-release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias clearpath-key

# Build signed APK
cd android && ./gradlew assembleRelease

# Verify keystore
keytool -list -v -keystore clearpath-release.keystore

# Verify APK signature
jarsigner -verify -verbose android/app/build/outputs/apk/release/app-release.apk

# Convert to base64 for GitHub Secrets (macOS)
base64 -i clearpath-release.keystore | pbcopy
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-09-11
