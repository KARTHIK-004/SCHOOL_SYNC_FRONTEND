import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import BookDemo from "./pages/BookDemo";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/dashboard/Dashboard";
import Students from "./pages/dashboard/students/Students";
import Layout from "./pages/dashboard/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateStudents from "./pages/dashboard/students/CreateStudents";
import Parents from "./pages/dashboard/users/Parents";
import CreateParents from "./pages/dashboard/users/CreateParents";
import SchoolOnboard from "./pages/SchoolOnboard";
import Contacts from "./pages/dashboard/admin/Contacts";
import Staffs from "./pages/dashboard/staffs/Staffs";
import CreateStaffs from "./pages/dashboard/staffs/CreateStaffs";
import { Classes } from "./pages/dashboard/academics/Classes";
import StudentDetails from "./pages/dashboard/students/StudentDetail";
import Sections from "./pages/dashboard/academics/Sections";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/school-onboard" element={<SchoolOnboard />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="admin/contacts" element={<Contacts />} />
            <Route path="students" element={<Students />} />
            <Route path="students/new" element={<CreateStudents />} />
            <Route path="students/:id" element={<StudentDetails />} />
            <Route path="students/edit/:id" element={<CreateStudents />} />
            <Route path="users/parents" element={<Parents />} />
            <Route path="users/parents/new" element={<CreateParents />} />
            <Route path="users/parents/edit/:id" element={<CreateParents />} />

            <Route path="staffs" element={<Staffs />} />
            <Route path="staffs/new" element={<CreateStaffs />} />
            <Route path="academics/classes" element={<Classes />}>
              <Route
                index
                element={
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Select a class to view its sections
                  </div>
                }
              />
              <Route path=":classId" element={<Sections />} />
            </Route>

            <Route path="sections/:classId" element={<Sections />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
