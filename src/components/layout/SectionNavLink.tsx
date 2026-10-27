"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SectionNavLink({ section, children }: { section: "work" | "about"; children: string }) {
  const onHome = usePathname() === "/";
  // Native same-document anchors also scroll when the fragment is already active.
  return onHome
    ? <a href={`#${section}`}>{children}</a>
    : <Link href={`/#${section}`}>{children}</Link>;
}
