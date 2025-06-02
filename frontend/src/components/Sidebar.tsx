export const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
                <li><a href="/" className="hover:text-gray-400">Home</a></li>
                <li><a href="/send-message" className="hover:text-gray-400">Send Message</a></li>
                <li><a href="/get-message" className="hover:text-gray-400">Get Message</a></li>
                <li><a href="/delete-message" className="hover:text-gray-400">Delete Message</a></li>
            </ul>
        </div>
    );
}