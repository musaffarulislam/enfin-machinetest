"use client"
import ArrowDownIcon from '@/assets/ArrowDwon';
import { ISelectionField } from '@/heplers/types';
import React, { FC, useState } from 'react'
import Error from './Error';

const SelectionField: FC<ISelectionField> = ({
  label = "Select the options", 
  data, 
  onSelectionChange,
  error
}) => {
  const [selectionDropdown, setSelectionDropDown] = useState<boolean>(false)
  const [selected, setSelected] = useState<number[]>([])

  const handleDropDown = () => {
    setSelectionDropDown(!selectionDropdown)
  }

  const handleSelectionField = (id: number) => {
    const newSelection = selected.includes(id)
      ? selected.filter(selectedId => selectedId !== id)
      : [...selected, id];
    setSelected(newSelection)
    onSelectionChange(newSelection)
  }

  return (
    <div className='flex flex-col min-w-96'>
      <div
        className='w-full bg-primary p-4 flex justify-between items-center'
        onClick={handleDropDown}
      >
        <span>
          {selected.length > 0
            ? `${selected.length} item(s) selected`
            : label
          }
        </span>
        <div className={`${selectionDropdown && "rotate-180"} transition-all ease-in-out duration-300`}>
          <ArrowDownIcon />
        </div>
      </div>
      {selectionDropdown && (
        <div className='w-full mt-4 bg-primary p-4 flex flex-col'>
          {data.length > 0 ? ( data.map((details) => (
            <div key={details.id} className='flex items-center gap-4 mb-3'>
              <label className='flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  id={String(details.id)}
                  checked={selected.includes(details.id)}
                  onChange={() => handleSelectionField(details.id)}
                  className='hidden'
                />
                <span
                  className={`
                    w-6 h-6 border-2 rounded-md mr-3 flex items-center justify-center
                    ${selected.includes(details.id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-400'}
                    transition-all duration-200 ease-in-out
                  `}
                >
                  {selected.includes(details.id) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className='text-base'>{details.name}</span>
              </label>
            </div>  
          ))) : (
            <div className='flex items-center justify-center text-red-500'>
              <span className='text-base'>No data available</span>
            </div>
          )}
        </div>
      )}
      {error && <Error message={error} />}
    </div>
  )
}

export default SelectionField