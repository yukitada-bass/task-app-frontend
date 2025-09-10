import {
  Activity,
  ChevronDown,
  CircleUser,
  Home,
  LayoutList,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { serverFetch } from "@/lib/serverFetch";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function AppSidebar() {
  const accessToken = await cookies().then((c) => c.get("access_token")?.value);
  const { sub: userId } = await decrypt(accessToken);
  console.log(userId);
  const workspaces = await serverFetch("/workspaces");

  return (
    <Sidebar className="rounded-2xl shadow-md p-4" collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/u/${userId}`}>
                    <CircleUser />
                    <span>プロフィールと公開範囲</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/u/${userId}/cards`}>
                    <Settings />
                    <span>設定</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/u/${userId}/cards`}>
                    <Activity />
                    <span>アクティビティログ</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/u/${userId}/cards`}>
                    <LayoutList />
                    <span>カード</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        {workspaces.map((w) => (
          <Collapsible defaultOpen className="group/collapsible" key={w.id}>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {w.title}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href={`/w/${w.id}`}>
                          <Home />
                          <span>ボード</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href={`/w/${w.id}/members`}>
                          <Home />
                          <span>メンバー</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
