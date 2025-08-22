import fetch from 'node-fetch';
export async function handler() {
    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dxpxhp9vw/resources/image/upload?prefix=wedding_gallery', {
            headers: { 'Authorization': 'Basic ' + Buffer.from('453425982124397:9WciSoAShunPJ0Y9x7nO9826Auw').toString('base64') }
        });
        const data = await response.json();
    
        if (!data.resources) {
            return { statusCode: 500, body: JSON.stringify({ error: 'No resources found' }) };
        }
        const images = data.resources.map(img => img.secure_url);
        return { statusCode: 200, body: JSON.stringify(images) };
    }
    catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
}