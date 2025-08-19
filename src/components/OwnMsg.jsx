import React from 'react'

const OwnMsg = ({msg}) => {
  return (
    <div className="self-end p-4 md:mr-4 mr-1 mt-4 bg-zinc-800 md:text-xl text-sm rounded-2xl max-w-[60%]">
      <p className='text-white answer'>{msg}</p>
    </div>
  )
}

export default OwnMsg
