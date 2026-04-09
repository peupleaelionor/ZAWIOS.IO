/**
 * Cloudinary upload helper — uses the signed upload flow via /api/media/sign.
 * All secrets stay server-side.
 */

export async function uploadToCloudinary(file: File, folder = 'zawios') {
  // Step 1: get signed params from our API
  const signRes = await fetch('/api/media/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  })

  if (!signRes.ok) {
    throw new Error('Failed to get upload signature')
  }

  const { signature, timestamp, apiKey, cloudName } = await signRes.json()

  // Step 2: upload directly to Cloudinary
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('timestamp', String(timestamp))
  formData.append('signature', signature)
  formData.append('folder', folder)

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  if (uploadPreset) {
    formData.append('upload_preset', uploadPreset)
  }

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!uploadRes.ok) {
    throw new Error('Upload failed')
  }

  const data = await uploadRes.json()
  return {
    url: data.secure_url as string,
    publicId: data.public_id as string,
  }
}
