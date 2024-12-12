"use client"
import React, { FC, useState } from 'react'
import SelectionField from './SelectionField'
import { participantAvailability, participants, schedules } from '@/heplers/sampleData'
import DateSelectorFiled from './DateSelectorFiled'
import Button from './Button'
import { IForm } from '@/heplers/types'
import { checkParticipantAvailableSlots } from '@/heplers/hepler'

const Form: FC<IForm> = ({onResultsChange}) => {
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedError, setSelectedError] = useState<string | undefined>(undefined);
  const [startDateError, setStartDateError] = useState<string | undefined>(undefined);
  const [endDateError, setEndDateError] = useState<string | undefined>(undefined);
  const data = Object.entries(participants).map(([id, details]) => ({
    id: Number(id),
    name: details?.name,
  }))

  const handleCheckSlots = () => {
    console.log("Checking Slots", selectedParticipants, startDate, endDate);
    setSelectedError(undefined);
    setStartDateError(undefined); 
    setEndDateError(undefined);
    if (selectedParticipants.length && startDate && endDate) {
      const input = {
        participant_ids: selectedParticipants,
        date_range: { start: startDate, end: endDate }
      };
      const result = checkParticipantAvailableSlots(
        participants,
        participantAvailability, 
        schedules, 
        input
      );

      console.log("Result", result);
      onResultsChange(result);
      return
    }
    if (!selectedParticipants.length) {
      setSelectedError("Please select at least one participant");
    } else {
      setSelectedError(undefined);
    }
    if (!startDate) {
      setStartDateError("Please select a start date");
    } else {
      setStartDateError(undefined);
    }
    if (!endDate) {
      setEndDateError("Please select an end date");
    } else {
      setEndDateError(undefined);
    }
  };

  return (
    <div className='w-full flex flex-col justify-center items-center gap-8'>
      <SelectionField 
        label='Choose Participants' 
        data={data} 
        onSelectionChange={setSelectedParticipants} 
        error={selectedError}
      />
      <DateSelectorFiled
        label='Start Date'
        onDateChange={setStartDate}
        error={startDateError}
      />
      <DateSelectorFiled
        label='End Date'
        onDateChange={setEndDate}
        error={endDateError}
      />
      <Button className='min-w-96' onClick={handleCheckSlots}>
        Check Slots
      </Button>
    </div>
  )
}

export default Form