// pages/api/books/getBooks.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
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

  res.status(200).json(books);
}
