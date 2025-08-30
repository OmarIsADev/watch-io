import { cn } from "@/libs/utils";

export default function Spacer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("bg-primary mx-auto h-px w-[calc(100%-2rem)]", className)}
    ></div>
  );
}
