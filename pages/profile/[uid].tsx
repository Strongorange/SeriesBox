import React from "react";
import { useUserStore } from "../../stores/userStore";

const UserProfile = () => {
  const { user, isGuest } = useUserStore();

  return (
    <div className="flex w-full flex-col p-PageLR pt-[10vh] text-Primary">
      <h4>
        {isGuest && "안녕하세요 게스트님 :)"}
        {!isGuest && `${user?.email} 님 :)`}
      </h4>
      <p className="text-lg">해당 페이지는 준비 중 입니다</p>
    </div>
  );
};

export default UserProfile;
