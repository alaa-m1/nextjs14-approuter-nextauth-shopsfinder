import React from "react";
import { Modal } from "@/shared";
import { NavPanel } from "./NavPanel";

type ProductModalProps = {
  children: React.ReactNode;
};
export const ProductModal = ({ children }: ProductModalProps) => {
  return (
    <Modal>
      <NavPanel />
      {children}
    </Modal>
  );
};
