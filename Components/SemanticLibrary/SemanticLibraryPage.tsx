import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, DropdownItemProps, Input, Progress } from 'semantic-ui-react';
import CardComponent from './CardComponent';
import AUTHOR_INFO from '../../data/author_data';

const defaultAuthor = "Random";

const SemanticLibraryPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeTab, setActiveTab] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(defaultAuthor);
    const [submittedSearchValue, setSubmittedSearchValue] = useState('');


    const handleAuthorChange = (e, { value }) => setSelectedAuthor(value);

    const handleSearchChange = (e, { value }) => {
        setSearchValue(value);
    };    

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSubmittedSearchValue(searchValue);
            handleSearchSubmit();
        }
    };
    
    const handleSearchSubmit = useCallback(async () => {
        if (submittedSearchValue.trim() !== '') {
            setIsLoading(true);
            const response = await fetch('/api/semantic-library', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: submittedSearchValue, author: selectedAuthor }),
            });
            if (response.ok) setData(await response.json());
            setIsLoading(false);
        }
    }, [submittedSearchValue, selectedAuthor]);
    
    
    const handleClick = (index, tab) => {
        setActiveIndex(index === activeIndex && tab === activeTab ? -1 : index);
        setActiveTab(tab === activeTab ? null : tab);
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

    const authorOptions: DropdownItemProps[] = [
        { text: defaultAuthor, value: defaultAuthor },
        ...AUTHOR_INFO.map(author => ({ text: author.id, value: author.id }))
    ];


    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
            {/* Introduction */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1>The Perfect Way to Find Your Next Read</h1>
                <p>Search book sections by semantic meaning. Then, delve deeper as you please!</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '30px auto' }}>
                {/* Author Dropdown */}
                <Dropdown 
                    button
                    basic
                    floating
                    options={authorOptions}
                    defaultValue='Random'
                    onChange={handleAuthorChange}
                    style={{ marginRight: '10px' }}
                />

                {/* Search Input */}
                <Input 
                    style={{ width: '100%' }}
                    action={{ icon: "search", color: "blue", onClick: handleSearchSubmit }}
                    placeholder="Type a topic or a query..."
                    size="large"
                    fluid
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
            </div>

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
                                summaries={data.summaries}
                                contents={data.contents}
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
};


export default SemanticLibraryPage;