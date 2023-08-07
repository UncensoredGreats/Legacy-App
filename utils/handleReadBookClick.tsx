export const handleReadBookClick = (authorId: string, title: string) => {
    const titleClustered = title.split(" ").join("_");
    const authorLink = authorId.split(" ").join("_");

    if (authorLink === "Grecko_Romans") {
        window.open("https://classics.mit.edu/Browse/index.html", '_blank');
    } else if (authorLink === "Carl_Jung") {
        window.open("https://archive.org/details/jung-carl-gustav-complete/01%20Psychiatric%20Studies/", '_blank');
    } else {
        const bookUrl = `https://uncensoredgreatsebooks.s3.us-east-2.amazonaws.com/${authorLink}/${authorLink}@@${titleClustered}.epub`;
        const readerAppUrl = "https://www.semantic-library.com";
        const url = new URL(readerAppUrl);
        url.searchParams.set("bookPath", bookUrl);
        window.open(url.href, '_blank');
    }
};
