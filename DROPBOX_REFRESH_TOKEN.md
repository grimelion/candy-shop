# Dropbox Refresh Token Setup

Your Dropbox access token expires after 4 hours. To fix this permanently, use a refresh token.

## ⚡ Quick Start (Automated Script)

Run the automated script to get your refresh token in seconds:

```bash
node get-dropbox-refresh-token.js
```

The script will:
1. Ask for your App Key and App Secret
2. Generate the authorization URL for you
3. Get your refresh token automatically
4. Show you exactly what to add to `.env`

**That's it!** Skip to the bottom to paste the values into your `.env` file.

---

## Option 1: Try Long-Lived Token First (Manual)

1. Go to https://www.dropbox.com/developers/apps
2. Select your app
3. Go to **Settings** tab
4. Under "OAuth 2", check if you can set **Access token expiration** to "No expiration"
5. If available, generate a new token and update `.env` with just:
   ```
   DROPBOX_ACCESS_TOKEN=your_new_long_lived_token
   ```

If this option isn't available, use Option 2 below.

## Option 2: Use Refresh Token (Recommended)

### Step 1: Get App Credentials

1. Go to https://www.dropbox.com/developers/apps
2. Select your app (or create a new one)
3. Go to **Settings** tab
4. Copy your **App key** and **App secret**

### Step 2: Get Refresh Token

1. Go to this URL in your browser (replace `YOUR_APP_KEY`):
   ```
   https://www.dropbox.com/oauth2/authorize?client_id=YOUR_APP_KEY&token_access_type=offline&response_type=code
   ```

2. Click "Allow" to authorize your app
3. Copy the **authorization code** from the URL (after `code=`)

4. Use this code to get your refresh token. Run this in terminal (replace values):
   ```bash
   curl https://api.dropbox.com/oauth2/token \
     -d code=YOUR_AUTHORIZATION_CODE \
     -d grant_type=authorization_code \
     -d client_id=YOUR_APP_KEY \
     -d client_secret=YOUR_APP_SECRET
   ```

5. You'll get a response with a `refresh_token` - copy it!

### Step 3: Update .env

Add these to your `.env` file:

```env
DROPBOX_APP_KEY=your_app_key_here
DROPBOX_APP_SECRET=your_app_secret_here
DROPBOX_REFRESH_TOKEN=your_refresh_token_here
DROPBOX_FOLDER_PATH=
```

You can keep your old `DROPBOX_ACCESS_TOKEN` as a fallback, but it won't be needed.

### Step 4: Test

Restart your dev server and visit the gallery. The token will now auto-refresh every 4 hours!

## How It Works

The API route now:
1. Checks if you have refresh token credentials
2. If yes, uses the refresh token to get a new access token automatically
3. Caches the access token for 3.5 hours
4. Auto-refreshes before expiration
5. Falls back to `DROPBOX_ACCESS_TOKEN` if refresh token isn't configured

Your token will never expire again! 🎉
