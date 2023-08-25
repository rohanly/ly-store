import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSession } from "@/context/SessionContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useSession();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full flex justify-center items-center p-4 md:p-12 lg:p-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="font-semibold text-xl"> WELCOME BACK</h2>
          <p className="text-center text-sm">
            Sign in to access an enhanced shopping experience.
          </p>
        </div>
        {error && <span>Something went wrong! please try again.</span>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
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
            Enter
          </Button>
        </form>
        {/* <p className="text-gray-500 text-sm text-center">
          Not a member?{" "}
          <Link to="/account/register" className="underline">
            Join us
          </Link>
        </p> */}
      </div>
    </section>
  );
}
