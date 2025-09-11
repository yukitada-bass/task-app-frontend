"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/types/card";

export default function Cards({ cards }: { cards: Card[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>カード</TableHead>
          <TableHead>リスト</TableHead>
          <TableHead>ラベル</TableHead>
          <TableHead>期限</TableHead>
          <TableHead>ボード</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.title}</TableCell>
            <TableCell>{c.id}</TableCell>
            <TableCell>{c.id}</TableCell>
            <TableCell>{c.id}</TableCell>
            <TableCell className="text-right">{c.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
