import React from "react";
import { cookies } from "next/headers";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const cookieHeader = cookies().toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/boards/${workspaceId}`,
    {
      credentials: "include",
      headers: {
        cookie: cookieHeader,
      },
    }
  );
  const boards = await res.json();

  return (
    <div className="grid grid-cols-3 gap-2">
      {boards.map((b) => (
        <Link href={`/b/${b.id}`} key={b.id}>
          <Card>
            <div className="text-center">{b.title}</div>
          </Card>
        </Link>
      ))}
      <Card className="bg-gray-50">
        <div className="flex justify-center items-center gap-1">
          <span className="text-sm text-gray-500">新しいボードを作成</span>
          <Plus size={14} />
        </div>
      </Card>
    </div>
  );
}
