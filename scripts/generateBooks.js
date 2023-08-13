// scripts/generateBooks.js
const fs = require('fs');
const path = require('path');

const bookImagesPath = path.resolve('./public/bookimages');
const authors = fs.readdirSync(bookImagesPath);
const books = [];

authors.forEach((author) => {
  const titles = fs.readdirSync(path.join(bookImagesPath, author));
  titles.forEach((title) => {
    books.push({
      author: author.replace(/_/g, ' '),
      title: path.basename(title, '.png').replace(/_/g, ' '),
      imagePath: `/bookimages/${author}/${title}`,
    });
  });
});

fs.writeFileSync('./public/books.json', JSON.stringify(books));
