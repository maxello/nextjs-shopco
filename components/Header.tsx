"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Input from './ui/Input';
import { ShoppingCart, CircleUserRound, Search, X, Menu } from "lucide-react";
import { cn } from '@/lib/utils';
import { useCartStore } from '@/hooks/useCartStore';
import { useWixClient } from '@/hooks/useWixClient';
import { usePathname } from 'next/navigation';

type NavigationProps = {
  label: string;
  link: string;
}

const Header = () => {
  const navigation: NavigationProps[] = [
    {
      label: 'Shop',
      link: '/'
    },
    {
      label: 'All Products',
      link: '/collections/all-products'
    },
    {
      label: 'Top Selling',
      link: '/collections/top-selling'
    },
    {
      label: 'Brands',
      link: '/'
    }
  ];
  const [menuOpened, setMenuOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const pathname = usePathname();

  /* CART */
  const wixClient = useWixClient();
  const { counter, getCart } = useCartStore();
  
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  /* \CART */
  return (
    <header className="bg-background text-primary top-0 sticky z-50">
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        <div className="container text-xs md:text-sm">
          Sign up and get 20% off to your first order. <Link href="/" className="underline underline-offset-4 decoration-[0.25px] hover:no-underline font-medium">Sign Up Now</Link>
        </div>
      </div>
      <div className="container ">
      <div className={cn("flex items-center lg:justify-between gap-4 lg:gap-10 py-4 md:py-6 relative", pathname !== "/" && "border-b border-border")}>
        <button type="button" onClick={() => setMenuOpened(!menuOpened)} className="relative lg:hidden inline-flex items-center justify-center rounded-md focus:outline-hidden" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          {menuOpened ? (
            <X strokeWidth={2.25} />
          ) : (
            <Menu strokeWidth={2.25} />
          )}
        </button>
        <Link href={'/'} className="block font-[family-name:var(--font-integralcf)] text-[1.575rem] lg:text-[2rem] leading-none pb-2">SHOP.CO</Link>
        {navigation.length > 0 && (
          <nav className={cn(menuOpened
            ? "visible opacity-100 scale-100 ease-out duration-200 border-y border-border lg:border-0 origin-top-right"
            : "invisible opacity-0 scale-95 lg:visible lg:opacity-100 lg:scale-100", "z-10 top-full -translate-y-[1px] lg:translate-y-0 transform inset-x-0 absolute transition lg:top-0 lg:relative")
          }>
            <div className="bg-background py-4 lg:py-0 text-center lg:text-left">
              <ul className="flex flex-col lg:flex-row flex-wrap items-center lg:space-x-6">
                {navigation.map(({ label, link }) => (
                  <li key={label} className="mb-2 lg:mb-0">
                    <Link onClick={() => setMenuOpened(false)} href={link} className="block text-xl p-2 lg:p-0 lg:text-[1rem] whitespace-nowrap after:transition-all after:hidden md:after:block after:duration-700 after:w-0 relative after:h-[2px] hover:after:w-full after:absolute after:-bottom-1 after:left-0 after:bg-primary">{label}</Link>
                  </li>
                ))}
              </ul>
              <button className="lg:hidden text-3xl leading-0 mx-auto p-2" onClick={() => setMenuOpened(false)} aria-label="Close mobile menu">
                <X strokeWidth={2.25} />
              </button>
            </div>
          </nav>
        )}
        <label htmlFor="search-input" className="hidden flex-grow bg-input rounded-full lg:flex space-x-3 py-3 px-4">
          <Search strokeWidth={2.25} className="text-muted-foreground" />
          <Input type="text" id="search-input" placeholder="Search for products..." />
        </label>
        <div className="flex items-center gap-x-3.5 w-full lg:w-auto justify-end">
          <button type="button" onClick={() => setSearchOpened(!searchOpened)} className="relative lg:hidden inline-flex items-center justify-center rounded-md focus:outline-hidden" aria-controls="mobile-menu" aria-expanded="false">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open mobile search</span>
            <Search strokeWidth={2.25} />
          </button>
          <Link href={'/cart'} className="min-w-[24px] min-h-[24px] relative" aria-label="cart">
            <ShoppingCart strokeWidth={2.25} />
            {counter > 0 && (
              <span className="absolute p-1 -top-1 -right-1 bg-destructive text-destructive-foreground text-[0.6rem] rounded-full w-4 h-4 flex items-center justify-center">
                {counter}
              </span>
            )}
          </Link>
          <Link href={'/profile'} className="min-w-[24px] min-h-[24px]" aria-label="profile">
            <CircleUserRound strokeWidth={2.25} />
          </Link>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header;