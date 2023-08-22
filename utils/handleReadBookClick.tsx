export const handleReadBookClick = (authorId: string, title: string) => {
    const titleClustered = title.split(" ").join("_");
    const authorLink = authorId.split(" ").join("_");

    console.log('Author Link:', authorLink);
    console.log('Title Clustered:', titleClustered);

    if (authorLink === "Grecko_Romans") {
        window.open("https://classics.mit.edu/Browse/index.html", '_blank');
    } else if (authorLink === "Carl_Jung") {
        window.open("https://archive.org/details/jung-carl-gustav-complete/01%20Psychiatric%20Studies/", '_blank');
    } else if (authorLink === "The_Bible") {
        window.open("https://www.semantic-library.com/?bookPath=https%3A%2F%2Funcensoredgreatsebooks.s3.us-east-2.amazonaws.com%2FThe_Bible%2FThe_Bible%40%40The_Bible.epub", '_blank');
    } else {
        const bookUrl = `https://uncensoredgreatsebooks.s3.us-east-2.amazonaws.com/${authorLink}/${authorLink}@@${titleClustered}.epub`;
        const readerAppUrl = "https://www.semantic-library.com";
        const url = new URL(readerAppUrl);
        url.searchParams.set("bookPath", bookUrl);
        window.open(url.href, '_blank');
        console.log(bookUrl);
    }

};
