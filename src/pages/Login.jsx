import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
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
            const response = await axios.post("https://dashboredjsapi.onrender.com/api/users/login", formData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("username", response.data.user.username);
            navigate("/dashbored");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className ="container2">
            <div className = "sectionDashboredwtb">
                <div className="txtLoginSignup">Log In</div>
            </div>
            <div className = "sectionLoginSignup">
                {error && <p className="txtLoginSignupError">{error}</p>}
                <form className = "form" onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button className="genericButton" type="submit">LOG IN</button>
                    <Link to="/signup">
                    <button className="genericButton">SIGN UP</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
