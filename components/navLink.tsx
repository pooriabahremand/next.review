// This line tells Next.js that this component uses client-side functionality
"use client";

// Import necessary components
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Define the NavLink component with props for href and children
export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): ReactNode {
  // Use the `usePathname` hook to get the current pathname from the browser (client-side)
  const pathName = usePathname();

  // Combine the base class names for styling consistency
  const combinedClassName = "text-orange-800 hover:underline font-orbitron";

  // Conditionally render the component based on whether the href matches the current pathname
  return pathName === href ? (
    // If the href matches, render a span element with the combined class names and children
    <span className={combinedClassName}>{children}</span>
  ) : (
    // If the href doesn't match, render a Link component from next/link with the href and combined class names
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
}
