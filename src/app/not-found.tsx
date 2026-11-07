"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// An unknown address sends visitors to the homepage, because this is a one-page site. It happens here
// rather than as a server redirect so that the response stays a real 404 for search engines. The link
// is for the moment before the redirect, and for browsers without JS.
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-2 p-4 text-center">
      <p className="text-muted-foreground">Page not found.</p>
      <Link href="/" className="font-medium text-primary hover:underline">
        Go to the homepage
      </Link>
    </main>
  );
}
