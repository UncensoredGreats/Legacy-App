import React, { useState } from 'react';
import { Checkbox, Accordion, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const SettingsBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    red: true,
    orange: true,
    green: true
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  const colorDescriptions = {
    red: "Loosely based on the Author",
    orange: "Strictly from the Author",
    green: "True to the Source"
  };

  const handleFilterChange = (color) => {
    const updatedFilters = { ...filters, [color]: !filters[color] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Accordion styled fluid>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleAccordionClick}
      >
        <Icon name='dropdown' />
        Apply Filters
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        {Object.keys(filters).map((color) => (
          <div key={color} style={{ margin: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{colorDescriptions[color]}</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{ 
                  width: '15px', 
                  height: '15px', 
                  backgroundColor: color, 
                  marginRight: '10px', 
                  borderRadius: '50%' 
                }} 
              />
              <Checkbox
                checked={filters[color]}
                onChange={() => handleFilterChange(color)}
              />
            </div>
          </div>
        ))}
      </Accordion.Content>
    </Accordion>
  );
};

export default SettingsBar;
