import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          looking for a dev who actually{" "}
          <span className="text-purple">enjoys</span> this stuff?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          i&apos;m down to build cool things — solo or with a team. startups,
          solid teams, side gigs — if it involves clean code and good vibes, i&apos;m
          in.
        </p>
        <a href="mailto:flaviuscojocaru19@gmail.com">
          <MagicButton
            title="let&apos;s talk"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-column justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Flavius Cojocaru
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              key={profile.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image
                src={profile.img}
                alt={profile.img}
                width={20}
                height={20}
                className="w-auto h-auto"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
