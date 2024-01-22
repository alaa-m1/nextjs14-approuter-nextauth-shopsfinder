"use client";
import React from "react";
import { MdClose } from "react-icons/md";
type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onDialogClose: () => void;
};
export const Dialog = ({ open, onDialogClose, children }: ModalProps) => {
  return open ? (
    <div
      role="dialog"
      className="relative z-30"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        role="button"
        className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onDialogClose}
      ></div>

      <div className="fixed flex-col inset-16 z-31 overflow-y-auto bg-white shadow-md">
        <div className="flex justify-end shadow-sm my-2 mx-1 px-2">
          <button onClick={onDialogClose} className="mb-1">
            <div className="place-items-start">
              <MdClose className="font-bold inline-block" />
            </div>
          </button>
        </div>
        <div className="m-3 p-1">{children}</div>
      </div>
    </div>
  ) : null;
};
