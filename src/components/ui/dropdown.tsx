/** biome-ignore-all lint/a11y/useButtonType: false */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: false */
/** biome-ignore-all lint/suspicious/noExplicitAny: false */
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/libs/utils";
import Button from "./button";

interface DropdownContentProps {
  children?: React.ReactNode;
  triggerRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

// DropdownContent component receives the ref from its parent.
const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, triggerRef, className }, ref) => {
    const [triggerWidth, setTriggerWidth] = useState<number | undefined>(
      undefined,
    );
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          (ref as React.RefObject<HTMLDivElement>).current !==
            (event.target as Node) &&
          !(triggerRef as React.RefObject<HTMLDivElement>).current?.contains(
            event.target as Node,
          )
        ) {
          (ref as React.RefObject<HTMLDivElement>).current.setAttribute(
            "data-open",
            "false",
          );
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref, triggerRef]);
    useEffect(() => {
      if (triggerRef?.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }, [triggerRef]);

    return (
      <div
        ref={ref}
        className={cn(
          "bg-background-secondary border-primary absolute top-full left-0 z-10 mt-2 hidden w-fit rounded-lg border p-1 shadow-md shadow-black data-[open=true]:block",
          className,
        )}
        style={{
          minWidth: `${triggerWidth}px`,
        }}
        data-open="false"
      >
        {children}
      </div>
    );
  },
);

interface DropdownItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-full justify-start px-2 py-1 text-sm"
      variant="ghost"
    >
      {children}
    </Button>
  );
};

interface DropdownTriggerProps {
  children?: React.ReactElement;
  className?: string;
  handleToggle?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: React.RefObject<HTMLDivElement>;
}

// DropdownTrigger component receives the handleToggle function.
const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ children, handleToggle, className }, ref) => {
    return (
      <div ref={ref} className={cn("h-full w-fit", className)}>
        {children &&
          cloneElement(children as React.ReactElement<any>, {
            onClick: handleToggle,
          })}
      </div>
    );
  },
);

// Define the props for the main Dropdown component
interface DropdownProps {
  children?: React.ReactNode;
}

// Dropdown is the main container component.
const Dropdown = ({ children }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = () => {
    dropdownRef.current?.setAttribute(
      "data-open",
      dropdownRef.current.dataset.open === "true" ? "false" : "true",
    );
  };

  const handleClose = () => {
    dropdownRef.current?.setAttribute("data-open", "false");
  };

  return (
    <div className="relative">
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // Type assertion for DropdownContent
          if (child.type === DropdownContent) {
            return cloneElement(child as React.ReactElement<any>, {
              ref: dropdownRef,
              triggerRef: triggerRef,
            });
          }
          // Type assertion for DropdownTrigger
          if (child.type === DropdownTrigger) {
            return cloneElement(child as React.ReactElement<any>, {
              handleToggle,
              ref: triggerRef,
            });
          }
        }
        return child;
      })}
    </div>
  );
};

export { Dropdown, DropdownContent, DropdownTrigger, DropdownItem };
