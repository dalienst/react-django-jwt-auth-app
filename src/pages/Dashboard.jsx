/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import axios from "axios";

const Dashboard = () => {
  const { user, tokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [person, setPerson] = useState([]);
  const controller = new AbortController();

  const fetchUser = async () => {
    try {
      const response = await api.get(`me/${user.user_id}/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      setPerson(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="dashboard">
        <h1>Welcome {person.username}</h1>
      </div>
    </>
  );
};

export default Dashboard;
