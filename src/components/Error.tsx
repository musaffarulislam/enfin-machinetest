import { IError } from '@/heplers/types'
import React, { FC } from 'react'

const Error: FC<IError> = ({message = "Something went wrong"}) => {
  return (
    <span className='text-red-500 text-sm'>{message}</span>
  )
}

export default Error