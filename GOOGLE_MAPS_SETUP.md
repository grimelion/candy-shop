# Google Maps Setup Instructions

The website now includes an interactive Google Map on the Location & Hours section. To enable the map, you need to set up a Google Maps API key.

## Steps to Get a Google Maps API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create or Select a Project**
   - If you don't have a project, create one
   - Select your project from the dropdown

3. **Enable the Maps JavaScript API**
   - Go to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click on it and press "Enable"

4. **Create API Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

5. **Restrict Your API Key (Recommended)**
   - Click on your API key to edit it
   - Under "Application restrictions":
     - Select "HTTP referrers (web sites)"
     - Add your domains:
       - `localhost:3000/*` (for development)
       - `yourdomain.com/*` (for production)
       - `*.vercel.app/*` (if using Vercel)
   - Under "API restrictions":
     - Select "Restrict key"
     - Check "Maps JavaScript API"
   - Click "Save"

## Adding the API Key to Your Project

### For Local Development

Create a `.env.local` file in the root of your project:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - **Value**: Your Google Maps API key
   - **Environment**: Production, Preview, and Development
4. Click "Save"
5. Redeploy your application

## Verify the Map is Working

1. Restart your development server: `npm run dev`
2. Navigate to the Location & Hours section
3. You should see an interactive Google Map showing the store location at:
   **3605 Chapel Rd, Newtown Square, PA 19073**

## Troubleshooting

- **Map not showing?** Check the browser console for errors
- **"For development purposes only" watermark?** You need to set up billing in Google Cloud Console
- **Map shows error message?** Verify the API key is correct and the Maps JavaScript API is enabled
- **Map is gray?** Check that you've enabled the Maps JavaScript API and not just the Maps Embed API

## Pricing

Google Maps offers $200 of free usage per month, which covers approximately 28,000 map loads. For a typical small business website, this should be more than sufficient.

Learn more: https://mapsplatform.google.com/pricing/
