import Link from "next/link";
import NavLink from "./navLink";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <NavLink href="/" className="font-bold">
            Indie Gamer
          </NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/reviews" className="">
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink href="/about" className="">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
