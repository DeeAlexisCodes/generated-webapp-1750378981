import React from 'react';

const HeroSection = () => {
  return (
    <main className="py-12">
      <div className="w-full max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 gap-16 items-center md:grid-cols-2 md:text-left">
          <div className="text-center animate-fade-in [animation-delay:0.2s] [animation-fill-mode:backwards]">
            <h1 className="text-4xl md:text-5xl lg:text-[4.2rem] font-bold leading-tight mb-4 tracking-tight">
              AI-Powered <span className="font-normal text-gray-600">Doctor-Vetted</span> Review Generation
            </h1>
            <p className="text-lg sm:text-xl max-w-[550px] mx-auto mb-8 text-gray-600 md:mx-0">
              Transform product pages into authentic, clinically-informed reviews that build trust and drive conversions.
            </p>
            <a
              href="product_input.html"
              className="inline-block bg-orange-500 text-white py-4 px-8 rounded-xl no-underline text-lg font-bold transition-all duration-300 ease-in-out shadow-lg hover:bg-orange-600 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)]"
            >
              Get Started
            </a>
          </div>
          <div className="relative hidden min-h-[450px] perspective-[1000px] animate-fade-in [animation-delay:0.4s] [animation-fill-mode:backwards] md:block">
            <div id="visual-container">
              <div
                className="absolute will-change-transform transition-[transform] duration-200 ease-out w-[320px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-lg overflow-hidden"
                data-depth="0.1"
              >
                <img
                  src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="A friendly, professional doctor in a modern setting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute will-change-transform transition-[transform] duration-200 ease-out w-20 h-20 bg-white rounded-3xl shadow-md flex items-center justify-center animate-float top-[20%] left-[10%] [animation-delay:1s]"
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
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <div
                className="absolute will-change-transform transition-[transform] duration-200 ease-out bg-blue-50 text-blue-800 py-2 px-4 rounded-full font-medium shadow-md top-[15%] left-[70%] animate-float [animation-delay:0.5s]"
                data-depth="0.4"
              >
                Evidence-Based
              </div>
              <div
                className="absolute will-change-transform transition-[transform] duration-200 ease-out w-20 h-20 bg-white rounded-3xl shadow-md flex items-center justify-center animate-float top-[65%] left-[80%]"
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;