# Custom Rich Text Editor with Attachments

## Overview

We've replaced the insecure CKEditor 4.22.1 with a custom-built rich text editor using **Quill.js 1.3.7**, a modern, secure, and actively maintained rich text editor. Additionally, we've added a comprehensive attachment system for PDFs, documents, and videos.

## Features

### Rich Text Editor
The custom editor includes:

#### Formatting Options
- **Headers**: H1, H2, H3
- **Text Styles**: Bold, Italic, Underline, Strikethrough
- **Lists**: Ordered and unordered lists
- **Indentation**: Increase/decrease indent
- **Alignment**: Left, center, right, justify
- **Blockquotes**: For quotes and callouts
- **Code Blocks**: For code snippets
- **Links**: Insert hyperlinks
- **Images**: Insert images
- **Clean**: Remove formatting

### Attachment System
Posts can now include downloadable attachments:

#### Attachment Features
- **Multiple File Types**: PDF, Word documents, videos, audio files, and more
- **Download Tracking**: Tracks how many times each file is downloaded
- **File Metadata**: Title, type, size, and description for each attachment
- **Visual Display**: Attractive download buttons with file type icons
- **Easy Management**: Add attachments when creating/editing posts, delete them individually

#### Supported Attachment Types
- PDF Document
- Word Document
- Video File
- Audio File
- Other (any file type)

### Video Embedding
- **Video URL Field**: Add YouTube or Vimeo URLs to embed videos in posts
- **Automatic Embedding**: Videos are automatically embedded in the post detail page
- **Responsive Player**: Video player adapts to screen size

## How to Use

### Creating a Post with Attachments

1. **Navigate to Dashboard**: Go to `/dashboard/` and click "Create New Post"

2. **Fill in Post Details**:
   - Upload a featured image
   - Enter post title
   - Write an excerpt (brief summary)
   - Add tags (comma-separated)
   - Add video URL (optional, for YouTube/Vimeo)

3. **Write Content**: Use the rich text editor to write your post content with formatting

4. **Add Attachments** (optional):
   - Click "+ Add Attachment" button
   - For each attachment:
     - Enter a title (e.g., "Annual Report 2024")
     - Select file type (PDF, Word, Video, etc.)
     - Choose the file to upload
     - Enter file size (e.g., "2.5 MB")
     - Add description (optional)
   - Click "Remove" to delete an attachment before saving
   - Add multiple attachments as needed

5. **Publish**: Check "Publish immediately" and click "Publish Post"

### Editing a Post

1. **Navigate to Post**: View the post and click "Edit" button (admin only)

2. **Update Content**: Modify any post fields using the rich text editor

3. **Manage Existing Attachments**:
   - View all existing attachments with download counts
   - Click "Delete" to remove an attachment

4. **Add New Attachments**: Use the "+ Add Attachment" button to add more files

5. **Save Changes**: Click "Update Post"

### Viewing Attachments

On the post detail page, attachments appear in a "Downloads" section with:
- File type icon (PDF, video, document)
- Attachment title and description
- File type and size
- Download count
- Download button

Users click the attachment to download it, and the download count increments automatically.

## Technical Details

### Implementation

#### Rich Text Editor

The editor is implemented as a Django widget in `blog/widgets.py`:

```python
from blog.widgets import QuillEditorWidget

class PostForm(forms.ModelForm):
    class Meta:
        widgets = {
            'content': QuillEditorWidget(),
        }
```

#### Attachment System

The attachment system uses:

1. **Model** (`blog/models.py`):
```python
class PostAttachment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='attachments')
    title = models.CharField(max_length=200)
    file = CloudinaryField('raw', resource_type='auto')
    file_type = models.CharField(max_length=10, choices=ATTACHMENT_TYPES)
    file_size = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    download_count = models.IntegerField(default=0)
```

2. **Form** (`blog/forms.py`):
```python
class PostAttachmentForm(forms.ModelForm):
    class Meta:
        model = PostAttachment
        fields = ['title', 'file', 'file_type', 'file_size', 'description']
```

3. **Views** (`blog/views.py`):
   - `create_post`: Handles attachment creation
   - `edit_post`: Manages existing and new attachments
   - `download_attachment`: Tracks downloads and redirects to file
   - `delete_attachment`: Removes attachments

4. **Templates**:
   - `create_post.html`: Dynamic attachment form with JavaScript
   - `edit_post.html`: Shows existing attachments + add new ones
   - `article_detail.html`: Displays attachments with download buttons

### How It Works

1. **Initialization**: Quill.js is loaded from CDN (version 1.3.7)
2. **Rendering**: A div container is created for the editor
3. **Synchronization**: Content is synced with a hidden textarea
4. **Submission**: On form submit, HTML content is saved to the database
5. **Display**: Content is rendered with `{{ post.content|safe }}`

### Storage

#### Content Storage
- Content is stored as HTML in the database
- Uses Django's `TextField` (no special field required)
- HTML is sanitized by Quill.js during editing
- Rendered safely in templates with the `safe` filter

#### Attachment Storage
- Files are uploaded to Cloudinary
- Uses `CloudinaryField` with `resource_type='auto'` for any file type
- Cloudinary handles file hosting, CDN delivery, and optimization
- Download URLs are generated dynamically
- Files persist even if local database is reset

