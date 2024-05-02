import Link from "next/link";

export default function LinkComponent({ children }, props) {
  return (
    <Link href={props.href} className="text-orange-800 hover:underline">
      {children}
    </Link>
  );
}
