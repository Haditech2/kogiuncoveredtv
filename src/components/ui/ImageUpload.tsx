import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './button';
import { Image, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
  className,
  label = 'Upload an image',
}) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      
      // In a real app, you would upload the file to a server here
      // For demo purposes, we'll just create a local URL
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      onChange(fileUrl);
      
      // Simulate upload delay
      setTimeout(() => {
        setIsUploading(false);
      }, 1000);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    disabled: disabled || isUploading,
    multiple: false,
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    onChange('');
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative group">
            <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                disabled={disabled || isUploading}
              >
                <X className="h-4 w-4 text-destructive" />
              </button>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Click to change or drag and drop
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            {isUploading ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-muted-foreground/20 rounded-full mb-2"></div>
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-full bg-muted">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">
                  {isDragActive
                    ? 'Drop the image here'
                    : 'Drag & drop an image here, or click to select'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 1200x630px (16:9 aspect ratio)
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
