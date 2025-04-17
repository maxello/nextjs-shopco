import Breadcrumbs from '@/components/Breadcrumbs';
import Cart from '@/components/cart/Cart';
import React from 'react';

const CartPage = () => {
  const breadcrumbs = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Cart',
    }
  ]
  return (
    <div className="container py-6">
      <Breadcrumbs className="mb-3 md:mb-7" breadcrumbs={breadcrumbs} />
      <h1
        aria-label="Find clothes that matches your style"
        className="text-primary font-[family-name:var(--font-integralcf)] uppercase text-[2rem] sm:text-[2.5rem] leading-none mb-5.5 md:mb-6.5"
      >
        Your Cart
      </h1>
      <Cart />
    </div>
  )
}

export default CartPage;