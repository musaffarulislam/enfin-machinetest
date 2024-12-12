import React, { FC } from 'react'
import Heading from './Heading'
import Result from './Result'
import { IAvailableSlot } from '@/heplers/types'

const AvailableSlot: FC<IAvailableSlot> = ({ results }) => {
  return (
    <>
      {results && (
        <div className='w-full flex flex-col gap-8 bg-tertiary rounded-xl md:rounded-2xl ld:rounded-3xl p-8 md:p-12 px-12 md:px-16 lg:px-20'>
            {Object.keys(results).length > 0 ? (
              <>
                <Heading title='Available Slot' />
                <Result results={results} />
              </>
            ) : (
              <Heading title='Not Available' />
            )}
        </div>
      )}
    </>
  )
}

export default AvailableSlot