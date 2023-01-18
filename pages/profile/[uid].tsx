import React from "react";
import { useUserStore } from "../../stores/userStore";

const UserProfile = () => {
  const { user } = useUserStore();

  return (
    <div className="flex w-full flex-col p-PageLR">
      <h3>안녕하세요 {user?.displayName ? user.displayName : "노루"} 님!</h3>
    </div>
  );
};

export default UserProfile;
