import React from 'react';
import axios from 'axios';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';

export const Send_message = () => {
  const [isScheduled, setIsScheduled] = React.useState(false); // State to toggle between send and schedule
  const [channel, setChannel] = React.useState('');
  const [text, setText] = React.useState('');
  const [ts, setTs] = React.useState(''); // Timestamp for edit/delete
  const [scheduledTime, setScheduledTime] = React.useState('');
  const [update, setUpdate] = React.useState(false); // State to trigger re-render

  const sendMessage = async () => {
    const res = await axios.post('http://localhost:3000/slack/message/send', { channel, text });
    alert('Message sent!');
    const data = res.data as any;
    setTs(data.ts); // Save timestamp for edit/delete
  };
   
  const scheduleMessage = async () => {
  const unixTime = Math.floor(new Date(scheduledTime).getTime() / 1000);
  await axios.post('http://localhost:3000/slack/message/schedule', { channel, text, post_at: unixTime });
  alert('Message scheduled!');
  };

  const editMessage = async () => {
    await axios.post('http://localhost:3000/slack/message/edit', { channel, ts, text });
    alert('Message edited!');
  };
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-slate-200 justify-center shadow-md rounded-lg p-6 max-w-96">
      <h1 className="text-2xl font-bold mb-4 justify-center flex">{!update?"Send Message": "Update Message"}</h1>
      {update? null :<div className="flex items-center">
      <input type="checkbox" checked={isScheduled} onClick={() => setIsScheduled(!isScheduled)}/>
      <div>Schedule Message</div>
      </div>}
      <InputBox type="text" label='Channel Id' placeholder='Enter channel id' onChange={(e:any) => setChannel(e.target.value)}/>
      <textarea placeholder='Enter message' className="mt-4 w-80 px-2 py-1 border rounded border-black-200" onChange={(e) => setText(e.target.value)}/>
      {update?<InputBox type="text" label="Time Stamp" placeholder="Message Timestamp for edit" value={ts} onChange={e => setTs(e.target.value)} />: null}
      {isScheduled ? <div><InputBox type="datetime-local" label="Set Time" onChange={(e) => setScheduledTime(e.target.value)}/></div> : null}
      <div>
        {!update? "Update the old message click": "click to :"} <a className="text-blue-500 underline" onClick={() => setUpdate(!update)}>{update? "send message": "update message"}</a>
      </div>
      <div className="pt-4 justify-center flex">
      {update ?
           <Button label={"Update"} onClick={editMessage}/>:
           <Button label={"Send"} onClick={isScheduled? sendMessage: scheduleMessage}
        />}
      </div>
      </div>
      </div>
    </div>
  );
}