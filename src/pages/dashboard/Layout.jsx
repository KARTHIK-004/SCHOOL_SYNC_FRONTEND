import * as React from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/Dashboard/Sidebar/app-sidebar";
import SidebarHeader from "@/components/Dashboard/Sidebar/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default Layout;
