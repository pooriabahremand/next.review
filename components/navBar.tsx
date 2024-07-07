import NavLink from "./navLink"; // Import the NavLink component

// Define the NavBar component, which renders the navigation bar
export default function NavBar() {
  return (
    <nav>
      {/* Navigation section */}
      <ul className="flex gap-2">
        {/* Unordered list with flex layout and gap between items */}
        <li className="font-bold">
          {/* List item with bold font */}
          <NavLink href="/">
            {/* NavLink component pointing to the home page */}
            Indie Gamer {/* Text for the home link */}
          </NavLink>
        </li>
        <li className="ml-auto">
          {/* List item pushed to the right using margin-left auto */}
          <NavLink href="/reviews">
            {/* NavLink component pointing to the reviews page */}
            Reviews {/* Text for the reviews link */}
          </NavLink>
        </li>
        <li>
          {/* Standard list item */}
          <NavLink href="/about">
            {/* NavLink component pointing to the about page */}
            About {/* Text for the about link */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
