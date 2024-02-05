"use client";
import { UserInfo } from "@/types";
import { useSession } from "next-auth/react";

export const useUserInfo = (): {
  userInfo: UserInfo;
  status: "authenticated" | "loading" | "unauthenticated";
} => {
  const { data: session, status } = useSession();
  const userInfo: UserInfo = {
    provider: session?.user?.provider ?? "",
    userName: session?.user?.userName ?? "",
    firstName: session?.user?.firstName ?? "",
    lastName: session?.user?.lastName ?? "",
    address: session?.user?.address ?? "",
    mobile: session?.user?.mobile ?? "",
    email: session?.user?.email ?? "",
    gender: session?.user?.gender ?? "custom",
    image: {
      publicId: session?.user?.image.publicId ?? "",
      imgURL: session?.user?.image.imgURL ?? "/images/user-icon.png",
      ...session?.user?.image,
    },
    expires_at: session?.expires ?? "0",
    id: session?.user?.id ?? "-1",
  };
  return { userInfo, status };
};
