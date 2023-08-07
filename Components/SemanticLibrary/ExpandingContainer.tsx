import React from 'react';

function ExpandingContainer({ lastItem, active, tab, summaries, contents }) {
    return (
        <div style={{
            gridColumn: '1 / -1',
            maxHeight: active ? '300px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.5s ease-out',
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: '20px',
            boxShadow: '0px 0px 15px rgba(0,0,0,0.15)',
            zIndex: 10
        }}>
            {lastItem || active ? (
                <>
                    {tab === 'quotes' && (
                        <ul>
                            {summaries[active].map((sentence, sIndex) => (
                                <li key={sIndex} style={{ marginBottom: '10px' }}>{sentence.trim()}</li>
                            ))}
                        </ul>
                    )}
                    {tab === 'page' && <p>{contents[active]}</p>}
                </>
            ) : null}
        </div>
    );
}

export default ExpandingContainer;
