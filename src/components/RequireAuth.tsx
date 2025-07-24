import { useEffect, useState } from "react"; 
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "../firebase/fbConfig"; 
import { Navigate } from "react-router-dom"; 

const RequireAuth = ({ children }: { children: React.ReactNode }) => { 
    const [isLoading, setIsLoading] = useState(true); 
    const [authenticated, setAuthenticated] = useState(false); 
    
    useEffect(() => { 
        const unsub = onAuthStateChanged(auth, (user) => { 
            setAuthenticated(!!user); 
            setIsLoading(false);
         }); 
        return () => unsub(); 
    }, []); 
    
    if (isLoading) return <p>Loading...</p>; 
    if (!authenticated) return <Navigate to="/login" replace />; 
    
    return <>{children}</>; 
}; 

export default RequireAuth;
