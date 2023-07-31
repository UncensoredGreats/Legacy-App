// OG Sublinks
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';

const BookPage = () => {
    const router = useRouter();
    const { bookId, cfi } = router.query;

    const viewerRef = useRef();
    const [rendition, setRendition] = useState(null);
    const [tocLinks, setTocLinks] = useState([]);

    useEffect(() => {
        if (bookId && viewerRef.current && !rendition) {
            const book = ePub(`/books/${bookId}.epub`);
            const rendition = book.renderTo(viewerRef.current, {
                width: '100%',
                height: '100%',
            });

            setRendition(rendition);

            book.loaded.navigation.then((navigation) => {
                let links = navigation.toc.map((entry) => {
                    return {
                        href: entry.href,
                        label: entry.label
                    };
                });
                setTocLinks(links);
            });

            if (typeof cfi === 'string') {
                rendition.display(cfi).catch((error) => console.error("Error displaying book: ", error));
            } else {
                rendition.display().catch((error) => console.error("Error displaying book: ", error)); // Display start of the book
            }

            // handle location change
            rendition.on("relocated", function (location) {
                console.log("Relocated to", location.start.cfi);
                router.replace(`/book/${bookId}?cfi=${location.start.cfi}`, undefined, { shallow: true });
            });
        }
    }, [bookId, cfi]);

    const handleTOCLinkClick = (tocHref) => {
        if (rendition) {
            rendition.display(tocHref);
        }
    };

    const handleNext = () => {
        if (rendition) {
            rendition.next();
        }
    };

    const handlePrev = () => {
        if (rendition) {
            rendition.prev();
        }
    };

    return (
        <div>
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
            <div ref={viewerRef} style={{ width: "100%", height: "600px" }} />
            <div>
                {tocLinks.map((link, index) => (
                    <button key={index} onClick={() => handleTOCLinkClick(link.href)}>
                        {link.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BookPage;


