# Logo Upload Guide

## How to Add Your Logo

Your site template has been updated to use the "Kogi Uncovered" logo. To complete the setup:

### Step 1: Save the Logo Image
1. Save the logo image you provided as `logo.png`
2. Make sure it's a PNG file with transparent background for best results
3. Recommended size: 200-400px width (height will auto-adjust)

### Step 2: Upload to Cloudinary
Since your site uses Cloudinary for media storage, upload the logo there:

1. Go to your Cloudinary dashboard: https://cloudinary.com/console
2. Upload the logo.png file
3. Copy the public URL

### Step 3: Update the Static Files
Replace the placeholder file at `kogiuncovered-django/static/logo.png` with your actual logo image.

### Alternative: Use Cloudinary URL Directly
You can also update the template to use the Cloudinary URL directly:

In `templates/base.html`, replace:
```html
<img src="{% static 'logo.png' %}" alt="Kogi Uncovered Logo" class="h-10 w-auto">
```

With:
```html
<img src="YOUR_CLOUDINARY_URL_HERE" alt="Kogi Uncovered Logo" class="h-10 w-auto">
```

## Logo Locations Updated
The logo has been added to:
- Navigation bar (top of every page)
- Footer (bottom of every page)
- Loading screen (can be updated separately)

## Current Status
✅ Template updated to use logo
⏳ Actual logo image needs to be uploaded

Once you upload the logo file, it will automatically appear on your site!
