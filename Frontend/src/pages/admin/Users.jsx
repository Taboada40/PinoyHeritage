import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import UsersSection from "../../components/admin/UsersOverview";
import "../../styles/admin/users.css";

const Users = () => {

  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="page-header"></div>
        <UsersSection />
      </main>
    </>
  );
};

export default Users;