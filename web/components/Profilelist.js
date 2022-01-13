import ProfileItem from "../components/ProfileItem";
import { useState } from "react";

const ProfileList = ({ profiles }) => {
  console.log('in profiles', profiles)

  return (
    <div className="">
      {profiles.map((profile) => (
        <div key={profile.id}>
          <ProfileItem profile={profile} />
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
