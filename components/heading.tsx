// Define a functional component named Heading
// This component accepts a single prop 'children', which represents the content to be displayed inside the heading
export default function Heading({ children }) {
  // Return an h1 element with specific classes for styling
  // The 'children' prop is used to display the content inside the h1 element
  return <h1 className="font-bold font-orbitron pb-3 text-2xl">{children}</h1>;
}
