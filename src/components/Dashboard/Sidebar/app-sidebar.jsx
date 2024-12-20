import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Bot,
  Bus,
  ChevronRight,
  Command,
  DollarSign,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Package,
  Settings,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import UserInfo from "./sidebar-user-info";
import Logo from "@/components/ui/logo";

const data = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

const navLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
      },
    ],
  },
  {
    title: "Student Management",
    url: "/students",
    icon: GraduationCap,
    items: [
      {
        title: "Student Directory",
        url: "/students/directory",
      },
      {
        title: "Enrollment",
        url: "/students/enrollment",
      },
      {
        title: "Attendance",
        url: "/students/attendance",
      },
      {
        title: "Performance",
        url: "/students/performance",
      },
    ],
  },
  {
    title: "Academics",
    url: "/academics",
    icon: BookOpen,
    items: [
      {
        title: "Curriculum",
        url: "/academics/curriculum",
      },
      {
        title: "Timetable",
        url: "/academics/timetable",
      },
      {
        title: "Examinations",
        url: "/academics/examinations",
      },
      {
        title: "Assignments",
        url: "/academics/assignments",
      },
      {
        title: "Report Cards",
        url: "/academics/report-cards",
      },
    ],
  },
  {
    title: "Staff Management",
    url: "/staff",
    icon: Users,
    items: [
      {
        title: "Staff Directory",
        url: "/staff/directory",
      },
      {
        title: "Attendance",
        url: "/staff/attendance",
      },
      {
        title: "Leave Management",
        url: "/staff/leave",
      },
      {
        title: "Performance",
        url: "/staff/performance",
      },
    ],
  },
  {
    title: "Communication",
    url: "/communication",
    icon: MessageSquare,
    items: [
      {
        title: "Messages",
        url: "/communication/messages",
      },
      {
        title: "Announcements",
        url: "/communication/announcements",
      },
      {
        title: "Notice Board",
        url: "/communication/notice-board",
      },
      {
        title: "Emergency Alerts",
        url: "/communication/emergency",
      },
    ],
  },
  {
    title: "Finance",
    url: "/finance",
    icon: DollarSign,
    items: [
      {
        title: "Fee Management",
        url: "/finance/fees",
      },
      {
        title: "Payments",
        url: "/finance/payments",
      },
      {
        title: "Scholarships",
        url: "/finance/scholarships",
      },
      {
        title: "Reports",
        url: "/finance/reports",
      },
    ],
  },
  {
    title: "Transport",
    url: "/transport",
    icon: Bus,
    items: [
      {
        title: "Routes",
        url: "/transport/routes",
      },
      {
        title: "Tracking",
        url: "/transport/tracking",
      },
      {
        title: "Drivers",
        url: "/transport/drivers",
      },
      {
        title: "Maintenance",
        url: "/transport/maintenance",
      },
    ],
  },
  {
    title: "Resources",
    url: "/resources",
    icon: Package,
    items: [
      {
        title: "Library",
        url: "/resources/library",
      },
      {
        title: "Inventory",
        url: "/resources/inventory",
      },
      {
        title: "Facilities",
        url: "/resources/facilities",
      },
      {
        title: "Assets",
        url: "/resources/assets",
      },
    ],
  },
  {
    title: "Reports & Analytics",
    url: "/reports",
    icon: LineChart,
    items: [
      {
        title: "Academic Reports",
        url: "/reports/academic",
      },
      {
        title: "Financial Reports",
        url: "/reports/financial",
      },
      {
        title: "Custom Reports",
        url: "/reports/custom",
      },
      {
        title: "Analytics Dashboard",
        url: "/reports/analytics",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      {
        title: "School Profile",
        url: "/settings/profile",
      },
      {
        title: "User Management",
        url: "/settings/users",
      },
      {
        title: "System Settings",
        url: "/settings/system",
      },
      {
        title: "Backup & Security",
        url: "/settings/security",
      },
    ],
  },
];

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton size="lg" asChild>
            <Logo />
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <UserInfo />
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
