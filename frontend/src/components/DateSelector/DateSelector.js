import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "./DateSelector.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEventsForDay } from '../../store/events';
import { selectedDate, setDate } from '../../store/ui';


const DateSelector = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectedDate);

    const handleSelectedDate = (date) => {
        console.log('fetching events')
        dispatch(setDate(date))
        dispatch(fetchAllEventsForDay(currentDate))
    }

    return (
        <DatePicker 
        showIcon
        selected={currentDate} 
        onChange={(date) => handleSelectedDate(date)}
        onSelect={(date) => handleSelectedDate(date)}
        popperPlacement='bottom'
        />
    )
}

export default DateSelector;