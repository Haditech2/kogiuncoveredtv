import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './button';
import { Image, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  acceptVideo?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
  className,
  label = 'Upload an image',
  acceptVideo = false,
}) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      setUploadProgress(0);
      
      try {
        // Upload to Cloudinary via backend
        const result = await api.uploadFile(file);
        setPreview(result.url);
        onChange(result.url);
        setUploadProgress(100);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload file. Please try again.');
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptVideo ? {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    } : {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    disabled: disabled || isUploading,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    onChange('');
  };

  const isVideo = preview && (preview.includes('.mp4') || preview.includes('.mov') || preview.includes('.webm'));

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
              {isVideo ? (
                <video
                  src={preview}
                  controls
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              )}
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
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm text-muted-foreground">Uploading to Cloudinary...</p>
                {uploadProgress > 0 && (
                  <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
                )}
              </div>
            ) : (
              <>
                <div className="p-3 rounded-full bg-muted">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">
                  {isDragActive
                    ? `Drop the ${acceptVideo ? 'file' : 'image'} here`
                    : `Drag & drop ${acceptVideo ? 'an image or video' : 'an image'} here, or click to select`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {acceptVideo ? 'Max size: 10MB' : 'Recommended: 1200x630px (16:9 aspect ratio)'}
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
