import NavBar from "../components/navBar"; // Import the NavBar component
import React from "react"; // Import React
import "./globals.css"; // Import global CSS styles
import { orbitron, exo2 } from "./fonts"; // Import custom fonts
import { Props } from "../interface/interfaces";

// Define metadata for the document
export const metadata = {
  title: {
    default: "Indie Gamer", // Default title
    template: "%s | Indie Gamer", // Title template for dynamic titles
  },
};

// Define the props interface with a readonly children prop of type React.ReactNode

// Define the RootLayout component, which wraps the app's layout
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      {" "}
      {/* Set language and apply custom fonts */}
      <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
        {" "}
        {/* Set background color, flex layout, padding, and minimum height */}
        <header>
          <NavBar /> {/* Render the navigation bar */}
        </header>
        <main className="py-3 grow">{children}</main>{" "}
        {/* Render the children prop within the main content area, with padding and flex-grow */}
        <footer className="border-t py-3 text-center text-xs text-slate-500">
          {" "}
          {/* Render the footer with a top border, padding, centered text, and small text size */}
          Game data and images courtesy of{" "}
          <a
            href="https://rawg.io/"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            RAWG {/* Link to the RAWG website */}
          </a>
        </footer>
      </body>
    </html>
  );
}
