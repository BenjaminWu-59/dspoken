"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { ChevronDownIcon } from "@radix-ui/react-icons"
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Library, getLibrary, ResData } from "@/api/library"

const Page = () => {
  // 表格配置
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // 数据请求
  const [libraries, setLibraries] = useState<Library[]>([])


  const [sentence, setSentence] = useState<string>(""); // 新增状态管理句子
  const [pageNo, setPageNo] = useState<number>(0); // 当前页，初始值为 0
  const [pageSize, setPageSize] = useState<number>(10); // 每页大小，初始值为 10

  useEffect(() => {
    const fetchData = async () => {

      const queryParams = {
        pageNo,
        pageSize,
        sentence,
      };

      try {
        const data = await getLibrary(queryParams);
        setLibraries(data.data?.libraries || []); // 更新为 data.data.libraries
      } catch (error) {
        console.error('获取数据错误:', error);
      }
    };

    fetchData();
  }, [pageNo, pageSize, sentence]); // 依赖于页码、每页大小和句子变化


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
            placeholder="Filter sentence..."
            value={sentence} // 绑定输入框的值
            onChange={(event) => {
              setSentence(event.target.value); // 更新句子状态
              table.getColumn("sentence")?.setFilterValue(event.target.value); // 更新表格过滤
            }}
            className="max-w-sm"
          />
          <CreateLibraryDialog />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
    header: "Number",
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
          Sentence
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
          Hint
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
          Status
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("status")}</div>,
  },
]