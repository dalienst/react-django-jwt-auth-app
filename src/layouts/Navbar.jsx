/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import { NavLink } from "react-router-dom";
import { publicLinks } from "../constants/links";
import { api } from "../api/axios";

const Navbar = () => {
  const { user, tokens, logout } = useContext(AuthContext);
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
    <div>
      <div className="navbar">
        <div className="small-nav">
          <h2>EngineBubble</h2>
        </div>
        <div className="nav-links">
          <input type="checkbox" name="checkbox_toggle" id="checkbox_toggle" />
          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>

          <div className="menu">
            {user ? (
              <>
                <li>
                  <h4>{person.is_engineer ? "Engineer" : "User"}</h4>
                </li>
                <li>
                  <NavLink onClick={logout} className="link">
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <h4 className="role">Guest</h4>
                </li>
                <li>
                  <NavLink className="link" to={publicLinks.Login}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
