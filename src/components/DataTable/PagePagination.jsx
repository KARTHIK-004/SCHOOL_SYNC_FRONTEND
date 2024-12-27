import React from "react";
import { Button } from "@/components/ui/button";

const PagePagination = ({
  currentPage,
  pageCount,
  itemsShown,
  totalItems,
  onPrevPage,
  onNextPage,
  loading = false,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center gap-4 space-y-4 ${className}`}
    >
      <div className="text-sm text-muted-foreground">
        Showing {itemsShown} of {totalItems} results
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {pageCount}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onNextPage}
          disabled={currentPage === pageCount || loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PagePagination;
