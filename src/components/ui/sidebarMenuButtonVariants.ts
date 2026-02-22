import { cva } from "class-variance-authority";

export const sidebarMenuButtonVariants = cva(
  "group flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  {
    variants: {
      variant: {
        default: "",
        ghost: "bg-transparent hover:bg-sidebar-accent/50",
      },
      size: {
        sm: "h-7 text-xs",
        md: "h-8 text-sm",
        lg: "h-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
