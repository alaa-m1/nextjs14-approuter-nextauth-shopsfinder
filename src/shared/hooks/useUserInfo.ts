"use client";
import { getUserPhoto } from "@/app/actions/uploadProfilePhoto";
import { UserInfo, UserPhoto } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import userImgSrc from "@/assets/images/user-icon.png";


export const useUserInfo = (): {
  userInfo: UserInfo;
  status: "authenticated" | "loading" | "unauthenticated";
} => {
  const { data: session, status } = useSession();
  const [userPhoto, setUserPhoto] = useState<UserPhoto | null>(null);

  useEffect(() => {
    const getProfilePhoto = async () => {
      const photos: Array<UserPhoto> | null = await getUserPhoto(
        session?.user?.id ?? "-1"
      );
      if (photos) {
        setUserPhoto({
          imgURL: photos[0]?.imgURL ?? session?.user.image.imgURL,
          publicId: photos[0]?.publicId ? photos[0]?.publicId : "",
          updatedAt: photos[0]?.updatedAt ? photos[0]?.updatedAt : "",
          createdAt: photos[0]?.createdAt ? photos[0]?.createdAt : "",
        });
      }
    };
    getProfilePhoto();
  }, [session?.user?.id, session?.user.image.imgURL]);
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
      publicId: userPhoto?.publicId ?? "",
      imgURL: userPhoto?.imgURL ?? userImgSrc,
      ...userPhoto,
    },
    expires_at: session?.expires ?? "0",
    id: session?.user?.id ?? "-1",
  };
  return { userInfo, status };
};
