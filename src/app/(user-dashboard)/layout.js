import Link from "next/link";
import React from "react";

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-[100vh] bg-green-500 ">
      <div className="w-[20%] h-[100%] bg-slate-500">
        <div className=" flex flex-col items-center  gap-4">
          <h1 className="bg-orange-600 p-4 rounded-md mt-4 font-bold">
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
