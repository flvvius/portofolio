import { projects } from "@/data";
import React from "react";
import dynamic from "next/dynamic";
const PinContainer = dynamic(
  () => import("./ui/3d-pin").then((mod) => mod.PinContainer),
  { ssr: false }
);
import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10 flex-col lg:flex-row">
        {projects.map(({ id, title, des, img, iconLists, link }) => (
          <div
            key={id}
            className="h-[27rem] sm:h-[35rem] md:h-[40rem] flex items-center justify-center sm:w-[570px] w-[80vw] md:mb-[8rem]"
          >
            <PinContainer title={link} href={link}>
              <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] md:mb-10">
                <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]">
                  <Image
                    src="/bg.png"
                    alt="bg-png"
                    width={1000}
                    height={1000}
                    className="w-full h-auto"
                  />
                </div>
                <Image
                  src={img}
                  alt={title}
                  width={451}
                  height={254}
                  className="z-10 absolute bottom-0 w-auto h-auto"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {title}
              </h1>

              <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2">
                {des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon, index) => (
                    <div
                      key={icon}
                      className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{ transform: `translateX(-${5 * index * 2}px)` }}
                    >
                      <Image
                        src={icon}
                        alt={icon}
                        width={40}
                        height={40}
                        className="p-2 w-auto h-auto"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Check Live Site
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
