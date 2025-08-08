import Button from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  const featuresList = [
    {
      label: "Home Page",
      description:
        "A visually appealing landing page that introduces the brand and showcases featured products.",
    },
    {
      label: "Dynamic Product Page",
      description:
        "Each product has its own dedicated page with detailed information, images, and an option to add to the cart.",
    },
    {
      label: "Dynamic Collection Page",
      description:
        "Users can browse through various collections with filtering options to easily find products based on colors, sizes, and price.",
    },
    {
      label: "Shopping Cart",
      description:
        "A user-friendly cart interface that allows customers to modify the quantity of products, remove items, and view the total price before proceeding to checkout.",
    },
    {
      label: "Responsive Design",
      description:
        "The application is fully responsive, ensuring a smooth experience on both desktop and mobile devices.",
    },
  ];

  const technologiesList = [
    {
      label: "Wix Studio Service",
      description:
        "Utilized as the backend database for product management, providing methods for efficient data handling and retrieval.",
    },
    {
      label: "Next.js",
      description: "For server-side rendering and optimized performance.",
    },
    {
      label: "Tailwind CSS",
      description:
        "A utility-first CSS framework used for styling the application, allowing for rapid design and customization.",
    },
    {
      label: "Framer Motion",
      description:
        "A library for animations in React, used to enhance user interactions and create smooth transitions throughout the application.",
    },
  ];
  return (
    <div className="container">
      <div className="py-7 md:py-5">
        <h1
          aria-label="Find clothes that matches your style"
          className="text-primary font-[family-name:var(--font-integralcf)] uppercase text-[2.25rem] sm:text-[3rem] sm:text-center md:text-left md:text-[2.5rem] xl:text-[4rem] leading-none mb-3 md:mb-6"
        >
          About
        </h1>
        <h2 className="text-2xl font-medium mb-2">Overview</h2>
        <p className="mb-8">
          This resume project is an E-commerce shop specialized in clothing
          sales, designed to provide users with a seamless shopping experience.
          The{" "}
          <a
            href="https://www.figma.com/design/1xI60QXaw8BAvNCFyi4t8a/E-commerce-Website-Template--Freebie---Community-?node-id=1-2&t=3vmM5aWFsruwb0Sn-0"
            className="font-medium underline"
          >
            Figma design
          </a>{" "}
          is based on a layout created by{" "}
          <a
            href="https://www.figma.com/@hamzauix"
            className="font-medium underline"
          >
            Hamza Naeem
          </a>
          . The project showcases my skills as a frontend developer and is a
          valuable addition to my CV.
        </p>
        <div className="grid lg:grid-cols-2 gap-5 mb-8 max-w-[500px] lg:max-w-full">
          <div className="w-full rounded-3xl bg-primary text-primary-foreground p-5 md:p-7">
            <h2 className="text-2xl font-medium mb-6 md:mb-8">Features</h2>
            <div className="mb-8">
              {featuresList?.map((feature) => (
                <div
                  key={feature.label}
                  className="mb-4 pb-2 last:mb-0 last:pb-0 max-w-[500px]"
                >
                  <div className="space-y-1">
                    <p className="font-medium leading-none mb-2">
                      {feature.label}
                    </p>
                    <p className="text-sm md:text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full rounded-3xl bg-primary text-primary-foreground p-5 md:p-7">
            <h2 className="text-2xl font-medium mb-6 md:mb-8">Technologies Used</h2>
            <div className="mb-8">
              {technologiesList?.map((feature) => (
                <div
                  key={feature.label}
                  className="mb-4 items-start pb-2 last:mb-0 last:pb-0 max-w-[500px]"
                >
                  
                  <div className="space-y-1">
                    <p className="font-medium leading-none mb-2 text-lg">
                      {feature.label}
                    </p>
                    <p className="text-sm md:text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button className="mb-8 max-w-[200px] mx-auto">
            <Link href={'/'}>Go to Home Page</Link>
          </Button>
          <p className="mb-6 font-semibold">Thank you for your attention!<span className="text-primary">❤️</span></p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
