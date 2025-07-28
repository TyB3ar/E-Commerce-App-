import { useState } from "react";
import type { FormEvent } from "react"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./fbConfig";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./fbConfig";

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>(''); 
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>(''); 
    const [error, setError] = useState<string | null>(null);  
    const navigate = useNavigate(); 
    
    const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Save user profile in Firestore
      await setDoc(doc(db, "users", uid), {
        email,
        name,
        address,
        createdAt: new Date()
      });

      alert("Registration successful!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input 
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) =>setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Address (optional)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div> 
  );
};

export default Register; 
