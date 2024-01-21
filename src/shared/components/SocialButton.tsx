"use client";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
import {
  FaRegStar,
  FaEnvelopesBulk,
  FaGithub,
  FaFacebookF,
} from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { Provider } from "@/types";

type SocialButtonsProps = {
  provider: Provider;
};
const SocialButton = ({ provider }: SocialButtonsProps) => {
  const { id, name } = provider;
  const TargetIcon = () => {
    switch (id) {
      case "google":
        return <FaGoogle />;
      case "facebook":
        return <FaFacebookF />;
      case "github":
        return <FaGithub />;
      case "auth0":
        return <FaRegStar />;
      default:
        return <FaEnvelopesBulk />;
    }
  };
  const targetColor =
    id === "google"
      ? "#4285f4"
      : id === "facebook"
      ? "#1877f2"
      : id === "github"
      ? "#23282C"
      : id === "auth0"
      ? "#EA5323"
      : "#000";
  return (
    <div className="[&_button]:transform-none">
      <button style={{ color: targetColor }} onClick={() => signIn(id)}>
        <div className="flex flex-col items-center">
          <TargetIcon />
          {name}
        </div>
      </button>
    </div>
  );
};

export { SocialButton };
