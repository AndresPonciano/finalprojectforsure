import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {    
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 500){
          setVisible(true)
        } 
        else if (scrolled <= 500){
          setVisible(false)
        }
    }

    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
          /* you can also use 'auto' behaviour
             in place of 'smooth' */
        });
    };
      
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
    }, [])

    return (
        <div 
        className={ visible ? 'w-12 h-12 flex items-center justify-center fixed bg-sky-300 rounded bottom-16 right-8 text-gray-700 hover:bg-sky-800 hover:text-white' : 'block' }
        onClick={scrollToTop}
        >
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export default ScrollToTopButton;