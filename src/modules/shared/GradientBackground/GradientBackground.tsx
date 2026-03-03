"use client";

export const GradientBackground = () => {
  return (
    <div
      className="h-screen absolute top-0 left-0 w-full -z-10
         [--angle:0deg]
         bg-[linear-gradient(var(--angle),_#ffffff,_#f2c3d0)]
         animate-[rotate_10s_linear_infinite]"
    />
  );
};

export default GradientBackground;
