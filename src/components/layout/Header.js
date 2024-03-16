'use client'
import { secureHeapUsed } from "crypto";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
    // const session = useSession();
    // console.log(session);

    return (
        <>
            <header className="flex items-center justify-between">
                 
                <nav className="flex gap-8 text-gray-500 font-semibold items-center">
                    <Link className="text-primary font-semibold text-2xl" href="/"> 
                        Tao's PIZZA
                    </Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={''}>Menu</Link>
                    <Link href={''}>About</Link>
                    <Link href={''}>Contact</Link>
                    

                </nav>
                <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                    <Link href={'/login'} className="">
                        Login
                    </Link>
                    <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
                        Register
                    </Link>
                </nav>
            </header>
        </>
    );
}