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
                // First word visible immediately for better LCP
                idx === 0 ? "inline-block opacity-100" : "inline-block opacity-0 animate-text-reveal"
              )}
              style={idx === 0 ? undefined : {
                animationDelay: `${idx * 150}ms`,
                animationDuration: `${duration * 800}ms`,
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
