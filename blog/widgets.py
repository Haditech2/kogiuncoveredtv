from django import forms
from django.utils.safestring import mark_safe


class QuillEditorWidget(forms.Textarea):
    """Custom rich text editor widget using Quill.js"""
    
    def __init__(self, attrs=None):
        default_attrs = {'class': 'quill-editor', 'style': 'display:none;'}
        if attrs:
            default_attrs.update(attrs)
        super().__init__(default_attrs)
    
    def render(self, name, value, attrs=None, renderer=None):
        textarea = super().render(name, value, attrs, renderer)
        
        # Get the field ID
        field_id = attrs.get('id', f'id_{name}') if attrs else f'id_{name}'
        
        html = f'''
        <div class="quill-wrapper">
            <div id="{field_id}_editor" class="quill-editor-container"></div>
            {textarea}
        </div>
        
        <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
        <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
        
        <style>
            .quill-editor-container {{
                min-height: 400px;
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
            }}
            .ql-toolbar {{
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
                background: #f9fafb;
                border-bottom: 1px solid #d1d5db;
            }}
            .ql-container {{
                border-bottom-left-radius: 0.5rem;
                border-bottom-right-radius: 0.5rem;
                font-size: 16px;
                font-family: system-ui, -apple-system, sans-serif;
            }}
            .ql-editor {{
                min-height: 350px;
            }}
        </style>
        
        <script>
            (function() {{
                var quill = new Quill('#{field_id}_editor', {{
                    theme: 'snow',
                    modules: {{
                        toolbar: [
                            [{{ 'header': [1, 2, 3, false] }}],
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{{ 'list': 'ordered' }}, {{ 'list': 'bullet' }}],
                            [{{ 'indent': '-1' }}, {{ 'indent': '+1' }}],
                            ['link', 'image'],
                            [{{ 'align': [] }}],
                            ['clean']
                        ]
                    }},
                    placeholder: 'Write your post content here...'
                }});
                
                // Set initial content
                var textarea = document.getElementById('{field_id}');
                if (textarea.value) {{
                    quill.root.innerHTML = textarea.value;
                }}
                
                // Update textarea on change
                quill.on('text-change', function() {{
                    textarea.value = quill.root.innerHTML;
                }});
                
                // Update on form submit
                var form = textarea.closest('form');
                if (form) {{
                    form.addEventListener('submit', function() {{
                        textarea.value = quill.root.innerHTML;
                    }});
                }}
            }})();
        </script>
        '''
        
        return mark_safe(html)
    
    class Media:
        css = {
            'all': ['https://cdn.quilljs.com/1.3.7/quill.snow.css']
        }
        js = ['https://cdn.quilljs.com/1.3.7/quill.min.js']
