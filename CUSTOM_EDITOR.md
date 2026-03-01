# Custom Rich Text Editor

## Overview

We've replaced the insecure CKEditor 4.22.1 with a custom-built rich text editor using **Quill.js 1.3.7**, a modern, secure, and actively maintained rich text editor.

## Why We Replaced CKEditor

- **Security**: CKEditor 4.22.1 had known security vulnerabilities
- **Maintenance**: CKEditor 4 is in LTS mode with limited updates
- **Modern Alternative**: Quill.js is actively maintained and secure
- **Lightweight**: Smaller bundle size and better performance
- **Customizable**: Easy to extend and customize

## Features

The custom editor includes:

### Formatting Options
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

### Design
- Clean, modern interface with Snow theme
- Responsive toolbar
- Minimum height of 400px for comfortable editing
- Rounded corners matching site design
- Proper spacing and typography

## Technical Details

### Implementation

The editor is implemented as a Django widget in `blog/widgets.py`:

```python
from blog.widgets import QuillEditorWidget

class PostForm(forms.ModelForm):
    class Meta:
        widgets = {
            'content': QuillEditorWidget(),
        }
```

### How It Works

1. **Initialization**: Quill.js is loaded from CDN (version 1.3.7)
2. **Rendering**: A div container is created for the editor
3. **Synchronization**: Content is synced with a hidden textarea
4. **Submission**: On form submit, HTML content is saved to the database
5. **Display**: Content is rendered with `{{ post.content|safe }}`

### Storage

- Content is stored as HTML in the database
- Uses Django's `TextField` (no special field required)
- HTML is sanitized by Quill.js during editing
- Rendered safely in templates with the `safe` filter

## Security

### Why Quill.js is Secure

1. **Active Maintenance**: Regular security updates
2. **XSS Protection**: Built-in sanitization
3. **No Server-Side Processing**: Pure client-side editor
4. **Trusted CDN**: Loaded from official Quill CDN
5. **Version Pinning**: Using specific version (1.3.7)

### Best Practices

- Content is stored as HTML (not executable code)
- Django's `safe` filter is used intentionally for rendering
- No user-uploaded JavaScript execution
- Images are hosted on Cloudinary (not inline base64)

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

## Migration from CKEditor

If you have existing posts with CKEditor content:

1. **No action needed**: HTML content is compatible
2. **Existing posts**: Will render correctly
3. **Editing**: Old posts can be edited with new editor
4. **Formatting**: Most CKEditor formatting is preserved

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
