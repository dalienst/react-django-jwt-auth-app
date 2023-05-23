/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { api } from "../api/axios";
import ProfileModal from "../layouts/ProfileModal";
import { Link } from "react-router-dom";
import { privateLinks, publicLinks } from "../constants/links";

export default function Profiles() {
  const { user, tokens } = useContext(AuthContext);
  const [profile, SetProfile] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const controller = new AbortController();

  const userId = user.user_id;

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

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Your Profile</h2>
        </div>
        <div className="card-body">
          <p>
            <strong>Firstname: </strong>
            {profile?.firstname}
          </p>
          <p>
            <strong>Lastname: </strong>
            {profile?.lastname}
          </p>
          <p>
            <strong>Date of Birth: </strong>
            {profile?.dob}
          </p>
          <p>
            <strong>Location: </strong>
            {profile?.location}
          </p>
          <p>
            <strong>Contact: </strong>
            {profile?.phonenumber}
          </p>
          <p>
            <strong>Bio: </strong>
            {profile?.bio}
          </p>
          {/* Try reaching the image */}
        </div>

        <div className="card-buttons">
          <button className="btn" onClick={() => setOpen(true)}>
            Update Profile
          </button>
          {isOpen && <ProfileModal setOpen={setOpen} myprofile={profile} />}
        </div>

        <div className="home-btn">
          <Link to={privateLinks.Dashboard} className="home-link">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
