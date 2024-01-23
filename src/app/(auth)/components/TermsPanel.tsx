"use client";
import { Alert, Dialog } from "@/shared";
import React, { useState } from "react";
import { UserSchemaType } from "../signup/page";
import { UseFormRegister } from "react-hook-form";

type TermsPanelProps = {
  error: string | undefined;
  register: UseFormRegister<UserSchemaType>;
};
export const TermsPanel = ({ error, register }: TermsPanelProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialog = () => setOpenDialog(true);
  return (
    <>
      <div className="text-left mb-[20px]">
        <input type="checkbox" id="accept" {...register("accept")} />
        <label htmlFor="id">
          {" I accept * "}&nbsp;
          <button type="button" onClick={handleOpenDialog}>
            <span className="font-bold">{"terms and conditions"}</span>
          </button>
        </label>
        {error && (
          <Alert severity="error" className="mt-[2px]">
            {error}
          </Alert>
        )}
      </div>
      <Dialog open={openDialog} onDialogClose={handleCloseDialog}>
        <div className="shadow-sm p-1">
          <h1 className="text-center">Terms and conditions</h1>
          <br />
          <p>
            * When you register for a ShopsFinder account, we only collect your
            full name and email address, as all other information is not
            required when registering.
          </p>
        </div>
      </Dialog>
    </>
  );
};
