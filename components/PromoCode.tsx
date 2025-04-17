import React from 'react';
import { Tag } from 'lucide-react';
import Input from "@/components/ui/Input";
import Button from './ui/Button';

const PromoCode = () => {
  return (
    <form action="" className="flex items-center gap-3">
      <label htmlFor="discount-input" className="flex-grow bg-input items-center px-4 rounded-full flex space-x-3 h-12">
        <Tag strokeWidth={2.25} className="text-muted-foreground" />
        <Input type="text" id="discount-input" placeholder="Add promo code" />
      </label>
      <Button type="submit" className="max-w-[30%] lg:max-w-[26%] text-sm md:text-base" size={'smx'}>Apply</Button>
    </form>
  )
}

export default PromoCode;