// Importing fonts from the "next/font/google" module
import { Orbitron, Exo_2 } from "next/font/google";

// Defining a font configuration for Orbitron
export const orbitron = Orbitron({
  subsets: ["latin"], // Specifying Latin subset for the Orbitron font
  variable: "--font-orbitron", // CSS variable name for Orbitron font
});

// Defining a font configuration for Exo 2
export const exo2 = Exo_2({
  subsets: ["latin"], // Specifying Latin subset for the Exo 2 font
  variable: "--font-exo2", // CSS variable name for Exo 2 font
});
