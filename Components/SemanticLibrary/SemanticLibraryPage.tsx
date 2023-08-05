
// OG 

import React, { useState } from 'react';
import { Input, Progress } from 'semantic-ui-react';
import PopupButtons from './PopupButtons';
import CardComponent from './CardComponent';

export default function SemanticLibraryPage() {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeTab, setActiveTab] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchChange = (e, { value }) => {
        setSearchValue(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    }

    const handleSearchSubmit = async () => {
        setIsLoading(true);
        const response = await fetch('/api/semantic-library', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: searchValue }),
        });

        if (response.ok) {
            const resultData = await response.json();
            setData(resultData);
        }
        setIsLoading(false);
    }

    const handleClick = (index, tab) => {
        if (activeIndex === index && activeTab === tab) {
            setActiveIndex(-1);
            setActiveTab(null);
        } else {
            setActiveIndex(index);
            setActiveTab(tab);
        }
    }
    

    const handleReadBookClick = (currentAuthorId, currentTitle) => {
        const titleClustered = currentTitle.split(" ").join("_");
        const authorLink = currentAuthorId.split(" ").join("_");

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

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
            {/* Introduction */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1>The Best Way to Find Your Next Read</h1>
                <p>Search book sections by semantic meaning. Then, delve deeper as you please!</p>
            </div>

            {/* Search Input */}
            <Input 
                style={{ margin: '30px auto', width: '100%' }}
                action={{ icon: "search", color: "blue", onClick: handleSearchSubmit }}
                placeholder="Type a topic or a query..."
                size="large"
                fluid
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
            />

            {/* Progress Bar */}
            {isLoading && <Progress percent={100} indicating />}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', position: 'relative' }}>
                {data && data.titles.map((title, index) => {
                    const currentAuthor = data.authors[index];
                    const imagePath = `/images/${currentAuthor?.id}.png`;
                    
                    return (
                        <React.Fragment key={title}>
                            {/* Main Card */}
                            <CardComponent
                                currentAuthor={currentAuthor}
                                title={title}
                                imagePath={imagePath}
                                heading={data.headings[index]}
                                index={index}
                                isActive={activeIndex === index}
                                handleClick={handleClick}
                                handleReadBookClick={handleReadBookClick}
                            />
    
                            {/* Expanding Container */}
                            {(index === data.titles.length - 1 || activeIndex === index) && (
                                <div style={{ gridColumn: '1 / -1', maxHeight: activeIndex === index ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease-out', backgroundColor: 'rgba(255,255,255,0.9)', padding: '20px', boxShadow: '0px 0px 15px rgba(0,0,0,0.15)', zIndex: 10 }}>
                                    {activeTab === 'quotes' && (
                                        <ul>
                                            {data.summaries[activeIndex].map((sentence, sIndex) => (
                                                <li key={sIndex} style={{ marginBottom: '10px' }}>{sentence.trim()}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {activeTab === 'page' && <p>{data.contents[activeIndex]}</p>}
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}




                // return (
                //     <React.Fragment key={title}>
                //         {/* Main Card */}
                //         <div style={{ backgroundColor: '#f9f7f4', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 0px 15px rgba(0,0,0,0.15)', transition: 'transform 0.3s', position: 'relative', paddingBottom: '80px' }}>
                //                 <img src={imagePath} alt={`${currentAuthor?.id}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                //                 <div style={{ padding: '20px' }}>
                //                     <h2 style={{ fontSize: '1.3em', marginBottom: '20px' }}>{title}</h2>
                //                     <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                //                         <p><em>{currentAuthor?.id} | Page {data.headings[index]}</em></p>
                //                         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                //                             <Popup content="View key sentences" trigger={<Icon name='quote left' size='large' onClick={() => handleClick(index, 'quotes')} />} />
                //                             <Popup content="Read snippet" trigger={<Icon name='file text' size='large' onClick={() => handleClick(index, 'page')} />} />
                //                             <Popup content="Read the whole book" trigger={<Icon name='book' size='large' onClick={() => handleReadBookClick(currentAuthor.id, title)} />} />
                //                         </div>
                //                     </div>
                //                 </div>
                //             </div>
            
                //         {/* Conditionally render the Expanding Container */}
                //         {(index === data.titles.length - 1 || activeIndex === index) && (
                //             <div style={{ gridColumn: '1 / -1', maxHeight: activeIndex === index ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease-out', backgroundColor: 'rgba(255,255,255,0.9)', padding: '20px', boxShadow: '0px 0px 15px rgba(0,0,0,0.15)', zIndex: 10, position: 'absolute', width: '100%' }}>
                //                 {activeTab === 'quotes' && (
                //                     <ul>
                //                         {data.summaries[activeIndex].map((sentence, sIndex) => (
                //                             <li key={sIndex} style={{ marginBottom: '10px' }}>{sentence.trim()}</li>
                //                         ))}
                //                     </ul>
                //                 )}
                //                 {activeTab === 'page' && <p>{data.contents[activeIndex]}</p>}
                //             </div>
                //         )}
                //     </React.Fragment>
                // );
                  
