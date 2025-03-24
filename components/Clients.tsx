"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { testimonials } from "@/data";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Clients = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="py-20" id="testimonials">
      <h1 className="heading">
        Kind words from{" "}
        <span className="text-purple">people I&apos;ve worked with</span>
      </h1>
      <div className="flex flex-col items-center max-lg:mt-10">
        {isMobile ? (
          <Carousel className="w-full max-w-sm md:max-w-xl">
            <CarouselContent>
              {testimonials.map((item, idx) => (
                <CarouselItem key={idx}>
                  <div
                    className="w-full h-[420px] flex flex-col justify-between relative rounded-2xl border border-b-0 border-slate-800 p-4"
                    style={{
                      background: "rgb(4,7,29)",
                      backgroundColor:
                        "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                    }}
                  >
                    <blockquote className="h-full flex flex-col justify-between">
                      <div
                        aria-hidden="true"
                        className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                      ></div>
                      <div className="quote-container">
                        <span className="relative z-20 text-sm leading-[1.6] text-white font-normal">
                          {item.quote}
                        </span>
                      </div>
                      <div className="relative z-20 mt-4 flex flex-row items-center">
                        <span className="flex items-center gap-3">
                          <div>
                            <Image
                              src={item.photo}
                              alt="profile"
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-lg leading-[1.6] text-white font-bold">
                              {item.name}
                            </span>
                            <span className="text-xs leading-[1.6] text-white-200 font-normal">
                              {item.title}
                            </span>
                          </div>
                        </span>
                      </div>
                    </blockquote>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        ) : (
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        )}

        {/* <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map(({ id, img, name, nameImg }) => (
            <div key={id} className="flex md:max-w-60 max-w-32 gap-2">
              <Image 
                src={img} 
                alt={name} 
                width={50} 
                height={50} 
                className="w-auto h-auto object-contain"
              />
              <Image 
                src={nameImg} 
                alt={name} 
                width={100} 
                height={50}
                className="w-auto h-auto object-contain" 
              />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Clients;
