import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Link } from 'react-router-dom';

interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  focused?: boolean;
  path: string;
}

const MenuItem = ({
  focused = false,
  path,
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
    <Link to={path}>
      <div {...props} className={containerClass}>
        {children}
        {focused ? (
          <div className="absolute top-1/2 -translate-y-1/2 -left-[5px] w-1 h-1 rounded-full bg-primary-orange" />
        ) : null}
      </div>
    </Link>
  );
};

export default MenuItem;
