"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface AnimationLottieProps {
  animationPath: unknown;
  width?: string;
}

const AnimationLottie: React.FC<AnimationLottieProps> = ({ animationPath, width = "95%" }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width,
      cursor: "pointer",
    },
  };

  return <Lottie {...defaultOptions} />;
};

export default AnimationLottie;
