import React from "react";

type CustomIconButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  disabled?: boolean;
  label?: string;
  variant?: "contained" | "outlined";
  icon?: React.ReactNode;
};

export const CustomIconButton = ({
  disabled,
  label,
  variant,
  icon,
  ...props
}: CustomIconButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      className="text-white rounded-full hover:bg-blue-800 radiu hover:bg-opacity-10 transition-all duration-900 focus:outline-none font-medium text-sm p-2.5 text-center inline-flex items-center me-2"
    >
      {icon}
      <span className="sr-only">Icon description</span>
    </button>
  );
};
