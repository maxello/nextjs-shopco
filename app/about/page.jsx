import React from 'react';

const AboutPage = () => {
  return (
    <div className="container grid md:grid-cols-2 items-center md:gap-6 overflow-hidden">
      <div className="py-7 md:py-5">
        <h1
          aria-label="Find clothes that matches your style"
          className="text-primary font-[family-name:var(--font-integralcf)] uppercase text-[2.25rem] sm:text-[3rem] sm:text-center md:text-left md:text-[2.5rem] xl:text-[4rem] leading-none mb-3 md:mb-6"
        >
          About
        </h1>
      </div>
    </div>
  )
}

export default AboutPage;