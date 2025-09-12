import Link from "next/link";

function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed right-0 top-10 z-10 h-screen w-60 bg-gray-800">
        <ul className="text-white flex flex-col gap-3 p-5">
          <Link href="/">
            <li className="cursor-pointer">Home</li>
          </Link>
          <Link href="/about">
            <li className="cursor-pointer">About</li>
          </Link>
          <Link href="/about/profile">
            <li className="cursor-pointer">Profile</li>
          </Link>
        </ul>
      </nav>
      <div className="w-full flex items-center justify-center">{children}</div>
    </>
  );
}

export default AboutLayout;
