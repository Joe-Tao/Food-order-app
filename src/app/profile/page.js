'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage(){
    const session = useSession();
    const {status} = session;
    const [userName, setUserName] = useState('');
    const [saved, setSaved] = useState(false);
    const [IsSaving, setIsSaving] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName}),
        });
        setIsSaving(false);
        if (response.ok){
            setSaved(true);
        }
    }

    async function handleFileChange(ev){
        const files = ev.target.files;
        if (files?.length === 1){
            const data = new FormData;
            data.set('file', files[0]);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
                // headers: {'Content-Type': 'multipart/form-data'}
            });
            // console.log(response);
            const link = await response.json();
            setImage(link);
        }
    }


    if (status === 'loading') {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect("/login");
    }

    // const userImage = session.data.user.image;

    return (
        <section className="mt-8">
            <h1 className=" text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            
            <div className="max-w-md mx-auto ">
                {saved && (
                    <h2 className=" text-center bg-green-100 p-4 ounded-lg border border-green-300">
                        Profile Saved!
                    </h2>
                )}
                {IsSaving && (
                    <h2 className=" text-center bg-blue-100 p-4 ounded-lg border border-blue-300">
                        Saving...
                    </h2>
                )}
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            {image && (
                                <img className=" rounded-lg w-full h-full mb-1" src={image}  alt={'avatar'}  />
                        
                            )}
                            <label>
                                <input type="file" className=" hidden" onChange={handleFileChange} />
                                <span className="border rounded-lg p-4 block text-center border-gray-300 cursor-pointer">Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and last name"
                         value={userName} onChange={ev => setUserName(ev.target.value)} />
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}