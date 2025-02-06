"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Skill {
  id: number;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

type PropType = {
  cardDetails: Skill[];
};

export const MovingCards: React.FC<PropType> = ({ cardDetails }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const buttonSize = 80;

  const [skillsState, setSkillsState] = useState<Skill[]>(() => {
    return cardDetails.map((skill) => {
      return {
        ...skill,
        x: Math.random() * window.innerWidth * 0.8,
        y: Math.random() * window.innerHeight * 0.8,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
      };
    });
  });

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      setSkillsState((prevSkills) => {
        const newSkills = prevSkills.map((skill) => {
          let { x, y, vx, vy } = skill;

          x += vx;
          y += vy;

          // Boundary collision
          if (x <= 0 || x + buttonSize >= containerRect.width) {
            vx = -vx;
            x = Math.max(0, Math.min(x, containerRect.width - buttonSize));
          }
          if (y <= 0 || y + buttonSize >= containerRect.height) {
            vy = -vy;
            y = Math.max(0, Math.min(y, containerRect.height - buttonSize));
          }

          return { ...skill, x, y, vx, vy };
        });

        // Collision detection with proper physics
        for (let i = 0; i < newSkills.length; i++) {
          for (let j = i + 1; j < newSkills.length; j++) {
            const dx = newSkills[i].x - newSkills[j].x;
            const dy = newSkills[i].y - newSkills[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < buttonSize) {
              // Calculate new velocities using 1D elastic collision equations
              const v1x = newSkills[i].vx;
              const v1y = newSkills[i].vy;
              const v2x = newSkills[j].vx;
              const v2y = newSkills[j].vy;

              newSkills[i].vx = v2x;
              newSkills[i].vy = v2y;
              newSkills[j].vx = v1x;
              newSkills[j].vy = v1y;

              // Move apart to prevent overlap
              const angle = Math.atan2(dy, dx);
              const overlap = buttonSize - distance;
              newSkills[i].x += Math.cos(angle) * (overlap / 2);
              newSkills[i].y += Math.sin(angle) * (overlap / 2);
              newSkills[j].x -= Math.cos(angle) * (overlap / 2);
              newSkills[j].y -= Math.sin(angle) * (overlap / 2);
            }
          }
        }

        return newSkills;
      });

      animationRef.current = requestAnimationFrame(updatePositions);
    };

    animationRef.current = requestAnimationFrame(updatePositions);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] px-2 bg-white dark:bg-black rounded-lg overflow-hidden"
    >
      <AnimatePresence>
        {skillsState.map((skill) => (
          <motion.div
            key={skill.id}
            animate={{ x: skill.x, y: skill.y }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute"
          >
            <Button
              variant="outline"
              className="w-fit h-fit py-4 dark:hover:bg-accent dark:hover:text-foregroud text-sm flex items-center justify-center rounded-full shadow-md bg-white dark:bg-black text-black dark:text-white"
            >
              {skill.name}
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
