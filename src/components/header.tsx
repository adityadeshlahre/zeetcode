"use client";

import Image from "next/image";
import Link from "next/link";
import SiteNav from "./navigate";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b px-7 py-4">
      <Link href="/">
        <Image
          src="https://coderssb.com/Resources/leetcode-logo.png?text=B&css=%7B%22border-radius%22%3A%2215px%22%7D"
          alt="logo"
          className="h-[35px] w-[35px]"
          width="50"
          height="50"
        />
      </Link>

      {/* <nav>
      <ul className="flex gap-x-5">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/posts">Posts</a>
        </li>
      </ul>
    </nav> */}
      <SiteNav />
    </header>
  );
}
