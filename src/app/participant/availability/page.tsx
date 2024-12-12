"use client"

import AvailableSlot from '@/components/AvailableSlot'
import Form from '@/components/Form'
import Heading from '@/components/Heading'
import React, { useState } from 'react'

const AvailableSlotPage = () => {
  const [results, setResults] = useState<{ [date: string]: string[] } | undefined>(undefined);
  
  return (
    <div className='w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 py-12'>
      <Heading title='Check Availabitity' />
      <Form onResultsChange={setResults} />
      <AvailableSlot results={results} />
    </div>
  )
}

export default AvailableSlotPage