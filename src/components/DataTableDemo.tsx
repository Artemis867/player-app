"use client"

import {useState, useEffect } from "react"
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
import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import PlayerInfo from "@/interface/player.interface";

// const data: PlayerInfo[] = [
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos Bayot",
//     nationality: "AUS",
//     status: "ACTIVE",
//   },
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos Bading",
//     nationality: "AUS",
//     status: "ACTIVE",
//   },
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos Tanga",
//     nationality: "AUS",
//     status: "ACTIVE",
//   },
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos",
//     nationality: "AUS",
//     status: "ACTIVE",
//   },
//   {
//     player_img: "test.png",
//     nationality: "AUS",
//     status: "INACTIVE",
//   },
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos",
//     nationality: "AUS",
//     status: "ACTIVE",
//   },
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos",
//     nationality: "AUS",
//     status: "ACTIVE",
//   },
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos",
//     nationality: "AUS",
//     status: "ACTIVE",
//   },
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos",
//     nationality: "AUS",
//     status: "INACTIVE",
//   },
//   {
//     player_img: "test.png",
//     full_name: "Sidney Ramos",
//     nationality: "AUS",
//     status: "INACTIVE",
//   },
// ];



// export type PlayerInfo = {
//   player_img?: string
//   full_name?: string
//   nationality?: string
//   status?: "ACTIVE" | "INACTIVE" | null
// }

export const columns: ColumnDef<PlayerInfo>[] = [
  {
    id: "player_img",
    header: () => (
      <span>Player</span>
    ),
    cell: ({ row }) => (
      <img
        src={row.original.player_img}
        alt="Player"
        className="h-8 w-8 rounded"/>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.full_name ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "nationality",
    header: () => {
      return (
        <div className="flex items-center">
          Nationality
        </div>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.original.nationality ?? "N/A"}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      // row.getValue("status") is the value of the "status" column
      // const status = row.getValue("status");
      return <div className="text-center">{row.original.status ?? "N/A"}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => {
              console.log('[TRIGGER] viewPlayer')
            }}>View Stats</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo({playerList = [] as any}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [players, setPlayers] = useState<PlayerInfo[]>([]);

  const onInitialData = (data: any) => {
    let arr = [] as any;

    data.forEach((playerData: any) => {
      console.log('[TRACK] Player Data: ');
      console.log(playerData)

      arr.push({
        player_img: playerData.images[0]?.url ?? '',
        full_name: playerData.nameFullLocal,
        nationality: playerData.nationality,
        status: playerData.status
      });
    });

    setPlayers(arr);
  }

  useEffect(() => {
    onInitialData(playerList)
  }, [playerList]);

  useEffect(() => {
    console.log('[FINAL][TRACK] official players data: ', players);
  }, [players])

  const table = useReactTable({
    data: players,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full p-3">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter players..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
