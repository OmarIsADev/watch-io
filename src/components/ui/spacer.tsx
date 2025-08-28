import { cn } from "@/libs/utils";

export default function Spacer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("w-[calc(100%-2rem)] bg-primary h-px mx-auto", className)}></div>;
}
