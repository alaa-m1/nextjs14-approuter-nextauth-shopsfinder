"use client";
import { SubmitHandler, UseFormReset, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { BeatLoader } from "react-spinners";
import {
  ACCEPTED_IMAGE_TYPES,
  Alert,
  MAX_IMAGE_SIZE,
  CustomButton,
} from "@/shared";
import { toast } from "react-toastify";
import { sizeInMB } from "@/utils/helpers";
import { MdClose } from "react-icons/md";
import { revalidate, uploadProfileImage } from "./actions/cloudinaryActions";
const UserGeneralInfoSchema = z.object({
  profileImage: z
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

export const UserCloudinaryImage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserGeneralInfoSchema),
  });
  const { profileImage } = watch();
  const importedImages = useMemo(
    () => (profileImage ? Object.values(profileImage) : []),
    [profileImage]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<UserSchemaType> = async (data) => {
    // const FilesList = data.profileImage;

    const formData = new FormData();
    for (const img of importedImages) {
      formData.append("profileImage", img);
    }
    const response = await uploadProfileImage(formData);
    if ([400, 500].includes(response.status)) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      revalidate("/");
      reset();
    }
  };

  return (
    <fieldset className="fieldset-border">
      <legend>Update user image</legend>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <div className="p-0 my-[10px]">
          <div className={`relative w-[90%] text-left`}>
            <label htmlFor={"select-gender"} className="ml-[5px]">
              {`User Image *`}
            </label>
            <br />
            <input
              type="file"
              accept="image/*"
              {...register("profileImage")}
              className="mb-1"
              multiple
            />
            {errors.profileImage?.message && (
              <Alert severity="error">
                <span>{errors.profileImage?.message}</span>
              </Alert>
            )}
            <ImageCard importedImages={importedImages} reset={reset} />
          </div>
        </div>
        <CustomButton
          isLoading={isSubmitting}
          loadingIndicator={<BeatLoader color="#36d7b7" size={10} />}
          variant="contained"
          label="Save"
        />
      </form>
    </fieldset>
  );
};

export const ImageCard = ({
  importedImages,
  reset,
}: {
  importedImages: Array<File>;
  reset: UseFormReset<{
    profileImage: FileList;
  }>;
}) => {
  return importedImages.length > 0 ? (
    <div className="relative w-fit">
      {importedImages.map((img, index) => (
        <img
          key={index}
          src={URL.createObjectURL(img)}
          alt={img.name}
          className="h-[150px] aspect-auto my-1"
        />
      ))}
      <button
        className="absolute top-[5px] right-[10px]"
        onClick={() => reset({})}
      >
        <MdClose className="font-bold inline-block hover:bg-purple-200" />
      </button>
    </div>
  ) : null;
};
