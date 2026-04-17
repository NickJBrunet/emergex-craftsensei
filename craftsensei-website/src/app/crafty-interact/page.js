'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import { useLayoutEffect } from "react";

const animationPaths = [
  "/animations/Crafty_Animation_Wink.svg",
  "/animations/Crafty_Animation_Mad.svg",
  "/animations/Crafty_Animation_Sad.svg",
  "/animations/Crafty_Animation_Bounce.svg",
  "/animations/Crafty_Animation_Book_Fall.svg",
  "/animations/Crafty_Animation_Flower_Fall.svg",
  "/animations/Crafty_Animation_Talk_Outline.svg",
  "/animations/Crafty_Animation_Credits_Outline.svg",
  "/animations/Crafty_Animation_Talk_2.svg",
  "/animations/Crafty_Animation_Talk_3.svg",
  "/animations/Crafty_Animation_Talk_5.svg",
  "/animations/Crafty_Animation_Talk_4.svg",
];

const staticPath = "/animations/Crafty_Static.svg";
const animationLabels = ["Wink", "Mad", "Sad", "Bounce", "Books", "Flower", "Talk", "Credits"];
const animationDurations = [1000, 2000, 2500, 3500, 4500, 5000, 5500, 6000];

// BASE PIXEL OFFSETS at 600x500 (define your exact pixel positions here)
const animationOffsets = [
  { translateX: -80, translateY: 30 },  // Wink
  { translateX: -80, translateY: 30 },  // Mad  
  { translateX: -80, translateY: 30 },  // Sad
  { translateX: -80, translateY: -10.2 }, // Bounce
  { translateX: -81.5, translateY: -1.2 }, // Books
  { translateX: -80, translateY: 30 },  // Flower
  { translateX: -80, translateY: 30 },  // Talk
  { translateX: -80, translateY: 30 },  // Credits
  { translateX: -80, translateY: 30 },  // Talk 2
  { translateX: -80, translateY: 30 },  // Talk 3
  { translateX: -80, translateY: 30 },  // Talk 5
  { translateX: -80, translateY: 30 },  // Talk 4
];

// Static SVG base offset (same format)
const staticOffset = { translateX: -80, translateY: 30 };

const BASE_SIZE = { width: 600, height: 500 }; // Reference size for % conversion

export default function CraftyInteract() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [animationTimestamp, setAnimationTimestamp] = useState(0);
  const timeoutRef = useRef(null);

  const [talkStep, setTalkStep] = useState(0);
  const talkIndices = [8, 9, 10, 11];
  const talkDuration = 5500;

  const [talkOnLoadPlayed, setTalkOnLoadPlayed] = useState(false);

  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 600, height: 500 });

  // Convert base pixel offsets to relative % for current container size
  const getOffset = useCallback((baseOffset) => {
    const scaleX = containerSize.width / BASE_SIZE.width;
    const scaleY = containerSize.height / BASE_SIZE.height;
    
    // Convert px to % relative to container size
    const translateXPercent = (baseOffset.translateX / BASE_SIZE.width) * 100;
    const translateYPercent = (baseOffset.translateY / BASE_SIZE.height) * 100;
    
    return {
      x: `${translateXPercent}%`,
      y: `${translateYPercent}%`
    };
  }, [containerSize]);

  const triggerAnimation = useCallback(
    (index, { isFromLoad = false } = {}) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const newTimestamp = Date.now();
      let actualIndex = index;

      if (index === 6 && !isFromLoad) {
        const stepIndex = talkIndices[talkStep % talkIndices.length];
        actualIndex = stepIndex;
        setTalkStep((prev) => prev + 1);
      }

      setActiveIndex(actualIndex);
      setAnimationTimestamp(newTimestamp);
      console.log(`Crafty animating: ${animationLabels[index]}`);

      const duration = animationDurations[index];
      timeoutRef.current = setTimeout(() => {
        setActiveIndex(null);
      }, duration);
    },
    [animationLabels, animationDurations, talkIndices, talkStep]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });
  }, []);

  useEffect(() => {
    animationPaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, []);

  useEffect(() => {
    if (!talkOnLoadPlayed) {
      const id = setTimeout(() => {
        triggerAnimation(6, { isFromLoad: true });
        setTalkOnLoadPlayed(true);
      }, 500);

      return () => clearTimeout(id);
    }
  }, [talkOnLoadPlayed, triggerAnimation]);

  // Static SVG positioning
  const staticOffsetStyle = getOffset(staticOffset);
  const staticStyle = {
    transform: `scale(1.5) translate(${staticOffsetStyle.x}, ${staticOffsetStyle.y})`,
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="relative flex flex-col items-center min-h-[calc(100vh-72px)] px-6 overflow-hidden pt-0">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8 w-full max-w-4xl">
          <div className="inline-block w-full max-w-[600px]">
            <div 
              ref={containerRef} 
              className="w-full max-w-[600px] aspect-[6/5] rounded-xl bg-transparent overflow-hidden relative min-h-0"
            >           
              {/* Static SVG */}
              <div
                className="absolute inset-0 opacity-100 block origin-center"
                style={{
                  display: activeIndex === null ? 'block' : 'none',
                  ...staticStyle,
                }}
              >
                <object
                  type="image/svg+xml"
                  data={staticPath}
                  className="w-full h-full"
                >
                  <div className="w-full h-full bg-zinc-900/70" />
                </object>
              </div>

              {/* Animated SVGs */}
              {animationPaths.map((path, index) => {
                const baseOffset = animationOffsets[index];
                const offsetStyle = getOffset(baseOffset);
                const animStyle = {
                  display: activeIndex === index ? 'block' : 'none',
                  transform: `scale(1.5) translate(${offsetStyle.x}, ${offsetStyle.y})`,
                };

                return (
                  <div
                    key={`${index}-${animationTimestamp}`}
                    className="absolute inset-0 opacity-100 block origin-center"
                    style={animStyle}
                  >
                    <object
                      type="image/svg+xml"
                      data={`${path}?v=${animationTimestamp}`}
                      className="w-full h-full"
                    >
                      <div className="w-full h-full bg-zinc-900/70" />
                    </object>
                  </div>
                );
              })}
              
              <div className="absolute bottom-0 right-0 h-18 w-30 bg-black z-50 sm:h-20 sm:w-52" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-32">
            {animationLabels.map((label, index) => (
              <button
                key={label}
                onClick={() => triggerAnimation(index)}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-emerald-950 bg-emerald-500 hover:bg-emerald-400 active:scale-95 shadow-lg transition transform hover:scale-105 hover:cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 text-xs text-zinc-400">
          © {new Date().getFullYear()} Craft Sensei • Not affiliated with Mojang or Microsoft
        </div>
      </main>
    </div>
  );
}




