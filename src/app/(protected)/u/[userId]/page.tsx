import { Card } from "@/components/ui/card";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function page() {
  const cookieHeader = cookies().toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/boards`, {
    credentials: "include",
    headers: {
      cookie: cookieHeader,
    },
  });
  const boards = await res.json();
  return (
    <div className="grid grid-cols-3">
        {boards.map((b) => (
          <Link href={`/b/${b.id}`} key={b.id}>
            <Card>
              <h3 className="text-center">{b.title}</h3>
            </Card>
          </Link>
        ))}
    </div>
  );
}
