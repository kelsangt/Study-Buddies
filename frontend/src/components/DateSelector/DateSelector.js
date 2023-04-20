import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "./DateSelector.css";
import { useDispatch } from 'react-redux';
import { fetchAllEventsForDay } from '../../store/events';


const DateSelector = () => {
    const [chosenDate, setChosenDate] = useState(new Date());
    const dispatch = useDispatch();

    const handleSelectedDate = () => {
        dispatch(fetchAllEventsForDay(chosenDate.toISOString().split("T")[0]))
    }

    return (
        <DatePicker 
        showIcon
        selected={chosenDate} 
        onChange={(date) => setChosenDate(date)}
        onSelect={handleSelectedDate}
        popperPlacement='bottom'
        />
    )
}

export default DateSelector;