#!/bin/bash

# Script to add a new build to the web-builds directory
# Usage: ./add-build.sh <version> <description> [date]

if [ $# -lt 2 ]; then
    echo "Usage: ./add-build.sh <version> <description> [date]"
    echo "Example: ./add-build.sh 1.0.1 'Bug fixes and improvements' '2024-01-15'"
    exit 1
fi

VERSION=$1
DESCRIPTION=$2
DATE=${3:-$(date +%Y-%m-%d)}
FOLDER="build-${VERSION}"

echo "Adding build:"
echo "  Version: $VERSION"
echo "  Folder: $FOLDER"
echo "  Description: $DESCRIPTION"
echo "  Date: $DATE"

# Create build folder
mkdir -p "$FOLDER"
echo "# Build $VERSION

This folder contains Build $VERSION.

## How to use

1. Copy your Unity WebGL build files into this folder
2. Make sure index.html is in the root of this folder
3. The build will be accessible at: \`https://yourusername.github.io/repository/web-builds/$FOLDER/\`
" > "$FOLDER/README.md"

# Update builds.json
if [ -f "builds.json" ]; then
    # Mark all existing builds as not latest
    sed -i.bak 's/"isLatest": true/"isLatest": false/g' builds.json
    rm builds.json.bak 2>/dev/null || true
    
    # Add new build entry (this is a simple approach, might need manual editing for complex JSON)
    echo ""
    echo "⚠️  Please manually add this entry to builds.json:"
    echo ""
    echo "  {"
    echo "    \"version\": \"$VERSION\","
    echo "    \"folder\": \"$FOLDER\","
    echo "    \"description\": \"$DESCRIPTION\","
    echo "    \"isLatest\": true,"
    echo "    \"date\": \"$DATE\""
    echo "  }"
    echo ""
else
    echo "Creating builds.json..."
    cat > builds.json << EOF
{
  "builds": [
    {
      "version": "$VERSION",
      "folder": "$FOLDER",
      "description": "$DESCRIPTION",
      "isLatest": true,
      "date": "$DATE",
      "changelog": []
    }
  ]
}
EOF
fi

echo "✅ Build folder created: $FOLDER"
echo "📝 Next steps:"
echo "   1. Copy your Unity WebGL build files to $FOLDER/"
echo "   2. Update builds.json with the new build entry"
echo "   3. Commit and push to GitHub"

