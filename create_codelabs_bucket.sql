-- Create the codelabs storage bucket
-- Execute this in the Supabase SQL Editor

-- Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('codelabs', 'codelabs', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies to allow:
-- 1. Public read access to files
-- 2. Only authenticated users can upload files

-- Allow public read access to all files in the bucket
CREATE POLICY "Public Read Access for codelabs" ON storage.objects
FOR SELECT
USING (bucket_id = 'codelabs');

-- Allow authenticated users to upload/update files
CREATE POLICY "Authenticated Users can upload to codelabs" ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'codelabs');

-- Allow authenticated users to update their own files
CREATE POLICY "Authenticated Users can update their own files in codelabs" ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'codelabs' AND auth.uid() = owner);

-- Allow authenticated users to delete their own files
CREATE POLICY "Authenticated Users can delete their own files in codelabs" ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'codelabs' AND auth.uid() = owner);
