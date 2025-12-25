"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useAppSelector } from "@/app/store/hooks";
import { Button } from "@/components/ui/button";

export default function AuthTestPage() {
  const { data: session, status } = useSession();
  const authState = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Auth Test Page</h1>

        <div className="space-y-1 text-sm">
          <p>
            <strong>next-auth status:</strong>{" "}
            <span className="font-mono">{status}</span>
          </p>
          <p>
            <strong>Redux auth status:</strong>{" "}
            <span className="font-mono">{authState.status}</span>
          </p>
        </div>

        <hr />

        {status === "authenticated" && session?.user ? (
          <div className="space-y-4">
            <div className="space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {session.user.name ?? "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {session.user.email ?? "N/A"}
              </p>
            </div>

            <Button
              onClick={() => signOut({ callbackUrl: "/auth-test" })}
              variant="destructive"
              className="w-full"
            >
              Sign out
            </Button>
          </div>
        ) : (
          /* Unauthenticated state */
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You are not logged in.
            </p>

            <Button
              onClick={() => signIn("google", { callbackUrl: "/auth-test" })}
              className="w-full"
            >
              Sign in with Google
            </Button>
          </div>
        )}

        <hr />

        {/* Debug block (optional but useful) */}
        <details className="text-xs">
          <summary className="cursor-pointer">Debug Redux State</summary>
          <pre className="mt-2 rounded bg-muted p-2">
            {JSON.stringify(authState, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
