async function openCode(fileName) {
    const viewer = document.getElementById("viewer");
    const display = document.getElementById("codeDisplay");
    
    viewer.style.display = "flex";
    display.textContent = "// Sedang memuat kode dari: " + folderPath + fileName;

    try {
        // Tambahkan cache: 'no-cache' agar file selalu segar
        const response = await fetch(folderPath + fileName, { cache: 'no-cache' });
        
        if (!response.ok) {
            throw new Error(`Status: ${response.status} - File mungkin tidak ada.`);
        }
        
        const content = await response.text();
        display.textContent = content;
    } catch (err) {
        display.textContent = `// ERROR DETAIL: 
// 1. Pastikan folder '${folderPath}' sejajar dengan file HTML ini.
// 2. Pastikan nama file '${fileName}' sama persis (Case Sensitive).
// 3. JANGAN buka file HTML langsung (klik 2x), gunakan Live Server/Hosting.
// 4. Pesan asli: ${err.message}`;
    }
}
