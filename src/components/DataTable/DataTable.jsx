import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import FilterComponent from "./FilterComponent";
import SortComponent from "./SortComponent";
import DateRangePicker from "./DateRangePicker";
import RowsPerPage from "./RowPerPage";
import PagePagination from "./PagePagination";

const DataTable = ({
  data,
  columns,
  loading,
  searchTerm,
  onSearchChange,
  sortConfig,
  onSortChange,
  filters,
  onFilterChange,
  currentPage,
  rowsPerPage,
  onRowsPerPageChange,
  onPrevPage,
  onNextPage,
  date,
  onDateChange,
}) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / rowsPerPage);

  const sortOptions = columns
    .filter((column) => column.sortable)
    .map((column) => ({ label: column.label, value: column.key }));

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FilterComponent filters={filters} onFilterChange={onFilterChange} />
          <SortComponent
            sortOptions={sortOptions}
            currentSort={sortConfig}
            onSortChange={onSortChange}
          />
        </div>
        <div className="flex gap-4">
          <DateRangePicker date={date} setDate={onDateChange} />
          <RowsPerPage
            value={rowsPerPage}
            onValueChange={(value) => onRowsPerPageChange(parseInt(value))}
          />
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array(rowsPerPage)
                  .fill()
                  .map((_, index) => (
                    <TableRow key={index}>
                      {columns.map((column, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              : paginatedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell key={column.key} className={column.className}>
                        {column.render ? column.render(row) : row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <PagePagination
        currentPage={currentPage}
        pageCount={pageCount}
        itemsShown={paginatedData.length}
        totalItems={data.length}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        loading={loading}
      />
    </>
  );
};

export default DataTable;
