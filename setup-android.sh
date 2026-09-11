#!/bin/bash

# ClearPath Justice - Android APK Setup Script
# This script initializes Capacitor and the Android platform for the ClearPath Justice application

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}ClearPath Justice Android Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root directory.${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Checking prerequisites${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js is installed: $NODE_VERSION${NC}"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed. Please install npm first.${NC}"
    exit 1
else
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm is installed: $NPM_VERSION${NC}"
fi

# Check if Java is installed (required for Android build)
if ! command -v java &> /dev/null; then
    echo -e "${YELLOW}⚠ Java is not installed. You'll need it to build the Android APK.${NC}"
    echo -e "${YELLOW}  macOS: brew install java${NC}"
    echo -e "${YELLOW}  Linux: sudo apt-get install default-jdk${NC}"
    echo -e "${YELLOW}  Windows: Install from https://www.oracle.com/java/technologies/downloads/${NC}"
    echo ""
fi

# Check if Android SDK is available
if ! command -v adb &> /dev/null && ! command -v sdkmanager &> /dev/null; then
    echo -e "${YELLOW}⚠ Android SDK tools not found in PATH.${NC}"
    echo -e "${YELLOW}  You can either:${NC}"
    echo -e "${YELLOW}  1. Install Android Studio: https://developer.android.com/studio${NC}"
    echo -e "${YELLOW}  2. Or install command-line tools separately${NC}"
    echo ""
fi

echo ""
echo -e "${YELLOW}Step 2: Installing npm dependencies${NC}"
echo ""

if npm list @capacitor/cli &>/dev/null; then
    echo -e "${GREEN}✓ Capacitor CLI already installed${NC}"
else
    echo -e "${BLUE}Installing Capacitor packages...${NC}"
    npm install --save-dev @capacitor/cli @capacitor/core @capacitor/android
    echo -e "${GREEN}✓ Capacitor packages installed${NC}"
fi

echo ""
echo -e "${YELLOW}Step 3: Checking for existing Capacitor configuration${NC}"
echo ""

if [ -f "capacitor.config.ts" ] || [ -f "capacitor.config.json" ]; then
    echo -e "${GREEN}✓ Capacitor configuration already exists${NC}"
    if [ -f "capacitor.config.ts" ]; then
        echo "  Found: capacitor.config.ts"
    fi
    if [ -f "capacitor.config.json" ]; then
        echo "  Found: capacitor.config.json"
    fi
else
    echo -e "${YELLOW}No Capacitor configuration found. Initializing...${NC}"
    npx cap init "ClearPath Justice" "za.org.clearpathjustice.app" --web-dir dist
    echo -e "${GREEN}✓ Capacitor initialized${NC}"
fi

echo ""
echo -e "${YELLOW}Step 4: Building production assets${NC}"
echo ""

echo -e "${BLUE}Running: npm run build${NC}"
npm run build
echo -e "${GREEN}✓ Production build completed${NC}"

# Verify dist directory
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo -e "${RED}✗ Build output directory (dist) is empty or missing!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build output verified${NC}"

echo ""
echo -e "${YELLOW}Step 5: Checking Android platform${NC}"
echo ""

if [ -d "android" ]; then
    echo -e "${GREEN}✓ Android platform directory already exists${NC}"
else
    echo -e "${BLUE}Adding Android platform...${NC}"
    npx cap add android
    echo -e "${GREEN}✓ Android platform added${NC}"
fi

echo ""
echo -e "${YELLOW}Step 6: Syncing Capacitor platform${NC}"
echo ""

echo -e "${BLUE}Running: npx cap sync android${NC}"
npx cap sync android
echo -e "${GREEN}✓ Capacitor sync completed${NC}"

echo ""
echo -e "${YELLOW}Step 7: Verifying Android build configuration${NC}"
echo ""

if [ ! -d "android" ]; then
    echo -e "${RED}✗ Android directory not found after sync!${NC}"
    exit 1
fi

if [ ! -f "android/app/build.gradle" ]; then
    echo -e "${RED}✗ android/app/build.gradle not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Android build files verified${NC}"

echo ""
echo -e "${YELLOW}Step 8: Verifying Gradle wrapper${NC}"
echo ""

if [ ! -f "android/gradlew" ]; then
    echo -e "${RED}✗ Gradle wrapper not found!${NC}"
    exit 1
fi

chmod +x android/gradlew
echo -e "${GREEN}✓ Gradle wrapper verified and made executable${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "1. ${YELLOW}Review and update Android branding:${NC}"
echo "   • App icon: android/app/src/main/res/mipmap-*/"
echo "   • App name: android/app/src/main/res/values/strings.xml"
echo "   • Splash screen: android/app/src/main/res/drawable/"
echo ""
echo "2. ${YELLOW}Build the Debug APK:${NC}"
echo "   cd android"
echo "   ./gradlew assembleDebug"
echo ""
echo "3. ${YELLOW}Or build in one step:${NC}"
echo "   npm run build && npx cap sync android && cd android && ./gradlew assembleDebug"
echo ""
echo "4. ${YELLOW}Test on device with ADB:${NC}"
echo "   adb install android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "5. ${YELLOW}Create GitHub branch for Android development:${NC}"
echo "   git checkout -b android-apk"
echo "   git add ."
echo "   git commit -m 'Initial Android APK setup with Capacitor'"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "   • Capacitor: https://capacitorjs.com/docs"
echo "   • Android: https://developer.android.com/docs"
echo "   • Gradle: https://gradle.org/docs"
echo ""
