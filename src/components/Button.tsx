import React, { FC } from 'react'
import Loading from './Loading'
import { ButtonProps } from '@/heplers/types'

const Button: FC<ButtonProps> = ({ children, type="button", className, onClick, loading }) => {
  return (
    <button type={type} className={`bg-secondary text-white px-4 py-2 rounded-sm flex justify-center items-center font-semibold cursor-pointer ${className}`} 
        onClick={onClick}
    >
        {children}
        {loading && <Loading />}
    </button>
  )
}

export default Button