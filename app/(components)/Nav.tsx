import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header>
      <nav className="flex">
        <div>SolveSuite</div>
        <div className="flex">
          <Link href="/">Home</Link>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Sign Out</Link>
          ) : (
            <Link href="/api/auth/signin">Sign In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
