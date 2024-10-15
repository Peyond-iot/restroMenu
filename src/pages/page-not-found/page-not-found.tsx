
function PageNotFound(){
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
            <button 
                onClick={() => window.location.href = '/'}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Go to Home
            </button>
        </div>

    )
}

export default PageNotFound;