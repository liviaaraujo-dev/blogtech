"use client";

import SignInBtns from "@/components/SignInBtns";
import { useState } from "react";

interface Token {
  token: string;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  async function clickSignIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        console.error('Error entrar');
        return;
      } 

      const data = await response.json() as { token: string };
      setToken(data.token)
      console.log(token)
  }

  return (
    <>
      {/* <SignInBtns /> */}
      <form className="flex flex-col items-center gap-4">
        <h1 className="text-center mt-8">Sign In</h1>

        <div className="flex flex-col w-[20rem] gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" onClick={clickSignIn} type="button">
          Entrar
        </button>
      </form>
    </>
  );
}
