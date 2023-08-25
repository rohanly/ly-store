import React from "react";
import AddProduct from "./AddProduct";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {

  return (
    <nav className="flex justify-end items-center pt-4">
      <AddProduct />
    </nav>
  );
};

export default AdminNav;
