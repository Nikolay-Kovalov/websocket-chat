import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import {BsSend} from "react-icons/bs"

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [loading, sendMessage] = useSendMessage();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if(!message) return;
        await sendMessage(message);
        setMessage("")
    }
    const handleInputChange = (evt) => {
        setMessage(evt.target.value)
    }
;
    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                value={message}
                onChange={handleInputChange}
                 type="text"
                 className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                 placeholder="Send a message"
                 />
                 <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    {loading ? <div className="loading loading-spinner"></div> : <BsSend/>}
                 </button>
            </div>
        </form>
    )
}

export default MessageInput;