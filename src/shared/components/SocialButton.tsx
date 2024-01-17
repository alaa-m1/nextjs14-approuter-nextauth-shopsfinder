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

type Provider = {
  id: string;
  name: string;
  signinUrl: string;
  callbackUrl: string;
};

type SocialButtonsProps = {
  provider: Provider;
  // page: string;
  csrfToken: string;
  // index: number;
};
const SocialButton = ({
  provider,
  // page,
  csrfToken,
}: // index,
SocialButtonsProps) => {
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
      <form method="post" action={`/api/auth/signin/${id}`}>
        <input type="hidden" name={csrfToken} defaultValue={csrfToken} />
        <button className={`text-[${targetColor}]`} onClick={() => signIn(id)}>
          <TargetIcon />
          {name}
        </button>
      </form>
    </div>
  );
};

export { SocialButton };
