import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const wordsArray = words.split(" ");

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <span
              key={word + idx}
              className={cn(
                idx > 2 ? "text-purple" : "dark:text-white text-black",
                "inline-block opacity-0 animate-text-reveal"
              )}
              style={{
                // Desktop: 200ms stagger, Mobile: 80ms stagger (via CSS var)
                ["--delay-desktop" as string]: `${idx * 200}ms`,
                ["--delay-mobile" as string]: `${idx * 80}ms`,
                animationDelay: `var(--delay-desktop)`,
                animationDuration: `${duration * 1000}ms`,
                animationFillMode: "forwards",
              }}
            >
              {word}&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
