import Boards from "@/components/boards/Boards";
import CreateBoard from "@/components/boards/CreateBoard";
import Grid from "@/components/ui/grid";
import { serverFetch } from "@/lib/serverFetch";
import { Board } from "@/types/board";
import { Workspace } from "@/types/workspace";

export default async function page({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  // 並列でfetch
  const [boards, workspaces] = await Promise.all([
    serverFetch<Board[]>(`/boards/${workspaceId}`),
    serverFetch<Workspace[]>(`/workspaces`),
  ]);

  return (
    <Grid>
      <Boards boards={boards} />
      <CreateBoard workspaces={workspaces} />
    </Grid>
  );
}
