import React, { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { publicLinks, urls } from "../constants/links";
import { toast } from "react-toastify";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(urls.REGISTER, inputs);
      navigate(publicLinks.Login);
      toast.success("Account has been created");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form className="auth-form" action="">
        <input
          required
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} type="submit">
          Register
        </button>
        {/* {err && <p>{err}</p>} */}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
