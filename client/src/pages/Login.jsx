import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import styled from 'styled-components';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from "../utils/APIRoutes.js";

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const handleValidation = () => {
    const { username, password } = userData;
    if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = userData;
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem(
            "Chatapp",
            JSON.stringify(data.user)
          );
          toast.success("Logged In", toastOptions);
          setTimeout(() => navigate("/"), 2000); // Adjust delay as needed
        }
      } catch (error) {
        toast.error("An error occurred during login", toastOptions);
      }
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <div className="h-full w-full flex items-center justify-center relative top-20">
        <form onSubmit={handleSubmit} className="h-2/5 w-2/6 flex flex-col items-center justify-center border border-black gap-4 rounded-lg">
          <div className="h-1/2 w-1/2 flex items-center justify-center">
            <img src={logo} alt="logo" className="w-1/2 h-1/2" />
          </div>
          <input
            type="text"
            className="p-4 rounded opacity-80 w-96 hover:opacity-60 transition-all duration-500"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            className="p-4 rounded opacity-80 w-96 hover:opacity-60 transition-all duration-500"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button data-label="Register" className="rainbow-hover border-black border-2">
            <span className="sp">Login</span>
          </button>
          <span className="opacity-50">Don&apos;t have an account? <Link to='/register' className="underline ml-1 opacity-95 font-bold">Register</Link></span>
        </form>
      </div>
      <ToastContainer />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  .rainbow-hover {
    font-size: 16px;
    font-weight: 700;
    color: #ff7576;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 12px 24px;
    position: relative;
    line-height: 24px;
    border-radius: 9px;
    box-shadow: 0px 1px 2px #2B3044,
      0px 4px 16px #2B3044;
    transform-style: preserve-3d;
    transform: scale(var(--s, 1)) perspective(600px)
      rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    perspective: 600px;
    transition: transform 0.1s;
  }

  .sp {
    background: white;
    opacity: 70%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    display: block;
  }

  .rainbow-hover:active {
    transition: 0.3s;
    transform: scale(0.93);
  }
`;