## Security

### Rich Text Editor Security

1. **Active Maintenance**: Regular security updates
2. **XSS Protection**: Built-in sanitization
3. **No Server-Side Processing**: Pure client-side editor
4. **Trusted CDN**: Loaded from official Quill CDN
5. **Version Pinning**: Using specific version (1.3.7)

### Attachment Security

1. **File Validation**: File type checking on upload
2. **Cloudinary Security**: Files hosted on secure CDN
3. **Download Tracking**: Monitors file access
4. **Admin-Only Upload**: Only staff can add attachments
5. **No Direct Execution**: Files are downloaded, not executed

## Customization

### Changing Toolbar Options

Edit `blog/widgets.py` and modify the toolbar configuration:

```javascript
toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    // Add or remove options here
]
```

### Available Toolbar Options

- `header`: Heading levels
- `bold`, `italic`, `underline`, `strike`: Text formatting
- `blockquote`, `code-block`: Block formatting
- `list`: Ordered/unordered lists
- `indent`: Indentation
- `link`, `image`, `video`: Media
- `align`: Text alignment
- `color`, `background`: Colors
- `script`: Superscript/subscript
- `clean`: Remove formatting

### Changing Editor Height

Modify the CSS in `widgets.py`:

```css
.quill-editor-container {
    min-height: 400px;  /* Change this value */
}
```

### Changing Theme

Quill supports two themes:
- `snow`: Clean, modern (current)
- `bubble`: Inline, medium-style

To change:
```javascript
var quill = new Quill('#editor', {
    theme: 'bubble'  // Change from 'snow'
});
```

## Upgrading

To upgrade Quill.js in the future:

1. Check the latest version at https://quilljs.com/
2. Update the CDN URLs in `blog/widgets.py`:
   ```python
   # Change version number in both CSS and JS URLs
   https://cdn.quilljs.com/1.3.7/quill.snow.css
   https://cdn.quilljs.com/1.3.7/quill.min.js
   ```
3. Test thoroughly before deploying

## Database Schema

### Post Model Fields
- `title`: Post title
- `slug`: URL-friendly slug
- `excerpt`: Brief summary
- `content`: HTML content from Quill editor
- `featured_image`: Cloudinary image
- `video_url`: YouTube/Vimeo URL (optional)
- `tags`: Comma-separated tags
- `published`: Boolean for publish status

### PostAttachment Model Fields
- `post`: Foreign key to Post
- `title`: Display name
- `file`: Cloudinary file (any type)
- `file_type`: Choice field (pdf, doc, video, audio, other)
- `file_size`: String (e.g., "2.5 MB")
- `description`: Optional description
- `download_count`: Integer counter
- `created_at`: Timestamp

## URLs

- `/create-post/` - Create new post
- `/edit-post/<slug>/` - Edit existing post
- `/download/<id>/` - Download attachment (tracks count)
- `/attachment/<id>/delete/` - Delete attachment (admin only)

## Troubleshooting

### Editor Not Showing

- Check browser console for JavaScript errors
- Verify CDN is accessible
- Ensure form has the correct widget

### Content Not Saving

- Check that form submission includes the hidden textarea
- Verify the field name matches the model field
- Look for JavaScript errors on submit

### Formatting Lost

- Ensure `{{ post.content|safe }}` is used in templates
- Check that HTML is being stored (not escaped)
- Verify no middleware is stripping HTML

### Attachments Not Uploading

- Check Cloudinary credentials in `.env`
- Verify `enctype="multipart/form-data"` in form tag
- Check file size limits in Cloudinary settings
- Ensure staff permissions are set

### Download Count Not Incrementing

- Verify `download_attachment` view is being called
- Check that URL pattern is correct
- Ensure `increment_download()` method is working

### Attachments Not Displaying

- Check that `post.attachments.all` is in template context
- Verify foreign key relationship is correct
- Ensure migrations are applied: `python manage.py migrate`

## Migration from CKEditor

If you have existing posts with CKEditor content:

1. **No action needed**: HTML content is compatible
2. **Existing posts**: Will render correctly
3. **Editing**: Old posts can be edited with new editor
4. **Formatting**: Most CKEditor formatting is preserved

## Summary

The custom editor system provides:

✅ Secure, modern rich text editing with Quill.js
✅ Multiple file attachments per post
✅ Download tracking for analytics
✅ Video embedding support
✅ Clean, intuitive interface
✅ Mobile-responsive design
✅ Cloudinary integration for reliable file hosting

All features are production-ready and deployed on Vercel with PostgreSQL database.

## Comparison: CKEditor vs Quill

| Feature | CKEditor 4 | Quill.js |
|---------|-----------|----------|
| Security | ⚠️ Outdated | ✅ Active |
| Size | ~500KB | ~150KB |
| Maintenance | LTS only | Active |
| Modern | No | Yes |
| Mobile | Limited | Excellent |
| Customization | Complex | Simple |

## Resources

- **Quill.js Documentation**: https://quilljs.com/docs/
- **Quill.js GitHub**: https://github.com/quilljs/quill
- **CDN**: https://cdn.quilljs.com/

## Support

For issues or questions:
1. Check the Quill.js documentation
2. Review `blog/widgets.py` implementation
3. Test in browser console
4. Check Django form rendering
