const express = require('express');
const {
    getAllNews,
    getSingleNews,
    getNewsByCategory,
    addCustomNews,
    updateCustomNews,
    deleteCustomNews
} = require('../controllers/newsController');
const { removeWatermark } = require('../controllers/watermarkController');

const router = express.Router();

// Public Routes  (note: category route MUST come before :id route)
router.get('/news', getAllNews);
router.get('/news/category/:category', getNewsByCategory);
router.get('/news/:id', getSingleNews);

// Live stream endpoint — URL is server-side only, never exposed in client code
router.get('/stream', (req, res) => {
    const streamUrl = process.env.LIVE_STREAM_URL ||
        'https://rtmp01.voaplus.com/hls/6x6ik312qk4grfxocfcv_src/index.m3u8';
    res.json({ url: streamUrl });
});

// Admin Routes for manual news updates
router.post('/admin/news', addCustomNews);
router.put('/admin/news/:id', updateCustomNews);
router.delete('/admin/news/:id', deleteCustomNews);

// Watermark Removal (accepts JSON body: { imageUrl })
router.post('/watermark/remove', removeWatermark);

module.exports = router;

