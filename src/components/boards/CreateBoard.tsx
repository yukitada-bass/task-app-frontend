"use client";

import { Card } from "../ui/card";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Workspace } from "@/types/workspace";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function CreateBoard({
  workspaces,
}: {
  workspaces: Workspace[];
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBoard = Object.fromEntries(formData.entries());
    const jsonFormData = JSON.stringify(newBoard);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/boards`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: jsonFormData,
    });
    const data = await res.json();

    const { id } = data;
    redirect(`/b/${id}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Card className="bg-gray-50 cursor-pointer">
          <div className="flex justify-center items-center gap-1">
            <span className="text-sm text-gray-500">新しいボードを作成</span>
            <Plus size={14} />
          </div>
        </Card>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">ボードを作成</h4>
            <p className="text-muted-foreground text-sm">
              ボードのタイトルは必須です
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">ボードタイトル</Label>
                <Input id="title" className="h-8" name="title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="workspace">ワークスペース</Label>
                <Select name="workspaceId">
                  <SelectTrigger id="workspace" className="w-full">
                    <SelectValue placeholder="ワークスペース" />
                  </SelectTrigger>
                  <SelectContent>
                    {workspaces.map((w) => (
                      <SelectItem key={w.id} value={w.id}>
                        {w.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button>送信</Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
