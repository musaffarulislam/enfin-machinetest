import React, { FC, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'antd/dist/reset.css';
import { IDatePicker } from '@/heplers/types';
import Error from './Error';

const DateSelectorFiled: FC<IDatePicker> = ({ label, onDateChange, error }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); 

  const disablePastDates = (current: Dayjs) => {
    return current && current.isBefore(dayjs(), 'day'); 
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('DD/MM/YYYY'); 
      setSelectedDate(formattedDate); 
      onDateChange(formattedDate); 
    }
  };

  return (
    <div className='min-w-96'>
    <div className="bg-primary p-4">
      <DatePicker
        value={selectedDate ? dayjs(selectedDate, 'DD/MM/YYYY') : null}
        onChange={handleDateChange}
        disabledDate={disablePastDates}
        className="w-full mt-0 custom-datepicker border-0 !bg-primary font-semibold p-0 focus:outline-none focus:ring-transparent"
        placeholder={selectedDate ? undefined : label} 
        format="DD/MM/YYYY" 
      />
    </div>
      {error && <Error message={error} />}
    </div>
  );
};

export default DateSelectorFiled;
