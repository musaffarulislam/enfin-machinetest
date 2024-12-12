import React, { FC } from 'react'
import { IAvailableSlot } from '@/heplers/types'

const Result: FC<IAvailableSlot> = ({results}) => {
  return (
    <div className='w-full mt-4 flex flex-col gap-4'>
        {Object.entries(results).map(([date, slots]) => {
            return (
                <div key={date} className='flex  items-center gap-4'>
                    <div className='text-xl'>{date}</div>
                    <div className='text-xl'>:</div>
                    <div className='flex flex-wrap gap-4 items-center'>
                        {slots.map((slot, index) => {
                            return (
                                <div key={index} className='bg-secondary text-lg rounded-full p-2 px-4 text-background'>{slot}</div>
                            )
                        })}
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Result