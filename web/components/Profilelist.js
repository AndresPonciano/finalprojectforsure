import ProfileItem from "../components/ProfileItem";
import Pagination from "./Pagination";
import { useState } from "react";

const ProfileList = ({ profiles }) => {
  return (
    <div className="">
      {profiles.map((profile) => (
        <ProfileItem profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
