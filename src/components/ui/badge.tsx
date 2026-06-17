import * as React from "react"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2",
    secondary: "inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2",
    destructive: "inline-flex items-center rounded-full border border-red-300 bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-900 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2",
    outline: "inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2",
  }

  return (
    <div className={variants[variant]} {...props} />
  )
}

export { Badge }
