import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("https://dashboredjsapi.onrender.com/api/users/signup", formData);
            const userId = response.data.user.id;
            await axios.post("https://dashboredjsapi.onrender.com/api/cardarrays", {
                uid: userId,
                cardArray: []
            });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className ="loginSignupImageContainer2">
             <div className="navbar">
                <div className="navbarLeft">
                    <Link to="/">
                        <button className="genericButton">BACK</button>
                    </Link>
                </div>
            </div>
            <div className = "sectionLoginSignuptxt">
                <div className="txtLoginSignup">Sign Up</div>
            </div>
            <div className ="containerLoginSignup">
                <div className = "sectionLoginSignup">
                    {error && <p className="txtLoginSignupError">{error}</p>}
                    <form className = "form" onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        <button className="genericButton" type="submit">SIGN UP</button>
                        <Link to="/login">
                        <button className="genericButton">LOG IN</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
