import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Image, Save, Link, Code, Eye } from 'lucide-react';
import './RichTextEditor.css';

interface RichTextEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '',
  onChange,
  height = 500,
  placeholder = 'Write your content here...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(initialValue);
  const [isPreview, setIsPreview] = useState(false);
  
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  const execCommand = (command: string, value: string = '') => {
    try {
      // Focus the editor first to ensure commands work
      if (editorRef.current) {
        editorRef.current.focus();
      }
      
      // Execute the command
      document.execCommand(command, false, value);
      
      // Update content state after command execution
      if (editorRef.current) {
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
        onChange(newContent);
      }
    } catch (error) {
      console.error('Error executing command:', error);
    }
  };

  const formatText = (format: string) => {
    try {
      if (editorRef.current) {
        editorRef.current.focus();
        
        // For headings, we need to use formatBlock with proper syntax
        document.execCommand('formatBlock', false, `<${format}>`);
        
        handleContentChange();
      }
    } catch (error) {
      console.error('Error formatting text:', error);
    }
  };

  // Ensure editor has focus before any operation
  const ensureFocus = () => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 border-b flex flex-wrap gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                execCommand('bold');
              }}>
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                execCommand('italic');
              }}>
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                execCommand('underline');
              }}>
                <Underline className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                formatText('h1');
              }}>
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                formatText('h2');
              }}>
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                execCommand('insertUnorderedList');
              }}>
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                execCommand('insertOrderedList');
              }}>
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                execCommand('justifyLeft');
              }}>
                <AlignLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                execCommand('justifyCenter');
              }}>
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                execCommand('justifyRight');
              }}>
                <AlignRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                const url = prompt('Enter URL:');
                if (url) {
                  const text = document.getSelection()?.toString() || 'Link';
                  execCommand('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
                }
              }}>
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                const selectedText = document.getSelection()?.toString() || '';
                const codeText = selectedText || 'Your code here';
                execCommand('insertHTML', `<pre><code>${codeText}</code></pre>`);
              }}>
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Code Block</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" onClick={() => {
                ensureFocus();
                // Create a file input element
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                document.body.appendChild(fileInput);
                
                // Handle file selection
                fileInput.onchange = (e) => {
                  const file = fileInput.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const imageUrl = event.target?.result as string;
                      execCommand('insertImage', imageUrl);
                    };
                    reader.readAsDataURL(file);
                  }
                  document.body.removeChild(fileInput);
                };
                
                // Trigger file selection dialog
                fileInput.click();
              }}>
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Image</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {isPreview ? (
        <div 
          className="p-4 outline-none min-h-[200px] prose prose-sm max-w-none"
          style={{ height: height ? `${height - 100}px` : '400px', overflowY: 'auto' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable="true"
          suppressContentEditableWarning={true}
          className="p-4 outline-none min-h-[200px] prose prose-sm max-w-none"
          style={{ height: height ? `${height - 100}px` : '400px', overflowY: 'auto' }}
          onInput={handleContentChange}
          onBlur={handleContentChange}
          data-placeholder={placeholder}
        />
      )}

      <div className="p-2 bg-muted flex justify-between">
        <Button 
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Eye className="h-4 w-4" />
          {isPreview ? 'Edit' : 'Preview'}
        </Button>
        <Button 
          type="button"
          onClick={() => {
            if (editorRef.current) {
              onChange(editorRef.current.innerHTML);
            }
          }}
          variant="secondary"
          size="sm"
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
      </div>
    </div>
  );
};

export default RichTextEditor;