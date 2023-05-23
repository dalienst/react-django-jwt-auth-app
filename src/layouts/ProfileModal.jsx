import { Formik } from "formik";
import React, { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../authContext";

const ProfileModal = ({ setIsOpen, myprofile }) => {
    const { user, tokens } = useContext(AuthContext);
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Update your profile</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
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
                  await api.patch(``, {
                    headers: {
                      Authorization: `Bearer ${tokens.access}`,
                    },
                  });
                  setIsOpen(false);
                  toast.success("Profile updated");
                } catch (error) {}
              }}
            ></Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
