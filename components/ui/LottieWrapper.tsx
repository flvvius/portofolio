"use client";

import { useRef, useEffect, useState } from "react";
import { useIsClient } from "@/lib/client-utils";
import lottie from "lottie-web";

interface LottieWrapperProps {
  isActive: boolean;
  animationData: any;
  key?: string;
}

const LottieWrapper = ({ isActive, animationData }: LottieWrapperProps) => {
  const isClient = useIsClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isActive && isClient) {
      setShouldRender(true);
    }
  }, [isActive, isClient]);

  useEffect(() => {
    if (!isActive && shouldRender) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isActive, shouldRender]);

  useEffect(() => {
    if (!containerRef.current || !isClient || !shouldRender) return;

    try {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });

      if (isActive) {
        animationRef.current.play();
      } else {
        animationRef.current.pause();
      }

      return () => {
        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }
      };
    } catch (error) {
      console.error("Error initializing Lottie animation:", error);
    }
  }, [animationData, isClient, isActive, shouldRender]);

  useEffect(() => {
    return () => {
      try {
        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }

        if (containerRef.current) {
          const canvases = containerRef.current.querySelectorAll("canvas");
          if (canvases.length > 0) {
            canvases.forEach((canvas) => {
              try {
                const ctx = canvas.getContext("webgl");
                if (ctx) {
                  const loseContext = ctx.getExtension("WEBGL_lose_context");
                  if (loseContext) loseContext.loseContext();
                }
              } catch (e) {
                console.error("Error cleaning up canvas:", e);
              }
            });
          }
        }
      } catch (error) {
        console.error("Error in cleanup:", error);
      }
    };
  }, []);

  if (!isClient || !shouldRender) {
    return <div ref={containerRef} className="w-[150px] h-[150px]" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-[150px] h-[150px]"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default LottieWrapper;
