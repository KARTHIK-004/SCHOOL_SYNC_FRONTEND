import React, { useState, useEffect } from "react";
import { getParents } from "@/utils/api";
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
  User,
  MapPin,
  Briefcase,
  Flag,
  Users,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import DataTable from "@/components/DataTable/DataTable";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ParentsDetail = () => {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState({ from: undefined, to: undefined });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "lastname",
    direction: "ascending",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    gender: [],
    nationality: [],
  });

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await getParents();
        setParents(response.data.parents || []);
      } catch (err) {
        setError("Failed to fetch parents");
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, []);

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      searchTerm === "" ||
      Object.entries(parent).some(([key, value]) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDate =
      !date.from ||
      !date.to ||
      (new Date(parent.createdAt) >= date.from &&
        new Date(parent.createdAt) <= date.to);

    const matchesFilters =
      (filters.gender.length === 0 || filters.gender.includes(parent.gender)) &&
      (filters.nationality.length === 0 ||
        filters.nationality.includes(parent.nationality));

    return matchesSearch && matchesDate && matchesFilters;
  });

  const sortedParents = [...filteredParents].sort((a, b) => {
    if (sortConfig.key !== null) {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
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
      Math.min(Math.ceil(sortedParents.length / rowsPerPage), prev + 1)
    );

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const columns = [
    {
      key: "imageUrl",
      label: "",
      sortable: false,
      render: (parent) => (
        <Avatar>
          <AvatarImage
            src={parent.imageUrl}
            alt={`${parent.firstname} ${parent.lastname}`}
          />
          <AvatarFallback>
            {parent.firstname[0]}
            {parent.lastname[0]}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: "lastname",
      label: "Name",
      sortable: true,
      render: (parent) =>
        `${parent.title} ${parent.firstname} ${parent.lastname}`,
    },
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
      key: "occupation",
      label: "Occupation",
      sortable: true,
      className: "hidden lg:table-cell",
    },
    {
      key: "nationality",
      label: "Nationality",
      sortable: true,
      className: "hidden xl:table-cell",
    },
    {
      key: "view",
      label: "View",
      sortable: false,
      render: (parent) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={parent.imageUrl}
                    alt={`${parent.firstname} ${parent.lastname}`}
                  />
                  <AvatarFallback>
                    {parent.firstname[0]}
                    {parent.lastname[0]}
                  </AvatarFallback>
                </Avatar>
                {`${parent.title} ${parent.firstname} ${parent.lastname}`}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                { icon: Mail, label: "Email", value: parent.email },
                { icon: Phone, label: "Phone", value: parent.phone },
                {
                  icon: Phone,
                  label: "WhatsApp",
                  value: parent.whatsapp || "N/A",
                },
                { icon: User, label: "Gender", value: parent.gender },
                {
                  icon: MapPin,
                  label: "Address",
                  value: `${parent.address}, ${parent.state}`,
                },
                {
                  icon: Briefcase,
                  label: "Occupation",
                  value: parent.occupation,
                },
                { icon: Flag, label: "Nationality", value: parent.nationality },
                {
                  icon: Users,
                  label: "Relationship",
                  value: parent.relationship,
                },
                {
                  icon: Mail,
                  label: "Preferred Contact",
                  value: parent.preferredContact,
                },
                {
                  icon: Calendar,
                  label: "Registered",
                  value: formatDistanceToNow(new Date(parent.createdAt), {
                    addSuffix: true,
                  }),
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Icon className="h-4 w-4" />
                  <div className="col-span-3">{value || "N/A"}</div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      key: "createdAt",
      label: "Date Registered",
      sortable: true,
      className: "hidden sm:table-cell",
      render: (parent) =>
        formatDistanceToNow(new Date(parent.createdAt), { addSuffix: true }),
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: (parent) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() =>
                navigate(`/dashboard/users/parents/edit/${parent._id}`, {
                  state: { parentData: parent },
                })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filterOptions = {
    gender: [...new Set(parents.map((parent) => parent.gender))].map(
      (gender) => ({
        label: gender,
        value: gender,
        checked: filters.gender.includes(gender),
      })
    ),
    nationality: [...new Set(parents.map((parent) => parent.nationality))].map(
      (nationality) => ({
        label: nationality,
        value: nationality,
        checked: filters.nationality.includes(nationality),
      })
    ),
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Parents</CardTitle>
        <Button asChild>
          <Link to="/dashboard/users/parents/new">New Parent</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          data={sortedParents}
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

export default ParentsDetail;
