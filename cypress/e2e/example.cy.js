describe('Validate downloaded images', () => {
    it('should download images and verify their existence', () => {
      const count = 5;
      const format = 'jpg';
  
      cy.task('downloadImageFromUrl', { count, format }).then((downloadedPaths) => {
        downloadedPaths.forEach((filePath) => {
          cy.readFile(filePath, 'binary').then((fileContent) => {
            expect(fileContent.length).to.be.greaterThan(0);
            cy.log(`Verified file exists: ${filePath}`);
          });
        });
      });
    });
  });
  