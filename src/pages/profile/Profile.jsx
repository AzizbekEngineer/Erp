import React, { useState } from "react";
import { useGetAdminsQuery } from "../../context/api/adminApi";
import { FaRegUser } from "react-icons/fa";
import { LuUserCheck } from "react-icons/lu";
import { MdOutlinePhone } from "react-icons/md";
import Module from "../../components/Module/Module.jsx";
import { BiSolidEdit } from "react-icons/bi";

import "./profile.scss";
import ProfileEdit from "../../components/profileEdit/ProfileEdit";

const Profile = () => {
  const { data } = useGetAdminsQuery();
  const [profilEdit, setProfileEdit] = useState(false);

  console.log(data?.innerData?.user);

  let profile = data?.innerData?.user;

  return (
    <div className="profile">
      <div className="profile__info">
        <div className="profile__info__top">
          <button className="profile__info__fullname">
            {profile?.lname?.slice(0, 1)}
            {profile?.fname?.slice(0, 1)}
          </button>
          <button
            className="profile__info__edit"
            onClick={() => setProfileEdit(true)}
          >
            <BiSolidEdit />
          </button>
        </div>
        <span>To'liq ism Familiya</span>
        <h3>
          <FaRegUser />
          {profile?.lname} {profile?.fname}
        </h3>
        <span>username</span>
        <h3>
          {" "}
          <LuUserCheck />
          {profile?.username}
        </h3>
        <span>Telefon Raqam</span>
        <h3>
          <MdOutlinePhone />
          {profile?.phone_primary}
        </h3>
        {profilEdit ? (
          <Module width={500} close={setProfileEdit} bg={"#aaa6"}>
            <ProfileEdit close={setProfileEdit} data={data?.innerData?.user} />
          </Module>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
