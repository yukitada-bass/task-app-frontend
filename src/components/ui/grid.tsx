import { ReactNode } from "react";

export default function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {children}
    </div>
  );
}