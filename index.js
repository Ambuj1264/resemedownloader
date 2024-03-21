// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Define a route to handle PDF download
app.get('/', (req, res) => {
    // Assuming your PDF file is named "example.pdf" and is located in the "public" folder
    const filePath = path.join(__dirname, 'public', "Ambujsingh'sresume.pdf");
    const fileName = 'Ambujsinghresume.pdf';

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }

        // Set the appropriate content type and attachment header
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        // Create a read stream to the file and pipe it to the response object
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
