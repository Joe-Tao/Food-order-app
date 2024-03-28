import { useEffect } from "react";
import { useState } from "react";

export function useProfile() {
    const [data, setdata] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => { 
                setdata(data.admin);
                setLoading(false);
            });
        })
    }, []);

    return {loading, data};
}