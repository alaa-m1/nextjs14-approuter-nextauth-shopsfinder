"use client";
import { MdLock } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import React, { useEffect, useMemo, useState } from "react";
import { BeatLoader } from "react-spinners";
import { SubmitButton, TextField } from "@/shared";
import { toast } from "react-toastify";
import { resetPassword } from "@/app/actions/resetPassword";

const UserSchema = z
  .object({
    password: z
      .string()
      .min(8, "The password must be at least 8 characters")
      .max(60, "The password must be less than 60 characters"),
    confirmPassword: z.string(),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetSchemaType = z.infer<typeof UserSchema>;

type ResetPanelProps = {
  userToken: string;
  csrfToken: string | undefined;
};
export const ResetPanel = ({ userToken,csrfToken }: ResetPanelProps) => {
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetSchemaType>({ resolver: zodResolver(UserSchema) });

  const onSubmit: SubmitHandler<ResetSchemaType> = async (submitData) => {
    const formData=new FormData()
    formData.append("password", submitData.password)
    formData.append("userToken", userToken)
    formData.append("csrfToken", csrfToken!)
    const response = await resetPassword(formData);

    if ([400, 500].includes(response.status)) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      reset();
    }
  };

  const { password } = watch();
  useEffect(() => {
    const calculatePasswordStrengthScore = () => {
      return zxcvbn(password ?? "").score;
    };
    setPasswordScore(calculatePasswordStrengthScore());
  }, [password]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
      <input type="hidden" name="csrfToken" defaultValue={"qweqweqweqwe"} />
      <TextField
        name="password"
        label="New Password"
        placeholder=""
        icon={<MdLock />}
        type="password"
        register={register}
        errors={errors.password?.message}
        disabled={isSubmitting}
        required
        defaultValue=""
      ></TextField>
      {watch().password &&
        watch().password.length > 0 &&
        !errors.password?.message && (
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
        name="confirmPassword"
        label="Confirm Password"
        placeholder=""
        icon={<MdLock />}
        type="password"
        register={register}
        errors={errors.confirmPassword?.message}
        disabled={isSubmitting}
        autoComplete="off"
        required
      ></TextField>
      <SubmitButton
        isLoading={isSubmitting}
        loadingIndicator={<BeatLoader color="#36d7b7" size={10} />}
        variant="contained"
        label="Reset Password"
      />
    </form>
  );
};
