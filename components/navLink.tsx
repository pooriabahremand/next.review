"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavLink({ href, className = "", children }): ReactNode {
  const pathName = usePathname();
  if (pathName === href) {
    return (
      <span
        className={`text-orange-800 hover:underline font-orbitron ${className}`}
      >
        {children}
      </span>
    );
  } else {
    return (
      <Link
        href={href}
        className={`text-orange-800 hover:underline font-orbitron ${className}`}
      >
        {children}
      </Link>
    );
  }
}
