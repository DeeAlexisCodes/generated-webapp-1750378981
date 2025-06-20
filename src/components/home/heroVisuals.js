import React, { useEffect, useRef } from 'react';

function HeroVisuals() {
  const visualContainerRef = useRef(null);

  useEffect(() => {
    const visualContainer = visualContainerRef.current;

    const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = prefersReducedMotionQuery.matches;

    if (visualContainer && !prefersReducedMotion) {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const heroRect = visualContainer.getBoundingClientRect();
        const x = (clientX - heroRect.left - heroRect.width / 2) / (heroRect.width / 2);
        const y = (clientY - heroRect.top - heroRect.height / 2) / (heroRect.height / 2);

        const elements = visualContainer.querySelectorAll('.visual-element');
        elements.forEach(el => {
          const depth = parseFloat(el.getAttribute('data-depth'));
          const moveX = -x * (depth * 25);
          const moveY = -y * (depth * 25);
          
          if (el.classList.contains('image-bubble')) {
            el.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
          } else {
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
          }
        });
      };

      visualContainer.addEventListener('mousemove', handleMouseMove);

      return () => {
        visualContainer.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []); 

  return (
    <div
      ref={visualContainerRef}
      className="relative hidden min-h-[450px] animate-fade-in [animation-delay:0.4s] md:block"
    >
      <div
        className="visual-element image-bubble absolute will-change-transform transition-transform duration-200 ease-out 
                   w-[320px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[24px] shadow-xl overflow-hidden"
        data-depth="0.1"
      >
        <img
          src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="A friendly, professional doctor in a modern setting"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="visual-element icon-bubble icon-bubble--graph absolute will-change-transform transition-transform duration-200 ease-out 
                   w-20 h-20 bg-white rounded-[24px] shadow-md flex items-center justify-center animate-float [animation-delay:1s] 
                   top-[20%] left-[10%]"
        data-depth="0.3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 text-orange-500"
        >
          <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
        </svg>
      </div>
      <div
        className="visual-element text-bubble absolute will-change-transform transition-transform duration-200 ease-out 
                   bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium shadow-md animate-float [animation-delay:0.5s] 
                   top-[15%] left-[70%]"
        data-depth="0.4"
      >
        Evidence-Based
      </div>
      <div
        className="visual-element icon-bubble icon-bubble--shield absolute will-change-transform transition-transform duration-200 ease-out 
                   w-20 h-20 bg-white rounded-[24px] shadow-md flex items-center justify-center animate-float 
                   top-[65%] left-[80%]"
        data-depth="0.2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 text-orange-500"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
    </div>
  );
}

export default HeroVisuals;