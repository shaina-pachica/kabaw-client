import { Info } from "lucide-react"

export function SystemNotification({ content }) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2 rounded-full bg-muted/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm ring-1 ring-border/50">
        <Info className="h-3.5 w-3.5" />
        <span>{content}</span>
      </div>
    </div>
  )
}
