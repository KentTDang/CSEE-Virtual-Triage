import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useState } from "react";
import umbcLogo from "../../../assets/umbc-dark-logo.png";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Separator } from "@workspace/ui/components/separator";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
};

export const Header = ({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    document.addEventListener("scroll", onScroll, { passive: true });

    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-50 h-16 bg-black border-b-4 border-[#fdb515] mb-2",
        fixed && "header-fixed peer/header sticky top-0 w-[inherit]",
        offset > 10 && fixed ? "shadow" : "shadow-none",
        className,
      )}
      {...props}
    >
      <div className="relative flex h-full items-center gap-3 p-4 sm:gap-4">
        <SidebarTrigger variant="default" className="max-md:scale-125" />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center">
          <img
            src={umbcLogo}
            alt="UMBC Shield"
            className="h-6"
          />
        </div>
      </div>
    </header>
  );
};
