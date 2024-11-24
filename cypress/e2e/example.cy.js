describe('My First Test', () => {
    it('visits the app', () => {
        cy.request('https://picsum.photos/200') // 200 是圖片的尺寸
          .then((response) => {
            // Step 2: 檢查響應狀態碼是否為 200
            expect(response.status).to.eq(200);

            // Step 3: 獲取圖片的 URL
            const imageUrl = response.body;

            // Step 4: 使用 Cypress 的 file 下載圖片
            cy.writeFile('cypress/downloads/random-image.jpg', response.body, 'binary');
        });
    })
  })
