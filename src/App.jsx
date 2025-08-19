import "./App.css";
import { Fragment, useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import OwnMsg from "./components/OwnMsg";
import AiMsg from "./components/AiMsg";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [Input, setInput] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) {
      setChats(JSON.parse(saved));
    }
  }, []);

  const saveLS = (chatArray) => {
    localStorage.setItem("chatHistory", JSON.stringify(chatArray));
  };

  const handleInput = async (e) => {
    e.preventDefault();
    setChats([...chats, { userMsg: Input, res: null }]);
    // saveLS([...chats, { userMsg: Input, res: null }])
    const currentMsg = Input;
    setInput("");

    let a = await main(currentMsg);
    saveLS([...chats, { userMsg: Input, res: a }]);
    setChats((prev) =>
      prev.map((chat, i) =>
        i === prev.length - 1 ? { ...chat, res: a } : chat
      )
    );
  };

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAsoFZ4EyzCLOTiPB_3Vs4ohjr3xOTrcSI",
  });

  async function main(Que) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: Que,
    });
    return response.text;
  }

  return (
    <div className="min-h-screen flex bg-zinc-950 relative">
      {/* History side */}
      {/* <History chats={chats}/> */}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-[95%] bg-zinc-950 rounded-l-3xl shadow-xl">
        <span
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Are you really want to Delete the CHAT!!")) {
              localStorage.clear();
              document.location.reload();
            }
          }}
          className="bg-zinc-700 text-zinc-100 font-semibold md:px-10 text-center py-2 px-5 md:text-2xl rounded-full hover:bg-zinc-600 transition cursor-pointer absolute left-2 top-5 z-20"
        >
          <MdDeleteForever />
        </span>
        <h1 className="text-4xl font-extrabold text-center mt-0 sticky top-0 bg-black z-10 py-4 rounded-xl">
          <span className="gemini-gradient">Geminee</span>
        </h1>

        <div className="flex-1 overflow-y-auto answer px-6 py-4 max-h-[75vh]">
          <div className="flex flex-col gap-3 text-wrap text-[0.5rem]">
            {chats.map((chat, index) => {
              return (
                <Fragment key={index}>
                  <OwnMsg msg={chat.userMsg} />
                  <AiMsg res={chat.res} />
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Input Area */}
        <form
          className="flex items-center bg-zinc-800 rounded-full mx-auto md:mb-3 mb-14 w-screen md:w-4/5 p-2 shadow-lg absolute bottom-5 md:left-35"
          onSubmit={handleInput}
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={Input}
            type="text"
            placeholder="Ask me anything...!!"
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-400 outline-none px-4 py-2"
          />
          <button
            type="submit"
            className="bg-zinc-700 text-zinc-100 font-semibold md:px-10 text-center py-2 px-5 md:text-2xl rounded-full hover:bg-zinc-600 transition cursor-pointer absolute right-2"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
