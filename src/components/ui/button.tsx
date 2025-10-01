import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({ className = "", variant = "default", size = "md", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-5 py-3 text-base" }[size];
  const variants = {
    default: "bg-zinc-100 text-[#0a0d14] hover:bg-white/90",
    outline: "border border-zinc-700 text-zinc-200 hover:border-zinc-500 bg-transparent",
  }[variant];
  return <button className={`${base} ${sizes} ${variants} ${className}`} {...props} />;
}
