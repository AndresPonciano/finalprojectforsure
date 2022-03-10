import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {    
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
          setVisible(true)
        } 
        else if (scrolled <= 300){
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
        className={ visible ? 'inline bg-green-500 sticky z-10' : 'block' }
        onClick={scrollToTop}
        >
            scroll to top button
        </div>
    )
}

export default ScrollToTopButton;