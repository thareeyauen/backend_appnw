const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const r2 = require('../config/r2');

/**
 * Upload a buffer to Cloudflare R2 and return the public URL.
 */
async function uploadToR2(buffer, folder, originalname, mimetype) {
  const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(originalname);
  const key = `${folder}/${unique}${ext}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    })
  );

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

/**
 * Delete a file from R2 by its public URL.
 * Silently skips if the URL is empty or not an R2 URL.
 */
async function deleteFromR2(url) {
  if (!url) return;
  const base = process.env.R2_PUBLIC_URL;
  if (!base || !url.startsWith(base)) return; // skip old local paths or non-R2 URLs
  const key = url.slice(base.length + 1); // strip "https://...r2.dev/"
  if (!key) return;
  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    })
  );
}

module.exports = { uploadToR2, deleteFromR2 };
