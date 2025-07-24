#!/bin/bash

# SisoDev Release Deployment Script
# This script will increment the version and deploy to Vercel production

set -e  # Exit on any error

echo "🚀 Starting SisoDev Release Deployment..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Check if we're on the main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
    echo "⚠️  Warning: You're not on the main/master branch (currently on: $current_branch)"
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Error: Vercel CLI is not installed"
    echo "Install it with: npm install -g vercel"
    exit 1
fi

# Get current version from package.json
current_version=$(node -p "require('./package.json').version")
echo "📦 Current version: $current_version"

# Ask user for version increment type
echo ""
echo "Select version increment type:"
echo "1) Patch (0.0.x) - Bug fixes"
echo "2) Minor (0.x.0) - New features"
echo "3) Major (x.0.0) - Breaking changes"
echo "4) Custom version"
echo ""
read -p "Enter your choice (1-4): " version_choice

case $version_choice in
    1)
        increment_type="patch"
        ;;
    2)
        increment_type="minor"
        ;;
    3)
        increment_type="major"
        ;;
    4)
        read -p "Enter custom version (e.g., 1.2.3): " custom_version
        if [[ ! $custom_version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo "❌ Error: Invalid version format. Use semantic versioning (x.y.z)"
            exit 1
        fi
        ;;
    *)
        echo "❌ Error: Invalid choice"
        exit 1
        ;;
esac

# Increment version using npm
if [ "$version_choice" = "4" ]; then
    echo "🔄 Setting version to $custom_version..."
    npm version $custom_version --no-git-tag-version
    new_version=$custom_version
else
    echo "🔄 Incrementing $increment_type version..."
    new_version=$(npm version $increment_type --no-git-tag-version)
    # Remove 'v' prefix that npm adds
    new_version=${new_version#v}
fi

echo "✅ Version updated to: $new_version"

# Build the project to ensure it compiles
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed. Reverting version change..."
    git checkout package.json package-lock.json
    exit 1
fi

echo "✅ Build successful"

# Commit version change
echo "📝 Committing version change..."
git add package.json package-lock.json
git commit -m "chore: bump version to $new_version"

# Create git tag
echo "🏷️  Creating git tag..."
git tag "v$new_version"

# Push changes and tags
echo "⬆️  Pushing changes to remote..."
git push origin $current_branch
git push origin "v$new_version"

# Deploy to Vercel production
echo "🚀 Deploying to Vercel production..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo "📦 Version: $new_version"
    echo "🏷️  Git tag: v$new_version"
    echo "🌐 Production deployment completed"
    echo ""
    echo "🔗 Check your deployment at: https://vercel.com/dashboard"
else
    echo "❌ Error: Vercel deployment failed"
    exit 1
fi
