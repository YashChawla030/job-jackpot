// "use client";

// import React from "react";
// import { useAppStore } from "@/store/appStore";
// import { usePortfolioStore } from "@/store/usePortfolioStore";
// import { SkillsEditableWithAuth } from "portfolioui/hr-favorite";
// import { SliderIconType } from "portfolioui";
// import { ShinyButton } from "../shiny-button";

// export const Skills = () => {
//   const { portfolio, saveSkillsInfo, isLoading } = usePortfolioStore();
//   const { isEditing } = useAppStore();

//   return (
//     <div className="py-28 max-w-7xl mx-auto flex flex-col items-center">
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl justify-center">
//         {portfolio.skillsInfo.skills.map((skill, index) => (
//           <div key={skill.name + index} className="flex justify-center">
//             <ShinyButton className="w-fit flex h-16 items-center justify-center text-center ">
//               <p className="animate-pulse">{skill.name}</p>
//             </ShinyButton>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

"use client";
import React, { useMemo } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { MovingCards } from "../ui/MovingCards";

const movement = [
  { x: 0, y: 0, vx: 0.3, vy: 0.3 },
  { x: 100, y: 100, vx: -0.3, vy: 0.3 },
  { x: 200, y: 200, vx: 0.3, vy: -0.3 },
  { x: 300, y: 300, vx: -0.3, vy: -0.3 },
  { x: 150, y: 50, vx: 0.2, vy: -0.4 },
  { x: 250, y: 150, vx: -0.4, vy: 0.2 },
  { x: 50, y: 250, vx: 0.5, vy: 0.1 },
  { x: 350, y: 50, vx: -0.1, vy: 0.5 },
  { x: 100, y: 350, vx: 0.4, vy: -0.2 },
  { x: 300, y: 200, vx: -0.2, vy: 0.4 },
  { x: 200, y: 100, vx: 0.3, vy: 0.3 },
  { x: 150, y: 300, vx: -0.3, vy: -0.3 },
  { x: 250, y: 250, vx: 0.2, vy: -0.4 },
  { x: 50, y: 150, vx: -0.4, vy: 0.2 },
];

export const Skills = () => {
  const {
    portfolio: { skillsInfo },
  } = usePortfolioStore();

  const newSkills = useMemo(() => {
    return skillsInfo.skills.map((card, index) => ({
      id: index + 1,
      name: card.name,
      ...movement[index % movement.length],
    }));
  }, [skillsInfo.skills]);

  if (newSkills.length === 0) return <></>;
  return (
    // <SkillsEditableWithAuth
    //   saveSkillsInfo={saveSkillsInfo}
    //   skillsInfo={portfolio.skillsInfo}
    //   isEditing={isEditing}
    //   isLoading={isLoading}
    //   containerClassName=""
    //   showTick={true}
    //   showOutput={false}
    //   sliderIconClassName={SliderIconType.TINY_THUMB}
    // />

    <div>
      <MovingCards cardDetails={newSkills} />
    </div>
  );
};
