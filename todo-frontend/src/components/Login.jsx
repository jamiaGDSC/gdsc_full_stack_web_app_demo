import { useState } from "react";

const Login = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await fetch(
        "https://todo-api-production.up.railway.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        window.alert(data.msg);
        return;
      }
      const { user } = data;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.log(err);
      window.alert("Unexpected error occured");
    }
  };

  return (
    <form method="POST" className="loginForm">
      <div className="loginText">Login</div>
      <label htmlFor="userName" className="loginLabel">
        Username
      </label>
      <input
        className="loginInput"
        name="userName"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <label htmlFor="userName" className="loginLabel">
        Password
      </label>
      <input
        className="loginInput"
        name="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="loginSubmit" type="button" onClick={login}>
        Submit
      </button>
    </form>
  );
};

export default Login;
