import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Pizza,
  Coffee,
  Users,
  Package,
  Truck,
  BarChart3,
  Link,
  DollarSign,
  Menu as MenuIcon,
  Bell,
  Search
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Menu (Pizzas)", url: "/menu", icon: Pizza },
  { title: "Drinks", url: "/drinks", icon: Coffee },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Orders", url: "/orders", icon: Package },
  { title: "Delivery", url: "/delivery", icon: Truck },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Integrations", url: "/integrations", icon: Link },
  { title: "End-of-Day Report", url: "/end-of-day", icon: DollarSign },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path || (path === "/" && currentPath === "/")
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-warm" 
      : "hover:bg-accent/50 text-foreground/80 hover:text-foreground transition-all duration-200"

  return (
    <Sidebar 
      className={`border-r border-border/40 bg-card shadow-elegant ${isCollapsed ? "w-16" : "w-64"}`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-warm">
            <Pizza className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                PizzaManager
              </h2>
              <p className="text-xs text-muted-foreground">Restaurant System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {!isCollapsed && "Restaurant Management"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/" 
                    end 
                    className={({ isActive }) => `
                      ${getNavCls({ isActive })}
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${isActive ? 'shadow-warm' : ''}
                    `}
                  >
                    <BarChart3 className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        ${getNavCls({ isActive })}
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${isActive ? 'shadow-warm' : ''}
                      `}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}