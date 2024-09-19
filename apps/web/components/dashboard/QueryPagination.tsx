"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// 新增 PaginationDemo 组件
const QueryPagination: React.FC<{ pageNo: number; setPageNo: (page: number) => void; totalPages: number }> = ({ pageNo, setPageNo, totalPages }) => {
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPageNo(Math.max(pageNo - 1, 0))} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={index === pageNo}
              onClick={() => setPageNo(index)} // 点击时更新 pageNo
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => setPageNo(Math.min(pageNo + 1, totalPages - 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default QueryPagination