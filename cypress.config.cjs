const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async downloadImageFromUrl({ count, format }) {
          const imageUrls = [];
          for (let i = 0; i < count; i++) {
            // API: https://picsum.photos/
            imageUrls.push(`https://picsum.photos/200/300.jpg?random=${i + 1}`);
          }

          const folderPath = path.join(__dirname, 'cypress', 'downloads');
          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
          }

          const imagePaths = [];
          for (let i = 0; i < imageUrls.length; i++) {
            const url = imageUrls[i];
            const fileName = `download_${count}_photo${i + 1}.${format}`;
            const filePath = path.join(folderPath, fileName);

            try {
              const response = await axios({
                url,
                method: 'GET',
                responseType: 'arraybuffer',
              });
              await fs.promises.writeFile(filePath, response.data);
              imagePaths.push(filePath);

            } catch (error) {
              throw new Error(`Error downloading image from ${url}: ${error.message}`);

            }
          }
          return imagePaths;
        },
      });
    },
  },
});
