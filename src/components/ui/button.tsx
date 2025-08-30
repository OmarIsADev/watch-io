import { Loader2 } from "lucide-react";
import { cn } from "@/libs/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Suffix?: React.ReactNode;
  Prefix?: React.ReactNode;
  loading?: boolean;
  variant?: "default" | "outline" | "ghost" | "link";
}

const buttonVariant: Record<"default" | "outline" | "ghost" | "link", string> =
  {
    default: "bg-primary hover:bg-primary/80",
    ghost: "bg-none hover:bg-primary/50",
    outline: "border border-primary hover:bg-primary",
    link: "bg-none p-0 text-blue-500 hover:underline",
  };

export default function Button({
  children,
  className,
  Prefix,
  Suffix,
  loading,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        `text-foreground flex cursor-pointer items-center justify-center gap-2 rounded-md px-6 py-2 transition`,
        loading ? "bg-primary/50 cursor-not-allowed" : buttonVariant[variant],
        className,
      )}
      disabled={loading}
      {...props}
    >
      {!loading ? (
        <>
          {Prefix && Prefix}
          {children}
          {Suffix && Suffix}
        </>
      ) : (
        "Loading"
      )}

      {loading && <Loader2 className="animate-slide-in animate-spin" />}
    </button>
  );
}
