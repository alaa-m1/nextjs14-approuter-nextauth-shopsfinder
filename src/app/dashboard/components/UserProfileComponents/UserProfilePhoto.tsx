"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo } from "react";
import { BeatLoader } from "react-spinners";
import {
  ACCEPTED_IMAGE_TYPES,
  Alert,
  MAX_IMAGE_SIZE,
  CustomButton,
} from "@/shared";
import { toast } from "react-toastify";
import { UserInfo } from "@/types";
import { sizeInMB } from "@/utils/helpers";
import { MdClose } from "react-icons/md";
import { uploadProfilePhoto } from "@/app/actions/uploadProfilePhoto";
import { useSession } from "next-auth/react";

const UserGeneralInfoSchema = z.object({
  profilePhoto: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, "Image is required")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      );
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "File type is not supported"),
});

type UserSchemaType = z.infer<typeof UserGeneralInfoSchema>;

export const UserProfilePhoto = ({ userInfo }: { userInfo: UserInfo }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    defaultValues: {
      profilePhoto: undefined,
    },
    resolver: zodResolver(UserGeneralInfoSchema),
  });
  const { profilePhoto } = watch();
  const uploadedImages = useMemo(
    () => (profilePhoto ? Object.values(profilePhoto) : []),
    [profilePhoto]
  );
  const { update } = useSession();
  const onSubmit: SubmitHandler<UserSchemaType> = async () => {
    const formData = new FormData();

    formData.append("profilePhoto", uploadedImages[0]);
    formData.append("userId", userInfo.id);
    formData.append("imagePublicId", userInfo.image.publicId ?? "-1");

    const response = await uploadProfilePhoto(formData);
    if ([400, 500].includes(response.status)) {
      toast.error(response.message);
    } else {
      update({
        image: {
          imgURL: response.imageUrl,
          publicId: response.publicId,
          updatedAt: Date.now().toString(),
        },
      });
      toast.success(response.message);
      reset();
    }
  };

  const HandleResetInput = useCallback(() => {
    reset({});
    const inputElement = document.getElementById(
      "profile-photo"
    ) as HTMLInputElement;
    if (inputElement) inputElement.value = "";
  }, [reset]);

  const testingAccount =
    userInfo.email === process.env.NEXT_PUBLIC_TESTING_EMAIL;

  return (
    <fieldset className="fieldset-border">
      <legend>Update profile photo</legend>
      {testingAccount && (
        <Alert severity="warning">
          <span>{`Cannot update profile photo, becuase you are using your a testing account "${process.env.NEXT_PUBLIC_TESTING_EMAIL}"`}</span>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <div className="p-0 my-[10px]">
          <div className={`relative w-[90%] text-left`}>
            <label
              htmlFor={"profile-photo"}
              className="border border-solid border-gray-400 rounded-sm p-1 hover:shadow-md cursor-pointer "
            >
              {`Select a new profile photo`}
            </label>
            <br />
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              {...register("profilePhoto")}
              className="mb-1 hidden"
            />
            {errors.profilePhoto?.message && (
              <Alert severity="error">
                <span>{errors.profilePhoto?.message}</span>
              </Alert>
            )}
            <ProfilePhotoCard
              uploadedImages={uploadedImages}
              onResetInput={HandleResetInput}
            />
          </div>
        </div>
        <CustomButton
          isLoading={isSubmitting}
          loadingIndicator={<BeatLoader color="#36d7b7" size={10} />}
          variant="contained"
          label="Save"
          disabled={uploadedImages.length === 0 || testingAccount}
        />
      </form>
    </fieldset>
  );
};

export const ProfilePhotoCard = ({
  uploadedImages,
  onResetInput,
}: {
  uploadedImages: Array<File>;
  onResetInput: () => void;
}) => {
  return uploadedImages.length > 0 ? (
    <div className="relative w-fit mt-2">
      {uploadedImages.map((img, index) => (
        <img
          key={index}
          src={URL.createObjectURL(img)}
          alt={img.name}
          className="h-[150px] aspect-auto my-1"
        />
      ))}
      <button
        className="absolute top-[5px] right-[10px]"
        onClick={() => onResetInput()}
      >
        <MdClose className="font-bold inline-block hover:bg-purple-200" />
      </button>
    </div>
  ) : null;
};
