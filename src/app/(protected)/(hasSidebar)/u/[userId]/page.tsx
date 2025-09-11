import { Card } from "@/components/ui/card";
import { serverFetch } from "@/lib/serverFetch";
import { Board } from "@/types/board";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function page() {
  const boards = await serverFetch<Board[]>("/boards");
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
