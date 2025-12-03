import React from "react";

export const BgAnimatedGradient = () => {
  return (
    <React.Fragment>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C6FF]/20 rounded-full blur-[120px] animate-pulse-fade-in" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5A4FCF]/20 rounded-full blur-[120px] animate-pulse-fade-in delay-75" />
    </React.Fragment>
  );
};
