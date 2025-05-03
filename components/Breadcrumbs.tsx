import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({
  breadcrumbs,
  className,
  ...props
}:
  React.ComponentProps<"ul"> & { breadcrumbs: Breadcrumb[] }
) {
  return (
    <ul {...props} className={cn("flex items-center gap-x-2 text-sm md:text-base", className)}>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.label}>
          <li
            className={cn(
              index === breadcrumbs.length - 1 ? 'text-primary' : 'text-foreground',
            )}
          >
            {breadcrumb.href ? (
              <Link className="after:transition-all after:hidden md:after:block after:duration-700 after:w-0 relative after:h-[1px] hover:after:w-full after:absolute after:-bottom-1 after:left-0 after:bg-primary" href={breadcrumb.href}>{breadcrumb.label}</Link>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
          </li>
          {breadcrumbs.length !== index + 1 && <ChevronRight className="mt-0.5" size={18} />}
        </React.Fragment>
      ))}
    </ul>
  );
}