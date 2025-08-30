"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import userStore, { type User } from "@/store/user";

function Page() {
  const router = useRouter();
  const { setUser } = userStore();

  const [isLogin, setIsLogin] = React.useState(true);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const target = e.currentTarget;

    const payload = isLogin
      ? {
          email: target.email.value,
          password: target.password.value,
        }
      : {
          email: target.email.value,
          password: target.password.value,
          firstName: target.firstName.value,
          lastName: target.lastName.value,
        };

    const res = await fetch(`/api/auth/${isLogin ? "login" : "register"}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();

      setError(err);
      setLoading(false);
    } else {
      const data = (await res.json()) as User;
      setUser(data);

      router.replace("/");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <form
        className="border-primary flex h-fit w-full max-w-sm flex-col gap-4 rounded-2xl border p-4 shadow-md shadow-black"
        onSubmit={handleLogin}
      >
        <h1 className="text-center text-2xl font-bold">
          {isLogin ? "Login" : "Register"}
        </h1>
        {isLogin ? (
          <>
            <Input
              variant="outline"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              variant="outline"
              required
              name="password"
              type="password"
              placeholder="Password"
            />
          </>
        ) : (
          <>
            <Input
              variant="outline"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              variant="outline"
              required
              name="firstName"
              type="text"
              placeholder="First name"
            />
            <Input
              variant="outline"
              required
              name="lastName"
              type="text"
              placeholder="Last name"
            />
            <Input
              variant="outline"
              required
              name="password"
              type="password"
              placeholder="Password"
            />
          </>
        )}
        <Button loading={loading} type="submit" className="rounded-full">
          {isLogin ? "Login" : "Register"}
        </Button>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </form>
      <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New Account?" : "Already have an account?"}
      </Button>
    </div>
  );
}

export default Page;
