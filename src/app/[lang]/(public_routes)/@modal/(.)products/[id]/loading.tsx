import React from "react";
import { Modal } from "@/shared";
import { LoadingContent } from "@/app/[lang]/products/[id]/components";
const Loading = () => {
  return (
    <Modal>
      <LoadingContent />
    </Modal>
  );
};
export default Loading;
