"use client";
import { MdLock } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import React, { useEffect, useMemo, useState } from "react";
import { BeatLoader } from "react-spinners";
import {
  Alert,
  SubmitButton,
  TextField,
  externalProviders
} from "@/shared";
import { toast } from "react-toastify";
import { schemaForType } from "@/types/new-types.d";
import { UserInfo } from "@/types";
import { updateUserPassword } from "@/app/actions/updateUserPassword";

const UserGeneralInfoSchema = schemaForType<{
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}>()(
  z
    .object({
      currentPassword: z
        .string()
        .min(8, "The password must be at least 8 characters")
        .max(60, "The password must be less than 60 characters"),
      newPassword: z
        .string()
        .min(8, "The password must be at least 8 characters")
        .max(60, "The password must be less than 60 characters"),
      newConfirmPassword: z.string(),
    })
    .refine(
      (formData) => formData.newPassword === formData.newConfirmPassword,
      {
        message: "Passwords do not match",
        path: ["newConfirmPassword"],
      }
    )
);

type UserSchemaType = z.infer<typeof UserGeneralInfoSchema>;

export const UserPassword = ({ userInfo }: { userInfo: UserInfo }) => {
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserGeneralInfoSchema),
  });
  const onSubmit: SubmitHandler<UserSchemaType> = async (formData) => {
    const response = await updateUserPassword({ ...formData, id: userInfo.id });
    if ([400, 500].includes(response.status)) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      reset();
    }
  };

  const { newPassword } = watch();
  useEffect(() => {
    const calculatePasswordStrengthScore = () => {
      return zxcvbn(newPassword ?? "").score;
    };
    setPasswordScore(calculatePasswordStrengthScore());
  }, [newPassword]);

  const passwordScoreColor = useMemo(() => {
    if (passwordScore <= 2) return "#f00";
    if (passwordScore < 4) return "#ff0";
    return "#0f0";
  }, [passwordScore]);

  const PasswordScoreLabel = useMemo(() => {
    if (passwordScore <= 2)
      return <span className="text-[#f00] font-bold">Weak</span>;
    if (passwordScore < 4)
      return <span className="text-[#ff0] font-bold">Medium</span>;
    return <span className="text-[#0f0] font-bold">Strong</span>;
  }, [passwordScore]);
  const canUpdate = !externalProviders.includes(userInfo.provider);
  return (
    <fieldset className="fieldset-border">
      <legend>Update user password</legend>
      {!canUpdate && (
        <Alert severity="warning">
          <span>{`Cannot update password, becuase you are  using your ${userInfo.provider} account to signin`}</span>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <TextField
          name="currentPassword"
          label="Current Password"
          placeholder=""
          icon={<MdLock />}
          type="password"
          register={register}
          errors={errors.currentPassword?.message}
          disabled={isSubmitting || !canUpdate}
          autoComplete="off"
          required
          defaultValue=""
        ></TextField>
        <br />
        <TextField
          name="newPassword"
          label="New Password"
          placeholder=""
          icon={<MdLock />}
          type="password"
          register={register}
          errors={errors.newPassword?.message}
          disabled={isSubmitting || !canUpdate}
          autoComplete="off"
          required
          defaultValue=""
        ></TextField>
        {watch().newPassword &&
          watch().newPassword.length > 0 &&
          !errors.newPassword?.message && (
            <div className="grid items-center grid-cols-6 mb-[15px] ml-[10px] m-[-10px]">
              <div>{PasswordScoreLabel}</div>
              {Array.from(Array(4).keys()).map((_, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: passwordScoreColor,
                  }}
                  className={`h-[8px] rounded-[5px] mx-[5px] box-border`}
                ></div>
              ))}
            </div>
          )}
        <TextField
          name="newConfirmPassword"
          label="New Confirm Password"
          placeholder=""
          icon={<MdLock />}
          type="password"
          register={register}
          errors={errors.newConfirmPassword?.message}
          disabled={isSubmitting || !canUpdate}
          autoComplete="off"
          required
        ></TextField>
        <SubmitButton
          isLoading={isSubmitting}
          loadingIndicator={<BeatLoader color="#36d7b7" size={10} />}
          variant="contained"
          label="Save"
          disabled={!canUpdate}
        />
      </form>
    </fieldset>
  );
};
