import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "./DateSelector.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEventsForDay } from '../../store/events';
import { receiveDate, selectedDate, setDate } from '../../store/ui';


const DateSelector = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectedDate);

    return (
        <DatePicker 
        showIcon
        selected={currentDate} 
        onChange={(e) => dispatch(receiveDate(e))}
        popperPlacement='bottom'
        minDate={new Date()}
        />
    )
}

export default DateSelector;