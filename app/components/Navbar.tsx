// app/components/Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "../constants";
import AuthProvider from "./AuthProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/session";
import { SessionInterface } from "@/common.types";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return (
    <nav className="flexBetween navbar">
      <div className="flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>

        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <li key={link.text}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session?.user?.image && (
              <Image
                src={session.user.image}
                width={40}
                height={40}
                className="rounded-full"
                alt={session.user.name}
              />
            )}
            <Link href={"/create-project"}>Share work</Link>

            <SignOutButton />
          </>
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
