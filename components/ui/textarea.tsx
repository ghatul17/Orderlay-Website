import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        " p-[7.763px_6.654px]  lg:p-[8px] xl:p-[10px] 2xl:p-[12px]  3xl:p-[14px]  text-[12px] lg:text-[16px] w-full  gap-[5.545px] self-stretch rounded-[4.436px] text-slate-900 border-[0.555px] border-slate-200 bg-slate-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
