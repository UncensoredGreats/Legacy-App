import React, { useState } from 'react';
import { Input, Icon, Segment, List, Button } from 'semantic-ui-react';

export default function SemanticLibraryPage() {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleSearchChange = (e, { value }) => {
        setSearchValue(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    }

    const handleSearchSubmit = async () => {
        const response = await fetch('/api/semantic-library', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: searchValue,
            }),
        });

        if (response.ok) {
            const resultData = await response.json();
            setData(resultData);
        }
    }

    const handleClick = (index) => {
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    }

    const handleReadBookClick = (currentAuthorId, currentTitle) => {
        const titleClustered = currentTitle.split(" ").join("_");
        const authorLink = currentAuthorId.split(" ").join("_");
    
        let bookUrl = '';
    
        // Check the authorId and decide the URL accordingly
        if (authorLink === "Grecko_Romans") {
            window.open("https://classics.mit.edu/Browse/index.html", '_blank');
        } else if (authorLink === "Carl_Jung") {
            window.open("https://archive.org/details/jung-carl-gustav-complete/01%20Psychiatric%20Studies/", '_blank');
        } else {
            bookUrl = `https://uncensoredgreatsebooks.s3.us-east-2.amazonaws.com/${authorLink}/${authorLink}@@${titleClustered}.epub`;
            let readerAppUrl = "https://www.semantic-library.com";
            let url = new URL(readerAppUrl);
            url.searchParams.set("bookPath", bookUrl);
            window.open(url.href, '_blank');
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', backgroundColor: '#f4f4f4' }}>
            
            {/* Search Input */}
            <Input 
                style={{ margin: '30px auto', width: '100%' }}
                action={{ icon: "search", color: "blue", onClick: handleSearchSubmit }}
                placeholder="Discover new articles..."
                size="large"
                fluid
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
            />

            {/* Data Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {data && data.titles.map((title, index) => {
                    const currentAuthor = data.authors[index];
                    const imagePath = `/images/${currentAuthor?.id}.png`;
                    
                    return (
                        <div key={title} style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 0px 15px rgba(0,0,0,0.1)', transition: '0.3s' }} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}>
                            <img src={imagePath} alt={`${currentAuthor?.id}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            
                            {/* Card Body */}
                            <div style={{ padding: '20px' }}>
                                <h2 style={{ color: activeIndex === index ? '#007bff' : '#333', fontSize: '1.3em', transition: '0.3s' }}>
                                    {title}
                                </h2>
                                
                                <p><em>Written by {currentAuthor?.id}</em></p>
                                {activeIndex === index && (
                                    <div>
                                        <p><strong>Page:</strong> {data.headings[index]}</p>
                                        <ul>
                                            {data.summaries[index].map((sentence, sIndex) => (
                                                <li key={sIndex} style={{ marginBottom: '10px' }}>
                                                    {sentence.trim()}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button icon onClick={() => handleReadBookClick(currentAuthor.id, title)} color='blue'>
                                            Read More
                                            <Icon name='arrow right' />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};