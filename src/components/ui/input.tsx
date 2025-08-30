import { cn } from "@/libs/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Suffix?: React.ReactNode;
  Prefix?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  classNames?: {
    wrapper?: string;
  };
}

const inputVariant: Record<"default" | "outline" | "ghost", string> = {
  default: "bg-primary pr-3",
  ghost: "bg-none hover:bg-primary/50",
  outline: "border border-primary hover:bg-primary rounded-full outline-none",
};

export default function Input({
  Suffix,
  Prefix,
  variant = "default",
  className,
  classNames,
  ...props
}: InputProps) {
  return (
    <div
      tabIndex={-1}
      className={cn(
        "flex items-center gap-2",
        inputVariant[variant],
        classNames?.wrapper,
      )}
    >
      {Prefix && Prefix}
      <input
        className={cn("outline-none self-stretch rounded-full px-4 py-2 flex-grow", className)}
        {...props}
      />
      {Suffix && Suffix}
    </div>
  );
}
