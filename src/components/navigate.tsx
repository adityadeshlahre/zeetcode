"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const siteRoutes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/logout",
    label: "Logout",
  },
  {
    href: "/register",
    label: "User",
  },
  {
    href: "/admin/register",
    label: "Admin",
  },
  {
    href: "/login",
    label: "UserLogin",
  },
  {
    href: "/admin/login",
    label: "AdminLogin",
  },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-x-5 text-[14px]">
        {siteRoutes.map((siteRoute) => (
          <li key={siteRoute.href}>
            <Link
              href={siteRoute.href}
              className={`text-zinc-400 transition ${
                pathname === siteRoute.href ? "text-zinc-900" : ""
              }`}
            >
              {siteRoute.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
