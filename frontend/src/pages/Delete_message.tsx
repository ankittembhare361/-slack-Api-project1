import React from 'react';
import axios from 'axios';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';

export const Delete_message = () => { 
  const [ts, setTs] = React.useState('');
  const [channel, setChannel] = React.useState('');

  const deleteMessage = async () => {
    await axios.post('http://localhost:3000/slack/message/delete', { channel, ts });
    alert('Message deleted!');
  };


  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-slate-200 justify-center shadow-md rounded-lg p-6 max-w-96">
     <InputBox type="text" label='Channel Id' placeholder='Enter channel id' onChange={(e:any) => setChannel(e.target.value)}/>
     <InputBox type="text" label='Timestamp' placeholder='Enter message timestamp' onChange={(e:any) => setTs(e.target.value)}/>
     <div className="p-2 justify-center flex">
     <Button label={"Get Messages"} onClick={deleteMessage}/>
     </div>
     </div>
    </div>
    </div>
  );
}