# Build 1.0.0

This is a placeholder folder for Build 1.0.0.

## How to use this folder

1. Build your Unity WebGL project
2. Copy all build files (including `index.html`, `Build/`, `StreamingAssets/`, etc.) into this folder
3. The build will be accessible at: `https://yourusername.github.io/repository/web-builds/build-1.0.0/`

## Build Structure

After copying your Unity build, this folder should contain:

```
build-1.0.0/
├── index.html          # Unity WebGL loader
├── Build/              # Unity build files
│   ├── build-1.0.0.data
│   ├── build-1.0.0.framework.js
│   └── build-1.0.0.loader.js
└── StreamingAssets/    # Streaming assets
```

## Notes

- Make sure `index.html` is in the root of this folder
- All paths in `index.html` should be relative (Unity does this by default)
- Test the build locally before committing

