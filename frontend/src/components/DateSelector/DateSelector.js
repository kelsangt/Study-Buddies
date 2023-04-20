import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "./DateSelector.css";
import { useDispatch } from 'react-redux';


const DateSelector = () => {
    const [chosenDate, setChosenDate] = useState(new Date());
    const dispatch = useDispatch();

    const handleSelectedDate = () => {
        
    }

    return (
        <DatePicker 
        selected={chosenDate} 
        onChange={(date) => setChosenDate(date)}
        onSelect={handleSelectedDate}
        popperPlacement='bottom'
        />
    )
}

export default DateSelector;