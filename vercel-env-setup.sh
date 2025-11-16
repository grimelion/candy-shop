#!/bin/bash

# Vercel Environment Variables Setup Script
# This script uploads your .env variables to Vercel

echo "🚀 Setting up Vercel environment variables..."

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

# Login to Vercel
echo "🔐 Logging in to Vercel..."
vercel login

# Link to Vercel project (if not already linked)
echo "🔗 Linking to Vercel project..."
vercel link

# Read .env file and add each variable to Vercel
echo "📝 Adding environment variables to Vercel..."

while IFS= read -r line || [ -n "$line" ]; do
    # Skip empty lines and comments
    if [[ -z "$line" ]] || [[ "$line" =~ ^# ]]; then
        continue
    fi

    # Extract key and value
    if [[ "$line" =~ ^([^=]+)=(.*)$ ]]; then
        key="${BASH_REMATCH[1]}"
        value="${BASH_REMATCH[2]}"

        echo "Adding $key..."

        # Add to all environments (production, preview, development)
        vercel env add "$key" production <<< "$value"
        vercel env add "$key" preview <<< "$value"
        vercel env add "$key" development <<< "$value"
    fi
done < .env

echo "✅ All environment variables added to Vercel!"
echo "🔄 Redeploy your app for changes to take effect:"
echo "   vercel --prod"
