const App = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="fixed left-0 top-0 flex h-16 w-full items-center bg-white px-8 shadow-sm">
                <div>
                    <input
                        type="text"
                        className="block w-72 rounded-3xl border-none bg-gray-100 py-2 text-base text-gray-600 shadow focus:outline-none"
                    />
                </div>
            </nav>
        </div>
    );
};

export default App;
