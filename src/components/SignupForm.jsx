import { useState } from "react";

export default function SignupForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);

   async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await fetch (
           "https://fsa-jwt-practice.herokuapp.com/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                }
        );

        const result = await response.json();
        console.log(result);
        setSubmitMessage(result.message);
        setToken(result.token);
    }   catch (err) {
        setError(error.message);
    }
   }


    return (
        <div>
        <h2>Sign up</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username:{" "}
                <input
                minLenght="8"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:{" "}
                <input
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button>Submit</button>
        </form>
        {submitMessage && (
            <p>
                {submitMessage} Welcome, {username}!
            </p>
        )}
        </div>
    );
}
