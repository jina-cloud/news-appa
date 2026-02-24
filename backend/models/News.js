const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    titleSi: {
        type: String,
        required: true
    },
    titleEn: {
        type: String
    },
    cover: {
        type: String
    },
    published: {
        type: Date,
        default: Date.now
    },
    contentSi: {
        type: mongoose.Schema.Types.Mixed // supports Array or String
    },
    share_url: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.Mixed // numeric id from API
    },
    categoryLabel: {
        type: String,
        default: 'news' // 'news' | 'sports' | 'business' | 'politics' | 'opinion' | 'entertainment' | 'life'
    },
    isCustom: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
