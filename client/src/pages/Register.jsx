import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSession } from "@/context/SessionContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, isAuthenticated } = useSession();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        name: credentials.name,
        email: credentials.email,
        phone: credentials.phone,
        password: credentials.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full flex justify-center p-4 md:p-12 lg:p-16">
      <div className="max-w-sm flex flex-col gap-4 items-center mt-12">
        <h1 className="text-lg font-semibold uppercase">Sign Up</h1>
        <p className="text-center text-sm">
          Sign Up to access an enhanced shopping experience.
        </p>

        {error && <span>{error.message}</span>}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            type="name"
            placeholder="Name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <Input
            type="phone"
            placeholder="Phone No."
            name="phone"
            value={credentials.phone}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button disabled={loading} type="submit">
            Sign Up
          </Button>
        </form>
        <p className="text-gray-500 text-sm text-center">
          Already a member?
          <Link to="/account/login" className="underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
