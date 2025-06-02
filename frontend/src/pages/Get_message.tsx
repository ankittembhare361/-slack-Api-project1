import React from "react";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";

export const Get_message = () => { 
  const [channel, setChannel] = React.useState('');
  type Message = {
     user: string; 
     text: string; 
     ts: string 
    };
  const [messages, setMessages] = React.useState<Message[]>([]);
   const fetchMessages = async () => {
    const res = await axios.get(`http://localhost:3000/slack/message/history`, {
      params: { channel }
    });
    const data = res.data as any;
    setMessages(data.messages);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-slate-200 justify-center shadow-md rounded-lg p-6 max-w-96">
     <InputBox type="text" label='Channel Id' placeholder='Enter channel id' onChange={(e:any) => setChannel(e.target.value)}/>
     <div className="p-2 justify-center flex">
     <Button label={"Get Messages"} onClick={fetchMessages}/>
     </div>
     <div>
       <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.user}</strong>: {msg.text} <br />
            <small>TS: {msg.ts}</small>
          </li>
        ))}
      </ul>
     </div>
      </div>
      </div>
    </div>
  
  );
}