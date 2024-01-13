import Link from "next/link";
import HeaderList from "./HeaderList";

export default function Header() {
  return (
    <div className="header bg-[#284c8e] shadow-xl text-white py-4">
      <div className="container flex items-center justify-between">
        <HeaderList />
        <div className="buttons">
          <Link href="/login" className="mr-2">
            Login
          </Link>
          <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
