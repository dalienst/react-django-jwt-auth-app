/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { api } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { privateLinks } from "../constants/links";
import { publicLinks } from "../constants/links";
import { toast } from "react-toastify";
import UserDetailModel from "../layouts/UserDetailModal";

const Dashboard = () => {
  const { user, tokens } = useContext(AuthContext);
  const [person, setPerson] = useState([]);
  const [profile, SetProfile] = useState([]);
  const { navigate } = useNavigate();
  const [open, setInOpen] = useState(false);
  const controller = new AbortController();

  const userId = user.user_id;

  const fetchUser = async () => {
    try {
      const response = await api.get(`me/${userId}/`, {
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

  const fetchProfile = async () => {
    try {
      const response = await api.get(`profile/${userId}/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      SetProfile(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProfile();
    return () => {
      controller.abort();
    };
  }, []);

  function deleteAccount(id) {
    try {
      api.delete(`me/${id}/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      navigate(publicLinks.Landing, { replace: true });
      toast.success("Account has been deleted");
    } catch (error) {
      toast.error("Cannot delete at the moment. Try again later");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Your Info</h2>
        </div>

        <div className="card-body">
          <p>
            <strong>Email: </strong>
            {person.email}
          </p>
          <p>
            <strong>Username: </strong>
            {person.username}
          </p>
        </div>

        <div className="card-buttons">
          <button className="btn" onClick={() => setInOpen(true)}>
            Update Details
          </button>
          {open && <UserDetailModel setInOpen={setInOpen} userdata={person} />}
          <button
            onClick={() => deleteAccount(person.id)}
            type="submit"
            className="delete-button"
          >
            Delete Account
          </button>
          <Link to={privateLinks.Profile} className="home-link">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
