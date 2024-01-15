"use client";
import { useRouter } from "next/navigation";
import React from "react";
type ModalProps = {
  children: React.ReactNode;
};
export const Modal = ({ children }: ModalProps) => {
  const router = useRouter();
  const handleOnClose = () => router.back();
  return (
    <div
      role="dialog"
      className="relative z-30"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        role="button"
        className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={handleOnClose}
      ></div>

      <div className="fixed inset-16 z-31 overflow-y-auto bg-white shadow-md">
        <div className="m-3">
          {children}
          </div>
      </div>
    </div>
  );
};
