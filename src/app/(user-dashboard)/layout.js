import Link from "next/link";
import React from "react";

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-[100vh] ">
      <div className="w-[20%] h-[100%]">
        <div className=" flex flex-col items-center  gap-4">
          <h1 className="p-4 rounded-md mt-4 font-bold">
            Dashboard
          </h1>
          <Link href={"/"}>Home</Link>
          <Link href={"/dashboard/profile"}>Profile</Link>
        </div>
      </div>
      <div className="w-[80%] h-[100%] ">{children}</div>
    </div>
  );
};

export default UserDashboardLayout;
