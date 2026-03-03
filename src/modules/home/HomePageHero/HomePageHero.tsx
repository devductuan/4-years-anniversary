import Image from "next/image";
import { Button } from "@/modules/shared/Button/Button";
import { GradientBackground } from "@/modules/shared/GradientBackground/GradientBackground";

export const HomePageHero = () => {
  return (
    <section className="overflow-hidden w-full h-screen mt-20 md:mt-0">
      <GradientBackground />
      <div className="h-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-20">
        <div className="relative ">
          <div className="md:static">
            <Image
              src="/images/hero-img.png"
              alt="Princess"
              width={417}
              height={517}
            />
          </div>
        </div>
        <div className="">
          <h1 className="text-4xl font-bold uppercase text-right mb-2 md:text-left">
            Thu Huệ
          </h1>
          <div className="">
            <p className="text-right text-sm text-gray-500 text-lg md:text-left">
              (Lily Nguyen)
            </p>
            <p className="text-right text-sm text-gray-500 text-lg md:text-left">
              Communications Officer
            </p>
            <div className="text-left italic text-sm text-gray-500 flex flex-col gap-4 mt-20 px-4 max-w-sm md:p-0 md:mt-6">
              <p>
                Highly organized and skilled at managing competing demands while
                remaining upbeat under duress. Proven ability to meet tight
                timeframes...
              </p>
            </div>
            <Button href="/anniversaries" className="mx-auto md:mx-0 my-8">Know more about me</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
