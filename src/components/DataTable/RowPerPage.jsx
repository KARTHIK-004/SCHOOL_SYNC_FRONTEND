import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RowsPerPage = ({
  value,
  onValueChange,
  pageSizeOptions = [5, 10, 20, 50],
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select value={value.toString()} onValueChange={onValueChange}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          {pageSizeOptions.map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize.toString()}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RowsPerPage;
