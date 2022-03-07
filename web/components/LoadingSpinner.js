const LoadingSpinner = () => {

    return (
        <div className="flex items-center justify-center m-8">
        Loading...
        <div className="animate-spin border-2 border-purple-500 border-t-transparent border-solid rounded-full w-6 h-6 ml-2"></div>
      </div>
    )
}

export default LoadingSpinner;