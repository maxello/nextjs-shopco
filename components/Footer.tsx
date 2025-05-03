import React from 'react';
import NewSletterForm from './NewSletterForm';
import Link from 'next/link';
import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import Image from 'next/image';


type ListItemProp = {
  label: string;
  link: string;
}

const FooterTitle = ({
  title
}: {
  title: string;
}) => (
  <h5 className="text-sm md:text-base text-primary uppercase font-medium tracking-[0.1875rem] mb-3 md:mb-5.5">{title}</h5>
)

const FooterList = ({
  list
}: {
  list: ListItemProp[]
}) => {
  return (
    <ul className="text-sm md:text-base flex flex-col gap-y-3.5">
      {list.map((item) => (
        <li key={item.label}>
          <Link href={item.link} className="after:transition-all after:hidden md:after:block after:duration-700 after:w-0 relative after:h-[1px] hover:after:w-full after:absolute after:-bottom-1 after:left-0 after:bg-primary">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const Footer = () => {
  const faqList: ListItemProp[] = [
    {
      label: "Account",
      link: "/"
    },
    {
      label: "Manage Deliveries",
      link: "/"
    },
    {
      label: "Orders",
      link: "/"
    },
    {
      label: "Payments",
      link: "/"
    },
  ];
  const resourcesList = [
    {
      label: "Free eBooks",
      link: "/"
    },
    {
      label: "Development Tutorial",
      link: "/"
    },
    {
      label: "How to - Blog",
      link: "/"
    },
    {
      label: "Youtube Playlist",
      link: "/"
    },
  ];
  
  const helpList = [
    {
      label: "Customer Support",
      link: "/"
    },
    {
      label: "Delivery Details",
      link: "/"
    },
    {
      label: "Terms & Conditions",
      link: "/"
    },
    {
      label: "Privacy Policy",
      link: "/"
    },
  ];
            
  const companyList = [
    {
      label: "About",
      link: "/"
    },
    {
      label: "Features",
      link: "/"
    },
    {
      label: "Works",
      link: "/"
    },
    {
      label: "Career",
      link: "/"
    },
  ];
  return (
    <footer>
      <div className="bg-linear-to-b from-50% from-transparent to-50% to-background-light">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-[1.3rem] px-6 py-8 md:py-9 md:px-16 grid md:grid-cols-2 items-center gap-4">
            <h2 className="font-[family-name:var(--font-integralcf)] uppercase text-[2rem] lg:text-[2rem] xl:text-[2.5rem] leading-[1.12] mb-4 md:mb-0">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
            <div className="lg:justify-self-end w-full lg:max-w-[350px]">
              <NewSletterForm />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background-light text-foreground">
        <div className="container py-6 md:py-10 md:flex gap-10 justify-between">
          <div className="lg:max-w-[20%]">
            <Link href={'/'} className="text-primary block font-[family-name:var(--font-integralcf)] text-[1.8rem] md:text-[2.2rem] leading-none mb-3 md:mb-6">SHOP.CO</Link>
            <p className="text-sm leading-[1.5] mb-4.5 md:mb-9">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
            <ul className="flex gap-3 mb-6 md:mb-0">
              <li>
                <Link href={'/'} aria-label="Twitter" className="transition-colors w-[28px] aspect-square overflow-hidden border border-border rounded-full flex justify-center items-center bg-primary-foreground hover:bg-primary hover:text-primary-foreground">
                  <Twitter size={12} strokeWidth={2.25} />
                </Link>
              </li>
              <li>
                <Link href={'/'} aria-label="Facebook" className="transition-colors w-[28px] aspect-square overflow-hidden border border-border rounded-full flex justify-center items-center bg-primary-foreground hover:bg-primary hover:text-primary-foreground">
                  <Facebook size={12} strokeWidth={2.25} />
                </Link>
              </li>
              <li>
                <Link href={'/'} aria-label="Instagram" className="transition-colors w-[28px] aspect-square overflow-hidden border border-border rounded-full flex justify-center items-center bg-primary-foreground hover:bg-primary hover:text-primary-foreground">
                  <Instagram size={12} strokeWidth={2.25} />
                </Link>
              </li>
              <li>
                <Link href={'/'} aria-label="Github" className="transition-colors w-[28px] aspect-square overflow-hidden border border-border rounded-full flex justify-center items-center bg-primary-foreground hover:bg-primary hover:text-primary-foreground">
                  <Github size={12} strokeWidth={2.25} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
          <div>
            <FooterTitle title={'Company'} />
            <FooterList list={companyList} />
          </div>
          <div>
            <FooterTitle title={'Help'} />
            <FooterList list={helpList} />
          </div>
          <div>
            <FooterTitle title={'FAQ'} />
            <FooterList list={faqList} />
          </div>
          <div>
            <FooterTitle title={'Resources'} />
            <FooterList list={resourcesList} />
          </div>
          </div>
        </div>
        <div className="container">
          <div className="border-t border-border md:flex items-center justify-between pt-4 md:pt-5 pb-10 md:pb-12">
            <p className="text-sm mb-3 md:mb-0 text-center md;text-left">Shop.co &copy; 2000-2025, All Rights Reserved</p>
            <ul className="flex items-center gap-3 justify-center md:justify-start">
              <li className="flex items-center justify-center w-[40px] h-[26px] md:w-[47px] md:h-[30px] p-1.5 rounded-md bg-background">
                <Image src={'/payment/visa.svg'} width={33} height={11} alt="Visa" />
              </li>
              <li className="flex items-center justify-center w-[40px] h-[26px] md:w-[47px] md:h-[30px] p-1.5 rounded-md bg-background">
                <Image src={'/payment/mastercard.svg'} width={33} height={11} alt="Visa" />
              </li>
              <li className="flex items-center justify-center w-[40px] h-[26px] md:w-[47px] md:h-[30px] p-1.5 rounded-md bg-background">
                <Image src={'/payment/paypal.svg'} width={33} height={11} alt="Visa" />
              </li>
              <li className="flex items-center justify-center w-[40px] h-[26px] md:w-[47px] md:h-[30px] p-1.5 rounded-md bg-background">
                <Image src={'/payment/apple-pay.svg'} width={33} height={11} alt="Visa" />
              </li>
              <li className="flex items-center justify-center w-[40px] h-[26px] md:w-[47px] md:h-[30px] p-1.5 rounded-md bg-background">
                <Image src={'/payment/google-pay.svg'} width={33} height={11} alt="Visa" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;