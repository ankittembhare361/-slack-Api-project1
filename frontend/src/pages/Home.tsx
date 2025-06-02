import { Button } from "../components/Button";
import { Sidebar } from "../components/Sidebar";

export const Home = () => { 
    const handleAuth = () => {
    window.location.href = 'http://localhost:3000/auth/slack';
  };
  const token = localStorage.getItem('slack_token');
    return (
        <div className="flex">
        <Sidebar/>
        <div className="max-w-96 ml-76 pb-10 flex flex-col items-center justify-center h-screen">
        <Button label={!token?"Authenticate with slack" : "Authenticated"} onClick={handleAuth}/>
        </div>
        </div>
    );
}