"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import {
  setAuthLoading,
  setAuthenticated,
  setUnauthenticated,
} from "@/app/store/slices/authSlice";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "loading") {
      dispatch(setAuthLoading());
    } else if (status === "authenticated" && session?.user) {
      dispatch(
        setAuthenticated({
          id: session.user.email ?? undefined, // assume email to be unique with users
          email: session.user.email ?? undefined,
          name: session.user.name ?? undefined,
        }),
      );
    } else {
      dispatch(setUnauthenticated());
    }
  }, [status, session, dispatch]);

  return null;
}
