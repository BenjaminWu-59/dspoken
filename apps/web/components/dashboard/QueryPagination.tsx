"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface QueryPaginationProps {
  total: number;
  pageNo: number; // 添加 pageNo
  pageSize: number; // 添加 pageSize
  className?: string;
}

export function QueryPagination({
  total,
  pageNo, // 接收 pageNo
  pageSize, // 接收 pageSize
  className,
}: QueryPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = pageNo; // 使用传入的 pageNo

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        {prevPage >= 1 ? (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(prevPage)} />
          </PaginationItem>
        ) : null}

        {Array.from({ length: Math.ceil(total / pageSize) }).map((_, index) => ( // 修改这里
          <PaginationItem
            className="hidden sm:inline-block"
            key={`page-button-${index}`}
          >
            <PaginationLink
              isActive={currentPage === index + 1}
              href={createPageURL(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {nextPage <= Math.ceil(total / pageSize) ? ( // 修改这里
          <PaginationItem>
            <PaginationNext href={createPageURL(nextPage)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}