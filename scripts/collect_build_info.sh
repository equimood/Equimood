#!/usr/bin/env bash
set -e

OUTFILE="build_info_$(date +%Y%m%d_%H%M%S).txt"
echo "Collecting build info..." > "$OUTFILE"

echo "Date: $(date -u)" >> "$OUTFILE"
echo "User: $(whoami)" >> "$OUTFILE"
echo "Git branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'no-git')" >> "$OUTFILE"
echo "Git commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'no-git')" >> "$OUTFILE"

echo "\nNode version:" >> "$OUTFILE"
node --version >> "$OUTFILE" 2>&1 || echo "node: not found" >> "$OUTFILE"

echo "\nNPM version:" >> "$OUTFILE"
npm --version >> "$OUTFILE" 2>&1 || echo "npm: not found" >> "$OUTFILE"

echo "\nEAS CLI version:" >> "$OUTFILE"
eas --version >> "$OUTFILE" 2>&1 || echo "eas: not found" >> "$OUTFILE"

echo "\nExpo version (package.json):" >> "$OUTFILE"
node -e "console.log(require('./package.json').dependencies.expo)" >> "$OUTFILE" 2>&1 || true

echo "\nXcode version:" >> "$OUTFILE"
xcodebuild -version >> "$OUTFILE" 2>&1 || echo "xcodebuild: not found or not macOS" >> "$OUTFILE"

echo "\nCocoaPods version (pod --version):" >> "$OUTFILE"
pod --version >> "$OUTFILE" 2>&1 || echo "pod: not found" >> "$OUTFILE"

echo "\nList of important files present:" >> "$OUTFILE"
for f in app.json eas.json netlify.toml package.json ios/Podfile ios/Podfile.properties.json; do
  if [ -f "$f" ]; then
    echo "$f: OK" >> "$OUTFILE"
  else
    echo "$f: MISSING" >> "$OUTFILE"
  fi
done

echo "\nFilesize summary for assets/:" >> "$OUTFILE"
du -sh assets 2>/dev/null | tee -a "$OUTFILE" || echo "assets: not found" >> "$OUTFILE"

echo "\nDone. Output file: $OUTFILE"
echo "Done. Output file: $OUTFILE"
