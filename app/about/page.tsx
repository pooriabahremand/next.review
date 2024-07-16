import { ReactNode } from "react";
import Heading from "../../components/heading";

// Metadata for the About page
export const metadata = {
  title: "About",
};

// The main component for the About page
export default function AboutPage() : ReactNode {
  return (
    <>
      <Heading>About</Heading>
      <p>A website created to learn Next.js</p>
    </>
  );
}
