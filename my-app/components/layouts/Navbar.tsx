import Link from "next/link";
import Image from "next/image";
import ModeToggle from "../ModeToggle";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[50] w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      {/* Container to keep content centered and padded */}
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo/logo.png"
            alt="logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="hidden text-xl font-bold tracking-tight sm:block">
            DevEvent
          </span>
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Links - Hidden on very small screens, or adjust spacing */}
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground md:gap-6">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              href="/Event"
              className="transition-colors hover:text-primary"
            >
              Events
            </Link>
            <Link
              href="/create"
              className="transition-colors hover:text-primary"
            >
              Create Event
            </Link>
          </div>

          {/* Theme Toggle Wrapper */}
          <div className="flex items-center border-l pl-4 md:pl-6 border-border">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
