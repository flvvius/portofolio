"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import animationData from "@/data/confetti.json";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useIsClient } from "@/lib/client-utils";

const LottieWrapper = dynamic(
  () => import("./LottieWrapper").then((mod) => mod.default),
  { ssr: false, loading: () => <div className="w-[150px] h-[150px]" /> }
);

const BackgroundGradientAnimation = dynamic(
  () => import("./GradientBg").then((mod) => mod.BackgroundGradientAnimation),
  { ssr: false }
);
const GlobeDemo = dynamic(
  () => import("./GridGlobe").then((mod) => mod.GlobeDemo),
  { ssr: false }
);

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [confettiKey, setConfettiKey] = useState<string>("initial");
  const isClient = useIsClient();

  const handleCopy = () => {
    if (isClient) {
      try {
        navigator.clipboard.writeText("flaviuscojocaru19@gmail.com");
        setConfettiKey(`confetti-${Date.now()}`);
        setCopied(true);
      } catch (error) {
        console.error("Failed to copy: ", error);
        setCopied(true);
      }
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 border border-white/[0.1]",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={img}
              width={400}
              height={400}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              priority={id === 1}
              loading={id === 1 ? "eager" : "lazy"}
              className={cn(
                imgClassName,
                "object-cover object-center w-full h-auto"
              )}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          }`}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              width={300}
              height={300}
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, 25vw"
              loading="lazy"
              className="object-cover object-center w-full h-auto"
            />
          )}
        </div>
        {id === 6 && isClient && (
          <div className="w-full h-full absolute">
            <BackgroundGradientAnimation />
          </div>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
            {title}
          </div>
          <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10">
            {description}
          </div>
          {id === 2 && isClient && <GlobeDemo />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-8">
                {["React.js", "Next.js", "Typescript"].map((item) => (
                  <span
                    key={item}
                    className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
              </div>
              <div className="flex flex-col gap-3 lg:gap-8">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />

                {["VueJS", "Java", "Python"].map((item) => (
                  <span
                    key={item}
                    className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className={`absolute -bottom-5 right-0`}>
                {isClient && copied && (
                  <LottieWrapper
                    key={confettiKey}
                    isActive={copied}
                    animationData={animationData}
                  />
                )}
              </div>

              <MagicButton
                title={copied ? "Email copied" : "Copy my email"}
                icon={<IoCopyOutline />}
                position="left"
                otherClasses="!bg-[#161a31]"
                handleClick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
