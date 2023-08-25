import React from "react";
import AdminNav from "@/pages/admin/AdminNav";
import AdminDataTable from "@/pages/admin/AdminDataTable";
import AddProduct from "@/pages/admin/AddProduct";

const Admin = () => {
  return (
    <section className="container flex flex-col ">
      <AdminNav />
      <AdminDataTable />
    </section>
  );
};

export default Admin;
