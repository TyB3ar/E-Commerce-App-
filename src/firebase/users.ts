import { db } from "../firebase/fbConfig"; 
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export interface UserProfile { 
    uid: string; 
    email: string; 
    name?: string; 
    address?: string; 
} 

// Create user document after registration 
export const createUserProfile = async (user: UserProfile) => { 
    const userRef = doc(db, "users", user.uid); 
    await setDoc(userRef, user); 
}; 

// Read user profile 
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => { 
    const userRef = doc(db, "users", uid); 
    const docSnap = await getDoc(userRef); 
    if (docSnap.exists()) { 
        return docSnap.data() as UserProfile; 
    } 
    return null; 
}; 

// Update user profile fields (partial update) 
export const updateUserProfile = async (uid: string, updatedData: Partial<UserProfile>) => { 
    const userRef = doc(db, "users", uid); 
    await updateDoc(userRef, updatedData); 
}; 

// Delete user profile document 
export const deleteUserProfile = async (uid: string) => { 
    const userRef = doc(db, "users", uid); 
    await deleteDoc(userRef); 
};

