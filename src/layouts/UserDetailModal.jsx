/* eslint-disable no-useless-concat */
import React, { useContext } from "react";
import { AuthContext } from "../authContext";
import { RiCloseLine } from "react-icons/ri";
import { Form, Formik, Field } from "formik";
import { api } from "../api/axios";
import { toast } from "react-toastify";

const UserDetailModal = ({ setInOpen, userdata }) => {
  const { tokens } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer" + " " + tokens.access, // Assuming you're using a Bearer token
    },
  };
  return (
    <>
      <div className="darkBG" onClick={() => setInOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Update your details</h5>
          </div>
          <button className="closeBtn" onClick={() => setInOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className="modalContent">
            <Formik
              initialValues={{
                username: userdata?.username,
                email: userdata?.email,
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("username", values.username);
                formData.append("email", values.email);
                try {
                  await api.patch(`me/${userdata.id}/`, formData, config);
                  setInOpen(false);
                  toast.success("Details updated");
                } catch (error) {
                }
              }}
            >
              {({ touched }) => (
                <Form className="user-card">
                  <div className="update-input">
                    <label htmlFor="username">Username</label>
                    <Field name="username" className="input-field-entry" />
                  </div>

                  <div className="update-input">
                    <label htmlFor="email">Email</label>
                    <Field name="email" className="input-field-entry" />
                  </div>

                  <button type="submit" className="btn">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailModal;
