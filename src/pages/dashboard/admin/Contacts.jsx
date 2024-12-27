import React, { useState, useEffect } from "react";
import { getContactSubmissions } from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Globe,
  Users,
  Briefcase,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import DataTable from "@/components/DataTable/DataTable";

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState({ from: undefined, to: undefined });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    country: [],
    role: [],
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContactSubmissions();
        setContacts(response.data.contacts || []);
      } catch (err) {
        setError("Failed to fetch contact submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      searchTerm === "" ||
      Object.values(contact).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDate =
      !date.from ||
      !date.to ||
      (new Date(contact.createdAt) >= date.from &&
        new Date(contact.createdAt) <= date.to);

    const matchesFilters =
      (filters.country.length === 0 ||
        filters.country.includes(contact.country)) &&
      (filters.role.length === 0 || filters.role.includes(contact.role));

    return matchesSearch && matchesDate && matchesFilters;
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortConfig.key !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const handleFilterChange = (filterType, value, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter((item) => item !== value),
    }));
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setCurrentPage((prev) =>
      Math.min(Math.ceil(sortedContacts.length / rowsPerPage), prev + 1)
    );

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    {
      key: "email",
      label: "Email",
      sortable: true,
      className: "hidden sm:table-cell",
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
      className: "hidden md:table-cell",
    },
    {
      key: "school",
      label: "School",
      sortable: true,
      className: "hidden lg:table-cell",
    },
    {
      key: "country",
      label: "Country",
      sortable: true,
      className: "hidden xl:table-cell",
    },
    {
      key: "view",
      label: "View",
      sortable: false,
      render: (contact) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {contact.name.charAt(0)}
                </div>
                {contact.name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                { icon: Mail, label: "Email", value: contact.email },
                { icon: Phone, label: "Phone", value: contact.phone },
                { icon: Building2, label: "School", value: contact.school },
                { icon: Globe, label: "Country", value: contact.country },
                {
                  icon: Users,
                  label: "Students",
                  value: `${contact.students} Students`,
                },
                { icon: Briefcase, label: "Role", value: contact.role },
                {
                  icon: Clock,
                  label: "Submitted",
                  value: formatDistanceToNow(new Date(contact.createdAt), {
                    addSuffix: true,
                  }),
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Icon className="h-4 w-4" />
                  <div className="col-span-3">{value}</div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      key: "createdAt",
      label: "Date Created",
      sortable: true,
      className: "hidden sm:table-cell",
      render: (contact) =>
        formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true }),
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filterOptions = {
    country: [...new Set(contacts.map((contact) => contact.country))].map(
      (country) => ({
        label: country,
        value: country,
        checked: filters.country.includes(country),
      })
    ),
    role: [...new Set(contacts.map((contact) => contact.role))].map((role) => ({
      label: role,
      value: role,
      checked: filters.role.includes(role),
    })),
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contact Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={sortedContacts}
          columns={columns}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortConfig={sortConfig}
          onSortChange={handleSort}
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          date={date}
          onDateChange={setDate}
        />
      </CardContent>
    </Card>
  );
};

export default ContactSubmissions;
