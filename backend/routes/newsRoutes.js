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


// Admin Routes for manual news updates
router.post('/admin/news', addCustomNews);
router.put('/admin/news/:id', updateCustomNews);
router.delete('/admin/news/:id', deleteCustomNews);

// Watermark Removal (accepts JSON body: { imageUrl })
router.post('/watermark/remove', removeWatermark);

module.exports = router;
