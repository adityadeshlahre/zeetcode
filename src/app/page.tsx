"use client";

import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    <main>
      <div>
        <form onSubmit={TokenCall}>sjdfkjdfs</form>
      </div>
    </main>
  );
}

async function TokenCall() {}
