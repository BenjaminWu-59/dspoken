"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CreateLibraryDialog from "@/components/library/CreateLibrary"
import { Library, getLibrary } from "@/api/library"
import QueryPagination from "@/components/dashboard/QueryPagination"

const Page = () => {
  // 表格配置
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // 知识库数据
  const [libraries, setLibraries] = useState<Library[]>([])

  // 数据总数
  const [totalCount, setTotalCount] = useState(0);

  // 搜索请求参数
  const [queryParams, setQueryParams] = useState<{ sentence: string; pageNo: number; pageSize: number }>({
    sentence: "",
    pageNo: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLibrary(queryParams);
        setLibraries(data.data?.libraries || []);
        setTotalCount(data.data?.totalCount || 0); // 设置总计数
      } catch (error) {
        console.error('获取数据错误:', error);
      }
    };

    fetchData();
  }, [queryParams]);

  // 计算总页数
  const totalPages = Math.ceil(totalCount / queryParams.pageSize);


  const table = useReactTable({
    data: libraries,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex space-x-2">
          <Input
            placeholder="过滤知识..."
            value={queryParams.sentence} // 绑定输入框的值
            onChange={(event) => {
              setQueryParams({ ...queryParams, sentence: event.target.value }); // 更新句子状态
              table.getColumn("sentence")?.setFilterValue(event.target.value); // 更新表格过滤
            }}
            className="max-w-sm"
          />
          <CreateLibraryDialog />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-gray-500 text-sm text-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} /{" "}
          {table.getFilteredRowModel().rows.length} 行被选择.
        </div>
        <QueryPagination
          pageNo={queryParams.pageNo}
          setPageNo={(newPageNo) => setQueryParams({ ...queryParams, pageNo: newPageNo })}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

export default Page

const columns: ColumnDef<Library>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: "序号",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("number")}</div>
    ),
  },
  {
    accessorKey: "sentence",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
        >
          知识
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("sentence")}</div>,
  },
  {
    accessorKey: "hint",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
        >
          提示
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("hint")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
        >
          状态
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("status")}</div>,
  },
]

