import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "./ui/sidebar";

export function DocsSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Get Started</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/docs/get-started" passHref legacyBehavior>
                  <SidebarMenuButton asChild>Introduction</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/docs/components/accordion" passHref legacyBehavior>
                  <SidebarMenuButton asChild>Accordion</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/docs/components/alert" passHref legacyBehavior>
                  <SidebarMenuButton asChild>Alert</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/docs/components/button" passHref legacyBehavior>
                  <SidebarMenuButton asChild>Button</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>API Reference</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/docs/api" passHref legacyBehavior>
                  <SidebarMenuButton asChild>API Reference</SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
