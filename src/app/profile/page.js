'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import toast from "react-hot-toast";
import { resolve } from "path";
import { rejects } from "assert";

import UserTabs from "@/components/layout/UserTabs";

export default function ProfilePage(){
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');

    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
             fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
             });
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: userName, 
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country
                }),
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving',
            success: 'Profile saved!',
            error: 'Error',
        })
        
    }

    async function handleFileChange(ev){
        const files = ev.target.files;
        if (files?.length === 1){
            const data = new FormData;
            data.set('file', files[0]);
            // toast('Uploading...');

            const uploadPromise = fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                }).then(response => {
                    if (response.ok) {
                        response.json().then(link => {
                            setImage(link);
                            resolve();
                        })
                    
                    } 
                    throw new Error('Something went wrong'); 
                });
                
            

            await toast.promise(uploadPromise, {
                loading: 'Uploading',
                success: 'Upload complete',
                error: 'Upload error',
            });
        
    
            
        }
    }


    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect("/login");
    }

    // const userImage = session.data.user.image;

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}></UserTabs>
            
            <div className="max-w-md mx-auto mt-8">
                <div className="flex gap-4">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            {image && (
                                <Image className="rounded-lg h-full w-full mb-1" src={image} width={250} height={250} alt={'avatar'}  />
                        
                            )}
                            <label>
                                <input type="file" className=" hidden" onChange={handleFileChange} />
                                <span className="border rounded-lg p-4 block text-center border-gray-300 cursor-pointer">Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label>
                            First and last name
                        </label>
                        <input type="text" placeholder="First and last name"
                         value={userName} onChange={ev => setUserName(ev.target.value)} />
                        <label>
                            Email
                        </label>
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <label>
                            Phone
                        </label>
                        <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Phone number" />
                        <label>
                            Street Address
                        </label>
                        <input type="text" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} placeholder="Steet address" />
                        <div className="flex gap-4">
                            <div>
                                <label>Postal Code</label>
                                <input 
                                type="text" value={postalCode} onChange={ev => setPostalCode(ev.target.value)} placeholder="Postal code" />
                           
                            </div>
                            <div>
                                <label>City</label>
                                <input 
                                type="text" value={city} onChange={ev => setCity(ev.target.value)} placeholder="City" />
                            </div>
                             
                        </div>
                        <label>Country</label>
                        <input type="text" value={country} onChange={ev => setCountry(ev.target.value)} placeholder="Country" />
                        
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}