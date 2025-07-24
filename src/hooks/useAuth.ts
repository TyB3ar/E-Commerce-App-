import { useEffect, useState } from "react"; 
import { auth } from "../firebase/fbConfig"; 
import type { User } from "firebase/auth"; 

export const useAuth = () => { 
    const [user, setUser] = useState<User | null>(auth.currentUser);
    const [loading, setLoading] = useState(true); 
    useEffect(() => { 
        const unsubscribe = auth.onAuthStateChanged(currentUser => { 
            setUser(currentUser); 
            setLoading(false); 
        }); 
        return unsubscribe; 
    }, []); 
    
    return { user, loading }; 
};
