import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  focused?: boolean;
}

const MenuItem = ({
  focused = false,
  className,
  children,
  ...props
}: MenuItemProps) => {
  const containerClass = twMerge(
    "relative text-primary-orange-muted cursor-pointer",
    clsx(
      {
        "text-primary-orange": focused,
      },
      className
    )
  );
  return (
    <div {...props} className={containerClass}>
      {children}
      {focused ? (
        <div className="absolute top-1/2 -translate-y-1/2 -left-[5px] w-1 h-1 rounded-full bg-primary-orange" />
      ) : null}
    </div>
  );
};

export default MenuItem;
