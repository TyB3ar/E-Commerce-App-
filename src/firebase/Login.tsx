import { useState } from "react";
import type { FormEvent } from "react"; 
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./fbConfig";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>(''); 
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate(); 

    const handleLogin = async(e: FormEvent) => {
        e.preventDefault(); 
        try {
            await signInWithEmailAndPassword(auth, email, password); 
            alert("Login successful!");  
            navigate("/"); 
        } catch (err: any) {
            setError(err.message); 
        }
    };

    return (
    <>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Sign In</h2>
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
          <button type="submit">Login</button>
          {error && <p>{error}</p>}

          <div className="register-here">
            <h4>Don't have an account?</h4>
            <Link to="/register"><button>Register Here</button></Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login; 
