import { useState, useEffect } from "react"; 
import { useUserProfile } from "../hooks/useUserProfile"; 
import { auth } from "../firebase/fbConfig"; 
import { updateUserProfile, deleteUserProfile } from "../firebase/users";
import { useNavigate } from "react-router-dom"; 

const Profile = () => { 
    const user = auth.currentUser; 
    const navigate = useNavigate(); 
    const { data: profile, isLoading, error, refetch } = useUserProfile(user?.uid || null); 
    
    // Local state for editable fields 
    const [name, setName] = useState(""); 
    const [address, setAddress] = useState(""); 
    
    // Initialize local state when profile loads 
    useEffect(() => { 
        if (profile) { setName(profile.name || ""); 
            setAddress(profile.address || ""); 
        } }, [profile]); 
        
        if (isLoading) return <p>Loading profile...</p>; 
        if (error) return <p>Error loading profile.</p>; 
        if (!profile) return <p>No profile data found.</p>; 
        
        // Handle profile update 
        const handleUpdate = async () => { 
            if (!user) return; 
            try { 
                await updateUserProfile(user.uid, { name, address }); 
                alert("Profile updated!"); 
                refetch(); // Refresh profile data after update 
            } catch (err) { 
                alert("Failed to update profile"); 
            } 
        }; 
        
        // Handle account deletion 
        const handleDeleteAccount = async () => { 
            if (!user) return; 
            if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return; 
            
            try { 
                await deleteUserProfile(user.uid); 
                await user.delete(); // Deletes Firebase Auth user 
                alert("Account deleted successfully."); 
                navigate("/login"); // Redirect to login or home page after deletion 
            } catch (err: any) { 
                alert("Failed to delete account: " + err.message); 
            } 
        }; 
        
        return ( 
          <div> 
            <h2>Profile</h2> 

            <p>Email: {profile.email}</p> 

            <label> Name: 
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                /> 
            </label> 
            <label> Address: 
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                /> 
            </label> 
            <button onClick={handleUpdate}>Save Changes</button> 

            <hr /> 

            <button onClick={handleDeleteAccount} style={{ color: "red" }}> Delete Account </button> 
        </div> 
    ); 
};

export default Profile;
