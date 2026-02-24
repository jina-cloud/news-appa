const axios = require('axios');
const FormData = require('form-data');

/**
 * POST /api/watermark/remove
 * Body JSON: { imageUrl: "https://..." }
 * Fetches the image from imageUrl, sends it to RapidAPI watermark removal,
 * returns the clean image as a base64 data URL.
 */
const removeWatermark = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ success: false, message: 'imageUrl is required.' });
        }

        const apiKey = process.env.WATERMARK_API_KEY;
        if (!apiKey || apiKey === 'your_rapidapi_key_here') {
            return res.status(500).json({
                success: false,
                message: 'Watermark API key not configured. Add WATERMARK_API_KEY to backend/.env'
            });
        }

        // Step 1: Download the source image into memory
        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
                'Referer': imageUrl,
            }
        });

        const imageBuffer = Buffer.from(imageResponse.data);
        const contentType = imageResponse.headers['content-type'] || 'image/jpeg';

        // Determine file extension from content type
        const ext = contentType.split('/')[1]?.split(';')[0] || 'jpg';
        const filename = `news-image.${ext}`;

        // Step 2: Build multipart form and call RapidAPI
        const form = new FormData();
        form.append('image', imageBuffer, {
            filename,
            contentType,
        });

        const apiResponse = await axios.post(
            'https://watermark-remover2.p.rapidapi.com/remove-watermark',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'watermark-remover2.p.rapidapi.com',
                },
                responseType: 'arraybuffer',
                timeout: 90000,
            }
        );

        // Step 3: Return clean image as base64 data URL
        const cleanBase64 = Buffer.from(apiResponse.data, 'binary').toString('base64');
        const cleanContentType = apiResponse.headers['content-type'] || 'image/png';
        const dataUrl = `data:${cleanContentType};base64,${cleanBase64}`;

        return res.json({ success: true, imageUrl: dataUrl });

    } catch (error) {
        console.error('Watermark removal error:', error?.response?.status, error.message);

        let message = 'Failed to remove watermark. Please try again.';
        if (error?.response?.status === 403) {
            message = 'API key invalid or quota exceeded. Check your RapidAPI subscription.';
        } else if (error?.response?.status === 429) {
            message = 'Rate limit reached. Please wait a moment and try again.';
        } else if (error.code === 'ECONNABORTED') {
            message = 'Request timed out. The image may be too large or the service is slow.';
        }

        return res.status(500).json({ success: false, message });
    }
};

module.exports = { removeWatermark };
