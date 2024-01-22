"use client";
import { Alert, Dialog } from "@/shared";
import React, { useState } from "react";

type TermsPanelProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
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
          I accept &nbsp;
          <button type="button" onClick={handleOpenDialog}>
            terms and conditions
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
