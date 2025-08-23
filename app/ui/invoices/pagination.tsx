'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/app/lib/utils'; // pastikan util ini ada

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // buat daftar halaman (mis. [1,2,3] atau dengan ellipsis)
  const pages = generatePagination(currentPage, totalPages);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      {/* Prev */}
      <Link
        href={isFirst ? '#' : createPageURL(currentPage - 1)}
        aria-disabled={isFirst}
        className={clsx(
          'flex items-center gap-1 rounded-md border px-3 py-1 text-sm',
          isFirst && 'pointer-events-none opacity-50'
        )}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Prev
      </Link>

      {/* Numbered pages */}
      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <Link
            key={idx}
            href={createPageURL(p)}
            className={clsx(
              'rounded-md border px-3 py-1 text-sm',
              p === currentPage ? 'bg-gray-900 text-white' : 'bg-white'
            )}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </Link>
        ) : (
          <span key={idx} className="px-2 text-sm text-gray-500">
            {p /* '…' */}
          </span>
        )
      )}

      {/* Next */}
      <Link
        href={isLast ? '#' : createPageURL(currentPage + 1)}
        aria-disabled={isLast}
        className={clsx(
          'flex items-center gap-1 rounded-md border px-3 py-1 text-sm',
          isLast && 'pointer-events-none opacity-50'
        )}
      >
        Next
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </nav>
  );
}
