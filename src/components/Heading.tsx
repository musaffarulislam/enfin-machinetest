import React from 'react'

const Heading = ({ title }: { title: string }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='heading'>{title}</div>
    </div>
  )
}

export default Heading