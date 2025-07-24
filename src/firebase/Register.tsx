import { useState } from "react";
import type { FormEvent } from "react"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./fbConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>(''); 
    const [error, setError] = useState<string | null>(null);  
    const navigate = useNavigate(); 
    
    const handleRegister = async (e: FormEvent) => {  
    e.preventDefault();  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
