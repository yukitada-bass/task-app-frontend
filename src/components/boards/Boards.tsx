"use client";

import Link from "next/link";
import { Card } from "../ui/card";
import { Board } from "@/types/board";

export default function Boards({ boards }: { boards: Board[] }) {
  return (
    <>
      {boards.map((b) => (
        <Link href={`/b/${b.id}`} key={b.id}>
          <Card>
            <div className="text-center">{b.title}</div>
          </Card>
        </Link>
      ))}
    </>
  );
}
