import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Send_message } from "./pages/Send_message";
import { Get_message } from "./pages/Get_message";
import { Delete_message } from "./pages/Delete_message";



function App() {
  

  return (
    <div>
     <BrowserRouter>
    <Routes>
        <Route path="/" element ={< Home />} />
        <Route path="send-message" element ={ < Send_message />} />
        <Route path="get-message" element={ < Get_message />}/>
        <Route path="delete-message" element={ < Delete_message /> }/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App
