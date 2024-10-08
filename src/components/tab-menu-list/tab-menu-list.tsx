import React, { useRef, useState, useEffect } from 'react';


function TabMenuList() {

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkForOverflow = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0); // Show left arrow if scrolled away from the start
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth); // Show right arrow if not scrolled to the end
    }
  };

  const scrollTabs = (direction: 'left' | 'right'): void => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust as needed
      const maxScrollLeft = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      
      if (direction === 'left' && scrollContainerRef.current.scrollLeft > 0) {
        scrollContainerRef.current.scrollLeft = Math.max(scrollContainerRef.current.scrollLeft - scrollAmount, 0);
      } else if (direction === 'right' && scrollContainerRef.current.scrollLeft < maxScrollLeft) {
        scrollContainerRef.current.scrollLeft = Math.min(scrollContainerRef.current.scrollLeft + scrollAmount, maxScrollLeft);
      }
    }
    setTimeout(checkForOverflow, 100);
  };
  

  useEffect(() => {
    // Initial check when the component mounts
    checkForOverflow(); 
    // Add a listener for window resize to recheck overflow on resize
    window.addEventListener('resize', checkForOverflow);
    return () => {
      window.removeEventListener('resize', checkForOverflow);
    };
  }, []);

  return (
    <div className="overflow-hidden">
        <div className="absolute w-full h-full shadow-header display-none"></div>
        <div className="w-full left-0 top-full bg-white/40 backdrop-filter-blur z-10 overflow-auto relative flex lg:px-6 justify-center">
            {showLeftArrow && (<button className="flex items-center mx-2" onClick={() => scrollTabs('left')}>
                <img className="w-6 h-6" src="/assets/left-arrow.svg"/>
            </button>)}
            <div ref={scrollContainerRef} className="overflow-hidden flex px-4">
                <ul className="lg:container flex flex-nowrap lg:justify-between gap-4 py-4">
                    <li className="m-0 whitespace-nowrap lg:w-1/5 lg:max-w-[211px] text-primary uppercase border-solid border-b border-primary">
                        <button
                        className="unset-button hover:text-primary focus:text-primary whitespace-nowrap text-primary uppercase justify-center flex w-full hover:no-underline border-solid border-b-[3px] border-transparent hover:border-primary focus:border-primary">
                        Starters
                        </button>
                    </li>
                    <li className="m-0 whitespace-nowrap lg:w-1/5 lg:max-w-[211px] text-primary uppercase border-solid border-b border-primary">
                        <button
                        className="unset-button hover:text-primary focus:text-primary whitespace-nowrap text-primary uppercase justify-center flex w-full hover:no-underline border-solid border-b-[3px] border-transparent hover:border-primary focus:border-primary">
                        Chinese
                        </button>
                    </li>
                    <li className="m-0 whitespace-nowrap lg:w-1/5 lg:max-w-[211px] text-primary uppercase border-solid border-b border-primary">
                        <button
                        className="unset-button hover:text-primary focus:text-primary whitespace-nowrap text-primary uppercase justify-center flex w-full hover:no-underline border-solid border-b-[3px] border-transparent hover:border-primary focus:border-primary">
                        Main Course
                        </button>
                    </li>
                    <li className="m-0 whitespace-nowrap lg:w-1/5 lg:max-w-[211px] text-primary uppercase border-solid border-b border-primary">
                        <button
                        className="unset-button hover:text-primary focus:text-primary whitespace-nowrap text-primary uppercase justify-center flex w-full hover:no-underline border-solid border-b-[3px] border-transparent hover:border-primary focus:border-primary">
                        Snacks
                        </button>
                    </li>
                    <li className="m-0 whitespace-nowrap lg:w-1/5 lg:max-w-[211px] text-primary uppercase border-solid border-b border-primary">
                        <button
                        className="unset-button hover:text-primary focus:text-primary whitespace-nowrap text-primary uppercase justify-center flex w-full hover:no-underline border-solid border-b-[3px] border-transparent hover:border-primary focus:border-primary">
                        Beverages
                        </button>
                    </li>
                    <li className="m-0 whitespace-nowrap lg:w-1/5 lg:max-w-[211px] text-primary uppercase border-solid border-b border-primary">
                        <button
                        className="unset-button hover:text-primary focus:text-primary whitespace-nowrap text-primary uppercase justify-center flex w-full hover:no-underline border-solid border-b-[3px] border-transparent hover:border-primary focus:border-primary">
                        Desserts
                        </button>
                    </li>
                    <li className="m-0 whitespace-nowrap lg:w-1/5 lg:max-w-[211px] text-primary uppercase border-solid border-b border-primary">
                        <button
                        className="unset-button hover:text-primary focus:text-primary whitespace-nowrap text-primary uppercase justify-center flex w-full hover:no-underline border-solid border-b-[3px] border-transparent hover:border-primary focus:border-primary">
                        Salad
                        </button>
                    </li>
                    <li className="m-0 whitespace-nowrap lg:w-1/5 lg:max-w-[211px] text-primary uppercase border-solid border-b border-primary">
                        <button
                        className="unset-button hover:text-primary focus:text-primary whitespace-nowrap text-primary uppercase justify-center flex w-full hover:no-underline border-solid border-b-[3px] border-transparent hover:border-primary focus:border-primary">
                        Pizza
                        </button>
                    </li>
                </ul>
            </div>
            {showRightArrow && (<button className="flex items-center mx-2" onClick={() => scrollTabs('right')}>
                <img className="w-6 h-6" src="/assets/right-arrow.svg"/>
            </button>)}
        </div>
    </div>

  );
}

export default TabMenuList;