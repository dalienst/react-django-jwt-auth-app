import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { privateLinks } from "../constants/links";
import { toast } from "react-toastify";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(inputs);
      toast.success("Login successful");
      navigate(privateLinks.Dashboard);
    } catch (error) {
      toast.error("Login Failed");
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form className="auth-form" action="">
        <input
          required
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="email"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} type="submit">
          Login
        </button>
        {/* {err && <p>{err}</p>} */}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
