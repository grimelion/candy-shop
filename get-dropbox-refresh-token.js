#!/usr/bin/env node

/**
 * Dropbox Refresh Token Generator
 *
 * Usage:
 * 1. Get authorization code from:
 *    https://www.dropbox.com/oauth2/authorize?client_id=YOUR_APP_KEY&token_access_type=offline&response_type=code
 * 2. Run: node get-dropbox-refresh-token.js
 * 3. Paste the authorization code when prompted
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function getRefreshToken() {
  console.log('\n🍬 Dropbox Refresh Token Generator\n');

  // Get App Key
  const appKey = await question('Enter your Dropbox App Key: ');
  if (!appKey.trim()) {
    console.error('❌ App Key is required!');
    process.exit(1);
  }

  // Get App Secret
  const appSecret = await question('Enter your Dropbox App Secret: ');
  if (!appSecret.trim()) {
    console.error('❌ App Secret is required!');
    process.exit(1);
  }

  // Show authorization URL
  console.log('\n📋 Step 1: Get Authorization Code');
  console.log('Visit this URL in your browser:\n');
  console.log(`https://www.dropbox.com/oauth2/authorize?client_id=${appKey}&token_access_type=offline&response_type=code\n`);
  console.log('Click "Allow" and copy the code from the URL\n');

  // Get authorization code
  const authCode = await question('Paste your authorization code here: ');
  if (!authCode.trim()) {
    console.error('❌ Authorization code is required!');
    process.exit(1);
  }

  console.log('\n⏳ Getting refresh token...\n');

  try {
    // Make POST request to get refresh token
    const response = await fetch('https://api.dropbox.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${appKey}:${appSecret}`).toString('base64')
      },
      body: new URLSearchParams({
        code: authCode.trim(),
        grant_type: 'authorization_code'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error:', error);
      process.exit(1);
    }

    const data = await response.json();

    console.log('✅ Success! Here are your tokens:\n');
    console.log('━'.repeat(60));
    console.log('\n📝 Add these to your .env file:\n');
    console.log(`DROPBOX_APP_KEY=${appKey}`);
    console.log(`DROPBOX_APP_SECRET=${appSecret}`);
    console.log(`DROPBOX_REFRESH_TOKEN=${data.refresh_token}`);
    console.log(`DROPBOX_ACCESS_TOKEN=${data.access_token}`);
    console.log('\n━'.repeat(60));
    console.log('\n💡 Note: The refresh_token never expires!');
    console.log('   The access_token expires in 4 hours but will auto-refresh.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }

  rl.close();
}

getRefreshToken();
