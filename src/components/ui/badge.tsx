import * as React from "react";

export function Badge({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300 ${className}`}
      {...props}
    />
  );
}
