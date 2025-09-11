export interface Card {
  id: string;
  title: string;
  description?: string;
  listId: string;
  position: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
