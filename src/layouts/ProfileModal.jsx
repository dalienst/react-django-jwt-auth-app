/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
import { Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../authContext";
import { Link } from "react-router-dom";
import { privateLinks } from "../constants/links";

const ProfileModal = ({ setOpen, myprofile }) => {
  const { user, tokens } = useContext(AuthContext);
  // const userId = user.user_id;
  const config = {
    headers: {
      Authorization: "Bearer" + " " + tokens.access, // Assuming you're using a Bearer token
    },
  };

  return (
    <>
      <div className="darkBG" onClick={() => setOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Update your profile</h5>
          </div>
          <button className="closeBtn" onClick={() => setOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className="modalContent">
            <Formik
              initialValues={{
                firstname: myprofile?.firstname,
                lastname: myprofile?.lastname,
                dob: myprofile?.dob,
                location: myprofile?.location,
                phonenumber: myprofile?.phonenumber,
                bio: myprofile?.bio,
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("firstname", values.firstname);
                formData.append("lastname", values.lastname);
                formData.append("dob", values.dob);
                formData.append("location", values.location);
                formData.append("phonenumber", values.phonenumber);
                formData.append("bio", values.bio);
                try {
                  await api.patch(
                    `profile/${user?.user_id}/`,
                    formData,
                    config
                  );
                  setOpen(false);
                  toast.success("Profile updated");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ touched }) => (
                <Form className="profile-card">
                  <div className="update-input">
                    <label htmlFor="firstname">First Name</label>
                    <Field name="firstname" className="input-field-entry" />
                  </div>

                  <div className="update-input">
                    <label htmlFor="lastname">Last Name</label>
                    <Field name="lastname" className="input-field-entry" />
                  </div>

                  <div className="update-input">
                    <label htmlFor="dob">Date of Birth</label>
                    <Field
                      type="date"
                      name="dob"
                      className="input-field-entry"
                    />
                  </div>

                  <div className="update-input">
                    <label htmlFor="location">Country</label>
                    <Field name="location" className="input-field-entry" />
                  </div>

                  <div className="update-input">
                    <label htmlFor="phonenumber">Contact</label>
                    <Field name="phonenumber" className="input-field-entry" />
                  </div>

                  <div className="update-input">
                    <label htmlFor="bio">A little bit about yourself</label>
                    <Field
                      type="textbox"
                      name="bio"
                      className="input-field-entry"
                    />
                  </div>

                  <button type="submit" className="btn">
                    Submit
                  </button>
                  <div className="home-btn">
                    <Link to={privateLinks.Profile} className="home-link">
                      Back to Profile Page
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
