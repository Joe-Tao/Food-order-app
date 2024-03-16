"use client"
import {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials', {email, password, callbackUrl: '/'});

        setLoginInProgress(false);
    }
    return (
        <section className="mt-8">
        <h1 className=" text-center text-primary text-4xl">
            Login
        </h1>

        <form className=" block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" name='email' placeholder="email" value={email} 
                   disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)}>
            </input>
            <input type="password" name='password' placeholder="password" value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)}>
                
            </input>
            <button type="submit" disabled={loginInProgress}>
                        Login
            </button>
            <div className="my-4 text-center text-gray-500">
                        or Login with provider
            </div>
            <button className="flex gap-4 justify-center">
                <Image src={'/google.png'} alt='' width={24} height={24}/>
                Login with google
            </button>
            <div className=" text-center my-4 text-gray-500 border-t pt-4">
                Don't have an account? {'  '}
                <Link className=" underline" href={'/register'}>
                    Register here &raquo;
                </Link>
            </div>
        </form>
        </section>
    );
}