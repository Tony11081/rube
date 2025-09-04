#!/bin/bash
# Emergency script to switch to minimal dependencies if deployment fails

echo "🚨 Switching to minimal dependencies for deployment..."

# Backup original package.json
cp package.json package.full.json
echo "✅ Backed up full package.json to package.full.json"

# Switch to minimal package.json
cp package.minimal.json package.json
echo "✅ Switched to minimal package.json"

# Remove lockfiles to force regeneration
rm -f package-lock.json pnpm-lock.yaml
echo "✅ Removed existing lockfiles"

echo "🎯 Ready for deployment with minimal dependencies"
echo "   To restore full dependencies, run: cp package.full.json package.json"