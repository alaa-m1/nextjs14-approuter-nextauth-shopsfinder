"use client";
import React from "react";
import styled from "styled-components";
import imgSrc from "@/assets/images/Alaa.jpg";
import Image from "next/image";
import { Color } from "@/types";

export const ProfilePhoto = ({ bgColor }: { bgColor: Color }) => {
  return (
    <div
      className={`relative overflow-hidden w-[350px] h-[340px] bg-[${bgColor}]`}
    >
      <ImageContainerWithShadow />
      <ImageContainer>
        <BackgroundContainer1 bgColor={bgColor} />
        <BackgroundContainer2 bgColor={bgColor} />
        <BackgroundContainer3 bgColor={bgColor} />
        <BackgroundContainer4 bgColor={bgColor} />
      </ImageContainer>
      <DevImage src={imgSrc} alt="Alaa Mohammad" />
    </div>
  );
};

const ImageContainerWithShadow = styled.div`
  position: absolute;
  z-index: 2;
  top: 40px;
  left: 40px;
  transform: scale(1, 1);
  box-shadow: 1px 1px 5px 1px #584dde;
  width: 250px;
  height: 250px;
  &:hover {
    box-shadow: 2px 5px 10px 3px #584dde;
    transform: scale(1.2, 1.2);
    & ~ div {
      transform: scale(1.2, 1.2);
    }
  }
  transition: all 0.5s ease;
`;
const ImageContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 40px;
  transform: scale(1, 1);
  width: 250px;
  height: 250px;
  transition: all 0.5s ease;
`;

const BackgroundContainer1 = styled.div<{ bgColor?: string }>`
  position: fixed;
  left: -50px;
  top: -249px;
  width: 350px;
  height: 250px;
  background-color: ${(props) => props.bgColor};
`;
const BackgroundContainer2 = styled.div<{ bgColor?: string }>`
  position: fixed;
  left: -251px;
  top: 0px;
  width: 250px;
  height: 260px;
  background-color: ${(props) => props.bgColor};
`;
const BackgroundContainer3 = styled.div<{ bgColor?: string }>`
  position: fixed;
  left: -100px;
  top: 251px;
  width: 500px;
  height: 250px;
  background-color: ${(props) => props.bgColor};
`;
const BackgroundContainer4 = styled.div<{ bgColor?: string }>`
  position: fixed;
  left: 251px;
  top: 0px;
  width: 500px;
  height: 260px;
  background-color: ${(props) => props.bgColor};
`;
const DevImage = styled(Image)`
  position: absolute;
  left: 10px;
  top: 0px;
  position: absolute;
  width: 310px;
  min-width: 310px;
  aspect-ratio: auto;
`;
