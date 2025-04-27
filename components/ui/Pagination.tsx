'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex space-x-2 md:space-x-4 justify-between items-center text-sm font-medium">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex space-x-1">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>


      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-9 w-9 px-4.5 items-center justify-center text-sm border border-transparent rounded-lg transition-all',
    {
      'z-10 bg-secondary border-secondary': isActive,
      'hover:bg-primary hover:border-primary hover:text-white': !isActive && position !== 'middle'
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-9 px-3.5 space-x-2 items-center justify-center rounded-lg border border-border transition-all',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-primary hover:text-white hover:border-primary': !isDisabled,
    },
  );

  const iconSize = 20;

  const icon =
    direction === 'left' ? (
      <ArrowLeft size={iconSize} />
    ) : (
      <ArrowRight size={iconSize} />
    );

  return isDisabled ? (
    <div className={className}>
      {icon}
      <span>{direction === 'left' ? "Previous" : "Next"}</span>
    </div>
  ) : (
    <Link className={className} href={href}>
      {direction === 'right' && <span>Next</span>}
      {icon}
      {direction === 'left' && <span>Previous</span>}
    </Link>
  );
}