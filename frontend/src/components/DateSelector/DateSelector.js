import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "./DateSelector.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEventsForDay } from '../../store/events';
import { receiveDate, receiveEndDate, selectedDate, selectedEndDate, setDate, setMapReloadStatus } from '../../store/ui';


const DateSelector = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(selectedDate);
    const currentEndDate = useSelector(selectedEndDate);
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(currentEndDate);

		// const handleChange = (dates) => {
    //   const [start, end] = dates;
		// 	dispatch(receiveDate(start))
    //   dispatch(receiveEndDate(end))
		// 	dispatch(setMapReloadStatus(true));
		// }

    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      dispatch(receiveDate(start))
      dispatch(receiveEndDate(end))
			dispatch(setMapReloadStatus(true));
    };

    return (
      <DatePicker 
        showIcon
        popperPlacement='bottom'
        minDate={new Date()}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    )
}

export default DateSelector;