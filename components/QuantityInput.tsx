import React from 'react';
import { Plus, Minus } from 'lucide-react';
import clsx from 'clsx';

const QuantityInput = ({
  quantity, 
  handleQuantity,
  isDecrementDisabled = false,
  isIncrementDisabled = false,
  size
}: {
  quantity: number,
  handleQuantity: (arg0: "i" | "d") => void,
  isDecrementDisabled: boolean,
  isIncrementDisabled: boolean,
  size?: 'sm'
}) => {
  return (
    <div className={clsx("bg-input rounded-full flex items-center justify-between font-medium", size === "sm" ? "h-9 lg:h-11 min-w-[105px] lg:min-w-[126px]" : "h-11 md:h-13 min-w-[110px] md:min-w-[170px]" )}>
      <button
        className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20 w-[35%] flex items-center justify-center"
        onClick={() => handleQuantity("d")}
        disabled={isDecrementDisabled}
      >
        <Minus className={size === "sm" ? "w-[1.2rem] h-[1.2rem] lg:w-[1.4rem] lg:h-[1.4rem]" : "w-[1.2rem] h-[1.2rem] lg:w-[1.6rem] lg:h-[1.6rem]"} />
      </button>
      {quantity}
      <button
        className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20 w-[35%] flex items-center justify-center"
        onClick={() => handleQuantity("i")}
        disabled={isIncrementDisabled}
      >
        <Plus className={size === "sm" ? "w-[1.2rem] h-[1.2rem] lg:w-[1.4rem] lg:h-[1.4rem]" : "w-[1.2rem] h-[1.2rem] lg:w-[1.6rem] lg:h-[1.6rem]"} />
      </button>
    </div>
  )
}

export default QuantityInput;