import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Todos from "./components/Todos";

const App = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="App">
      <nav className="App-nav">
        <h4 className="App-title">Todo Management App</h4>
        {user && <p>Welcome {user.userName}</p>}
        <span className="logoutBtn" onClick={logOut}>
          Logout
        </span>
      </nav>
      {user ? <Todos user={user} /> : <Login setUser={setUser} />}
    </div>
  );
};

export default App;
