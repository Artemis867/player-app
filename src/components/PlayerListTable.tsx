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
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
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
import { useNavigate } from "react-router-dom"
import placeholderImage from "../assets/placeholder_img.png";



export function PlayerListTable({playerList = [] as any}) {
  
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [players, setPlayers] = useState<PlayerInfo[]>([]);

  const columns: ColumnDef<PlayerInfo>[] = [
    {
      id: "player_img",
      header: () => (
        <span>Player</span>
      ),
      cell: ({ row }) => {
        return (<img
          src={row.original.player_img !== '' ? row.original.player_img : placeholderImage}
          alt="Player"
          className="h-8 w-8 rounded"/>
      )},
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
        return <div className="text-center">{row.original.status ?? "N/A"}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({row}) => {
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
              <DropdownMenuItem onClick={() => {
                navigate(`/player/${row.original.personId}`, {state: row.original});
              }}>View Stats</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const onInitialData = (data: any) => {
    let arr = [] as PlayerInfo[];
    data.forEach((playerData: any) => {

      arr.push({
        player_img: playerData.images[0]?.url ?? '',
        full_name: playerData.nameFullLocal,
        nationality: playerData.nationality,
        status: playerData.status,
        personId: playerData.personId,
      });
    });

    setPlayers(arr);
  }

  useEffect(() => {
    onInitialData(playerList)
  }, [playerList]);


  // Initialize the table //
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


  const TableHeaderMarkup = (
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
  );


  const TableBodyMarkup = (
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
            Loading list of players ...
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  const FilterInputMarkup = (
    <Input
      placeholder="Filter players..."
      value={(table.getColumn("full_name")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("full_name")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );


  const PaginationMarkup = (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {table.getRowModel().rows.length} of {players.length} players
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
  );

  return (
    <div className="w-full p-3">
      <div className="flex items-center py-4">
        {FilterInputMarkup}
      </div>
      <div className="rounded-md border">
        <Table>
          {TableHeaderMarkup}
          {TableBodyMarkup}
        </Table>
      </div>
      {PaginationMarkup}
    </div>
  )
}
