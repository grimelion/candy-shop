# Dropbox Photo Gallery Setup

Your candy shop website now includes a dynamic photo gallery that automatically fetches images from Dropbox!

## Features

- **Masonry Grid Layout**: Pinterest-style responsive grid that adapts to different screen sizes
- **Lightbox Modal**: Click any image to view it full-size with a modal overlay
- **Automatic Updates**: Images are fetched dynamically from your Dropbox folder
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Hover Effects**: Smooth transitions and visual feedback on interaction

## Setup Instructions

### 1. Create a Dropbox App

1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Click "Create app"
3. Choose "Scoped access"
4. Choose "Full Dropbox" or "App folder" (depending on your preference)
5. Name your app (e.g., "Candy Shop Gallery")
6. Click "Create app"

### 2. Get Your Access Token

1. In your app's settings page, scroll down to "OAuth 2"
2. Under "Generated access token", click "Generate"
3. Copy the access token (it will look like a long string of characters)
4. **Important**: Store this token securely and never commit it to version control

### 3. Configure Permissions

In the "Permissions" tab, make sure these permissions are enabled:
- `files.metadata.read` - Read file and folder metadata
- `files.content.read` - View content of files

Click "Submit" after making changes.

### 4. Update Environment Variables

1. Open `.env` file in your project root
2. Replace `your_dropbox_access_token_here` with your actual access token:
   ```
   DROPBOX_ACCESS_TOKEN=sl.your_actual_token_here
   ```
3. Set the folder path where your gallery images are stored:
   ```
   DROPBOX_FOLDER_PATH=/candy-shop-gallery
   ```
   - Use `/` for the root of your Dropbox
   - Use `/folder-name` for a specific folder
   - The path is case-sensitive

### 5. Upload Images to Dropbox

1. Create the folder specified in `DROPBOX_FOLDER_PATH` in your Dropbox
2. Upload your candy shop images to this folder
3. Supported formats: JPG, JPEG, PNG, GIF, WebP, HEIC

### 6. Test the Gallery

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:3000`
3. Scroll to the "Our Sweet Gallery" section
4. Your images should appear in a masonry grid layout

## Troubleshooting

### "Dropbox access token not configured" error
- Make sure you've replaced `your_dropbox_access_token_here` with your actual token in `.env`
- Restart your development server after updating the `.env` file

### "Failed to fetch photos" error
- Check that the folder path in `DROPBOX_FOLDER_PATH` exists in your Dropbox
- Verify the access token has the correct permissions
- Check the browser console for more detailed error messages

### Images not appearing
- Ensure images are in supported formats (JPG, PNG, GIF, WebP, HEIC)
- Check that images are in the correct folder path
- Verify the access token hasn't expired

### Quota limits
- Dropbox API has rate limits. For production, consider implementing caching
- Free Dropbox accounts have API call limits

## Production Deployment

**Important Security Notes:**

1. Never commit your `.env` file to version control
2. Add `.env` to your `.gitignore` file (already done)
3. In production (Vercel, Netlify, etc.), add environment variables in your hosting platform's settings:
   - `DROPBOX_ACCESS_TOKEN`
   - `DROPBOX_FOLDER_PATH`

## Gallery Location

The photo gallery appears on the homepage between the Feature Cards and Pricing Cards sections:
- File: `src/app/page.tsx` (lines 71-81)
- Component: `src/components/PhotoGallery.tsx`
- API Route: `src/app/api/gallery/route.ts`

## Customization

### Change Gallery Title
Edit the title and description in `src/app/page.tsx`:
```tsx
<h2 className="text-4xl md:text-5xl font-bold mb-4">Your Title</h2>
<p className="text-lg text-gray-600 max-w-2xl mx-auto">
  Your description
</p>
```

### Adjust Grid Columns
Modify the masonry grid CSS in `src/components/PhotoGallery.tsx`:
- Default: 1 column on mobile, 2 on tablet, 3 on desktop, 4 on xl screens
- Change `column-count` values in the media queries to adjust

### Styling
The gallery uses Tailwind CSS classes. Modify classes in:
- `src/components/PhotoGallery.tsx` for component styling
- `src/app/page.tsx` for section styling

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Ensure Dropbox app permissions are configured
4. Check the API route at `/api/gallery` directly to see the response
