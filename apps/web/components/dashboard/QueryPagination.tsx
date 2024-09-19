"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination"
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// 新增 PaginationDemo 组件
const QueryPagination: React.FC<{ pageNo: number; setPageNo: (page: number) => void; totalPages: number }> = ({ pageNo, setPageNo, totalPages }) => {
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <Button variant="outline" size="icon" onClick={() => setPageNo(Math.max(pageNo - 1, 0))}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
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
          <Button variant="outline" size="icon" onClick={() => setPageNo(Math.min(pageNo + 1, totalPages - 1))}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default QueryPagination