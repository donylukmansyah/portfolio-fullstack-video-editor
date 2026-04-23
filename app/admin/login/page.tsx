"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const signInResult = await authClient.signIn.email({
        email,
        password,
      });

      if (signInResult.error) {
        const bootstrapResponse = await fetch("/api/admin/bootstrap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (bootstrapResponse.ok) {
          const retryResult = await authClient.signIn.email({
            email,
            password,
          });

          if (!retryResult.error) {
            router.push("/admin");
            router.refresh();
            return;
          }
        }

        setError(signInResult.error.message ?? "Login failed.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-secondary-background">
      <div className="neo-panel flex w-[400px] flex-col gap-6 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-heading text-foreground">Admin Login</h1>
          <p className="mt-2 text-sm text-foreground/60">Enter your credentials to access the dashboard.</p>
        </div>

        {error && (
          <div className="rounded-base border-2 border-border bg-rose-500/20 px-4 py-2 text-sm font-heading text-rose-500 shadow-[2px_2px_0px_0px_var(--border)]">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading" htmlFor="email">Email</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading" htmlFor="password">Password</label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" disabled={loading} className="mt-2 text-md w-full font-heading font-bold" size="lg">
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
