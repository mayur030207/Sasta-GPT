import React from 'react'

const History = ({chats}) => {
    
    console.log(chats)

  return (
      <div className="hidden md:flex items-center justify-center w-1/4 bg-zinc-800 text-zinc-100 rounded-r-3xl shadow-lg">
        <span className="absolute top-2 text-4xl font-extrabold text-zinc-100 ">
          History
        </span>
        <div className="border border-white min-h-[88%] min-w-[90%] mt-4 text-xl flex flex-col gap-[10px]">
            {chats.length === 0?<p>No chats yet..!</p>: chats.map((chat, index) =>(
                <p>{chat.userMsg}</p>
            ))}
        </div>
      </div>
  )
}

export default History
