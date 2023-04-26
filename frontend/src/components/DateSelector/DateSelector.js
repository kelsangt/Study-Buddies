import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "./DateSelector.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEventsForDay } from '../../store/events';
import { receiveDate, selectedDate, setDate, setMapReloadStatus } from '../../store/ui';


const DateSelector = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectedDate);

		const handleChange = (e) => {
			dispatch(receiveDate(e))
			dispatch(setMapReloadStatus(true));
		}

    return (
        <DatePicker 
        showIcon
        selected={currentDate} 
        onChange={(e) => handleChange(e)}
        popperPlacement='bottom'
        minDate={new Date()}
        />
    )
}

export default DateSelector;