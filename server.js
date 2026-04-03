const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Melayani file statis (HTML dan isi folder scrape)
app.use(express.static(__dirname));

// API untuk mengambil daftar file .js di folder scrape
app.get('/api/files', (req, res) => {
    const folderPath = path.join(__dirname, 'scrape');
    
    // Buat folder jika belum ada
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        return res.json([]);
    }
    
    // Baca folder dan filter hanya file .js
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
    res.json(files);
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
