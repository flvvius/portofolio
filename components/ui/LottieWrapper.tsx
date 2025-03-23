"use client";

import { useEffect, useState, useRef } from "react";
import { useIsClient } from "@/lib/client-utils";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

interface LottieWrapperProps {
  isActive: boolean;
  animationData: any;
}

const LottieWrapper = ({ isActive, animationData }: LottieWrapperProps) => {
  const isClient = useIsClient();
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isClient) {
    return <div ref={containerRef} className="w-[150px] h-[150px]" />;
  }

  return (
    <div ref={containerRef}>
      <Lottie
        options={{
          loop: isActive,
          autoplay: isActive,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYmid slice",
          },
        }}
        height={isActive ? 150 : 1}
        width={isActive ? 150 : 1}
        isStopped={!isActive}
        isClickToPauseDisabled={true}
      />
    </div>
  );
};

export default LottieWrapper;
