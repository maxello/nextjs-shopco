import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "w-full text-base flex justify-center items-center focus:outline-none disabled:text-white disabled:bg-gray-300 disabled:border-gray-300 cursor-pointer disabled:cursor-not-allowed font-medium rounded-full [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "transition text-primary-foreground border border-primary bg-primary hover:bg-primary/80 hover:border-primary/80 active:bg-primary/80 active:border-primary/80",
        outline:
          "transition text-primary border border-border bg-primary-foreground hover:bg-background-light active:bg-background-light active:border-border",
        secondary:
          "transition text-primary/60 border border-background-light bg-background-light hover:bg-primary-foreground active:bg-background-light active:border-border",
      },
      size: {
        default: "h-13 px-5",
        xs: "h-11.5 px-5 md:px-6",
        sm: "h-10.5 md:h-12 px-3",
        smx: "h-12 px-3",
        md: "h-11 md:h-13",
        xl: "h-13.5 md:h-15 px-5"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button";

export default Button;
