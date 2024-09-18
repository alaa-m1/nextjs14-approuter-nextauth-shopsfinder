"use client";
import React from "react";
import Image from "next/image";
import { ColoredDevider } from "../components";
import Link from "next/link";
import notFoundSrc from "@/assets/images/not-found.png";

export const NotFoundSecion = () => {
	return (
		<div className="mx-auto bg-light-card dark:bg-dark-card flex flex-col items-center justify-center gap-2 rounded-md mt-[150px] max-w-[600px] shadow-md hover:shadow-lg py-[10px] text-black">
			<div className="text-[20px] text-blue-600 mb-2">404</div>
			<div className="text-black uppercase text-[24px]">Page not Found</div>
			<Image src={notFoundSrc} alt="Logo" style={{ width: `400px` }} />
			<ColoredDevider />
			<Link href="/" className="no-underlin text-light-text dark:text-dark-text">
				Home Page
			</Link>
		</div>
	);
};
