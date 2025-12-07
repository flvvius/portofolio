import { workExperience } from "@/data";
import React from "react";
import { Button } from "./ui/MovingBorders";
import Image from "next/image";

// Pre-calculate durations to avoid impure function calls during render
const getDuration = (id: number) => 10000 + ((id * 3571) % 10000);

const Experience = () => {
  return (
    <section
      className="py-20"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <h2 id="experience-heading" className="heading">
        my <span className="text-purple">work experience</span>
      </h2>
      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            borderRadius="1.75rem"
            className="flex-1 text-white border-neutral-200 dark:border-slate-800"
            duration={getDuration(card.id)}
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail}
                alt={card.title}
                className="lg:w-32 md:w-20 w-16 h-auto"
                width={128}
                height={128}
              />
              <div className="lg:ms-5">
                <h3 className="text-start text-xl md:text-2xl font-bold">
                  {card.title}
                </h3>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Experience;
