import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Default styles
import 'react-date-range/dist/theme/default.css'; // Default theme styles
import './custom_style.css';

export default function NewTest() {
  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });



  const handleSelect = (ranges) => {
    setSelection(ranges.selection);
  };
  const datesWithinRange = [];
  const getDatesWithinRange = () => {
    const { startDate, endDate } = selection;

    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      datesWithinRange.push(formattedDate);
  
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesWithinRange;
  };
  
  console.log(datesWithinRange);


  return (
    <div>
      <DateRange
        ranges={[selection]}
        onChange={handleSelect}
        showSelectionPreview={false}
      />
      <div>
        <h2>Selected Range:</h2>
        <p>Start Date: {selection.startDate.toISOString().split('T')[0]}</p>
        <p>End Date: {selection.endDate.toISOString().split('T')[0]}</p>
      </div>
      <div>
        <h2>Clicked Dates:</h2>
        <ul>
          {getDatesWithinRange().map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
