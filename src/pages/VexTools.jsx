import { useState } from "react";
import { Link } from "react-router-dom";

export function VexTools() {
    const [unlocked, setUnlocked] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === "4h") {
            setUnlocked(true);
        } else {
            setError("Incorrect");
        }
    };

    return (
        <>
            {!unlocked && (
                <div className="passwordOverlay">
                    <form className="passwordBox" onSubmit={handleSubmit}>
                        <div className="passwordPrompt">5th Card</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button type="submit">Submit</button>
                        {error && <p className="errorText">{error}</p>}
                    </form>
                </div>
            )}

            <div className="container3">
                <div className="navbarLeft">
                    <Link to="/">
                        <button className="genericButtonTrainer">BACK</button>
                    </Link>
                </div>
                <div className="vextoolsspace"></div>
                <div>
                    <Link to="/vexcalculator">
                        <button className="genericButtonTrainerSizeable">
                            VEXCALCULATOR
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
