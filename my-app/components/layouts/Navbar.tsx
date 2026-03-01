import Link from "next/link";
import Image from "next/image";
import ModeToggle from "../ModeToggle";

export default function Navbar() {
  return (
    <header className="p-3 bg-white/15">
      <nav className="flex justify-around items-center">
        <Link href="/" className="flex gap-2 items-center ">
          <Image src="/logo/logo.png" alt="logo" width={24} height={24} />
          <p className="font-semibold">DevEvent</p>
        </Link>

        <ul className="flex flex-row gap-6 items-center">
          <div className="flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/Event">Events</Link>
            <Link href="/create">Create Event</Link>
          </div>
          <div>
            <ModeToggle />
          </div>
        </ul>
      </nav>
    </header>
  );
}
