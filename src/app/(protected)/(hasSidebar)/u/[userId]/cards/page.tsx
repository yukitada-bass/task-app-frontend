import Cards from "@/components/cards/Cards";
import { serverFetch } from "@/lib/serverFetch";
import { Card } from "@/types/card";
import React from "react";

export default async function page() {
  const cards = await serverFetch<Card[]>("/cards");
  console.log(cards);
  return <Cards cards={cards} />;
}
