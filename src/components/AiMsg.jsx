import React from 'react'
import ReactMarkdown from "react-markdown";

const AiMsg = ({res}) => {
  return (
    <div className="self-start p-4 md:ml-4 ml-1 mt-4 bg-zinc-600 md:text-xl text-sm rounded-2xl max-w-[80%] h-fit">
      <div className='text-white'><ReactMarkdown>{res?res:"Loading..."}</ReactMarkdown></div>
    </div>
  )
}

export default AiMsg
