#!/bin/bash

# ClearPath Justice - Local APK Build Script
# This script builds a debug APK locally for testing and development

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}ClearPath Justice - APK Build Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ Error: package.json not found${NC}"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"
echo ""

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    echo "Install from: https://nodejs.org"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

if ! command -v java &> /dev/null; then
    echo -e "${RED}✗ Java not found (required for Android builds)${NC}"
    echo ""
    echo "Install Java:"
    echo "  macOS: brew install openjdk@17"
    echo "  Linux: sudo apt-get install openjdk-17-jdk"
    echo "  Windows: Download from https://adoptopenjdk.net/"
    exit 1
fi
JAVA_VERSION=$(java -version 2>&1 | head -1)
echo -e "${GREEN}✓ Java found (${JAVA_VERSION})${NC}"

echo ""
echo -e "${YELLOW}Step 1/7: Installing dependencies${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo ""
echo -e "${YELLOW}Step 2/7: Building web assets with Vite${NC}"
npm run build
echo -e "${GREEN}✓ Web assets built${NC}"

if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo -e "${RED}✗ Build output (dist/) is empty${NC}"
    exit 1
fi
DIST_SIZE=$(du -sh dist | cut -f1)
echo -e "${GREEN}✓ dist/ ready ($DIST_SIZE)${NC}"

echo ""
echo -e "${YELLOW}Step 3/7: Setting up Android platform${NC}"
if [ ! -d "android" ]; then
    echo "Android platform not found. Adding..."
    npx cap add android
    echo -e "${GREEN}✓ Android platform added${NC}"
else
    echo -e "${GREEN}✓ Android platform already exists${NC}"
fi

echo ""
echo -e "${YELLOW}Step 4/7: Syncing Capacitor to Android${NC}"
npx cap sync android --deployment
echo -e "${GREEN}✓ Capacitor sync completed${NC}"

echo ""
echo -e "${YELLOW}Step 5/7: Preparing Gradle wrapper${NC}"
chmod +x android/gradlew
echo -e "${GREEN}✓ Gradle wrapper ready${NC}"

echo ""
echo -e "${YELLOW}Step 6/7: Building Debug APK${NC}"
echo -e "${BLUE}(This may take 5-15 minutes on first build)${NC}"
echo ""
cd android
./gradlew clean assembleDebug --stacktrace
cd ..
echo -e "${GREEN}✓ Build completed${NC}"

echo ""
echo -e "${YELLOW}Step 7/7: Verifying APK${NC}"
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo -e "${GREEN}✓ APK built successfully${NC}"
    echo -e "${GREEN}  Path: $APK_PATH${NC}"
    echo -e "${GREEN}  Size: $SIZE${NC}"
else
    echo -e "${RED}✗ APK not found at $APK_PATH${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ APK Build Successful!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

echo -e "${BLUE}📱 Next Steps:${NC}"
echo ""
echo "1. ${YELLOW}Install on connected Android device:${NC}"
echo "   adb install \"$APK_PATH\""
echo ""
echo "2. ${YELLOW}Or use Android Emulator:${NC}"
echo "   adb -e install \"$APK_PATH\""
echo ""
echo "3. ${YELLOW}View APK file:${NC}"
echo "   $APK_PATH"
echo ""
echo "4. ${YELLOW}To test app on device:${NC}"
echo "   - Enable USB Debugging on your Android device"
echo "   - Connect device via USB"
echo "   - Run: adb install \"$APK_PATH\""
echo "   - Open 'ClearPath Justice' from app drawer"
echo ""
