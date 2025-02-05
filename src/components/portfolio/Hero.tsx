"use client";
import React from "react";

import { usePortfolioStore } from "@/store/usePortfolioStore";

import { RippleDemo } from "./Ripple";

export const Hero = () => {
  const {
    portfolio: { heroInfo },
    isLoading,
  } = usePortfolioStore();
  //const { isEditing } = useAppStore();

  return (
    // <HeroEditableWithAuth
    //   isEditing={isEditing}
    //   heroInfo={portfolio.heroInfo}
    //   saveHeroInfo={saveHeroInfo}
    //   isLoading={isLoading}
    // />
    <RippleDemo heroInfo={heroInfo} isLoading={isLoading} />
  );
};
