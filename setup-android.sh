#!/bin/bash

# Setup script for ClearPath Justice Android APK development
# This script automates the initial setup and configuration for Android builds

set -e

echo "🚀 Setting up ClearPath Justice Android development environment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verify we're in the correct directory
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}⚠️  Error: package.json not found. Please run this script from the repository root.${NC}"
    exit 1
fi

echo -e "${BLUE}✓ Running from repository root${NC}"

# 2. Verify Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi

echo -e "${BLUE}✓ Node.js $(node --version) found${NC}"
echo -e "${BLUE}✓ npm $(npm --version) found${NC}"

# 3. Install dependencies
echo -e "${BLUE}📦 Installing npm dependencies...${NC}"
npm ci

# 4. Verify Capacitor is installed
if ! npx cap --version &> /dev/null; then
    echo -e "${YELLOW}⚠️  Capacitor CLI not found. Installing...${NC}"
    npm install -g @capacitor/cli
fi

echo -e "${BLUE}✓ Capacitor CLI $(npx cap --version) ready${NC}"

# 5. Add .gitignore entries for Android build artifacts
echo -e "${BLUE}📝 Configuring .gitignore...${NC}"
if ! grep -q "android/app/build/" .gitignore 2>/dev/null; then
    echo "android/app/build/" >> .gitignore
    echo -e "${GREEN}  Added android/app/build/ to .gitignore${NC}"
fi

if ! grep -q "clearpath-release.keystore" .gitignore 2>/dev/null; then
    echo "clearpath-release.keystore" >> .gitignore
    echo -e "${GREEN}  Added clearpath-release.keystore to .gitignore${NC}"
fi

# 6. Create necessary directories
echo -e "${BLUE}📁 Creating directories...${NC}"
mkdir -p .github/workflows
mkdir -p android
echo -e "${GREEN}  Directories ready${NC}"

# 7. Build web assets
echo -e "${BLUE}🔨 Building production assets with Vite...${NC}"
npm run build

# 8. Sync Capacitor with Android platform
echo -e "${BLUE}🔄 Syncing Capacitor with Android platform...${NC}"
npx cap sync android

# 9. Summary
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Review the Android project:"
echo "     ${YELLOW}npx cap open android${NC}"
echo ""
echo "  2. Build the APK locally:"
echo "     ${YELLOW}npm run android:build${NC}"
echo ""
echo "  3. Or use the predefined scripts:"
echo "     ${YELLOW}npm run android:sync${NC}  - Sync Capacitor"
echo "     ${YELLOW}npm run android:open${NC}  - Open Android Studio"
echo ""
echo -e "${BLUE}For CI/CD:${NC}"
echo "  Push to the android-apk branch to trigger the GitHub Actions workflow"
echo "  The APK will be built and available as a workflow artifact"
echo ""
