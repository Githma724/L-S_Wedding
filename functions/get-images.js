import fetch from 'node-fetch';
export async function handler() {
  const CLOUD_NAME = 'dxpxhp9vw';
  const API_KEY = '453425982124397';               // Hardcoded for testing only
  const API_SECRET = '9WciSoAShunPJ0Y9x7nO9826Auw';

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?prefix=wedding_gallery`,
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64')
        }
      }
    );

    if (!response.ok) throw new Error(`Cloudinary error: ${response.statusText}`);
    const data = await response.json();

    if (!data.resources) {
      return { statusCode: 500, body: JSON.stringify({ error: 'No resources found' }) };
    }

    const images = data.resources.map(img => img.secure_url);

    return { statusCode: 200, body: JSON.stringify(images) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
