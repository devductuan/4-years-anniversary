"use client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Fragment, useCallback } from "react";
import { FaHeart } from "react-icons/fa";
import { GradientBackground } from "@/modules/shared/GradientBackground/GradientBackground";
import Image from "next/image";
dayjs.extend(duration);

const month = 3;
const day = 5;

export const Countdown = () => {
  const getDaysUntilNextAnniversary = useCallback(() => {
    const now = dayjs();
    let anniversary = dayjs()
      .month(month - 1)
      .date(day);
    if (now.isAfter(anniversary)) {
      anniversary = anniversary.add(1, "year");
    }
    const diff = anniversary.diff(now);
    return Math.floor(dayjs.duration(diff).asDays());
  }, []);

  return (
    <section className="relative">
      <GradientBackground />

      <div className="relative font-cursive py-20 container mx-auto px-4 flex items-center justify-center text-center flex-col gap-4">
        <div className="absolute -top-8 right-0">
          <Image
            src="/images/circles-hearts.png"
            alt="Circles Hearts"
            width={200}
            height={100}
          />
        </div>
        {getDaysUntilNextAnniversary() === 0 ? (
          <p className="text-3xl md:text-5xl">Chúc mừng ngày kỷ niệm của chúng mình !</p>
        ) : (
          <Fragment>
            <p className="md:text-xl">Còn</p>
            <p className="text-3xl md:text-5xl">{getDaysUntilNextAnniversary()}</p>
            <p className="text-center">
              {" "}
              ngày nữa là đến ngày kỉ niệm tiếp theo rùi
            </p>
          </Fragment>
        )}
        <p className="text-4xl animate-ping my-4 text-pink-600">
          <FaHeart />
        </p>
        <p className=" ">Mình đã cùng nhau đi qua</p>
        <p className="text-3xl md:text-5xl">{dayjs().diff("2022-03-05", "days")}</p>
        <p className="">ngày hạnh phúc</p>
        <div className="md:absolute md:-bottom-20 md:left-0 lg:left-20 md:animate-bounce mt-10 md:mt-0">
            <Image src="/images/kiss-kl.png" alt="Kiss Hearts" width={300} height={300} />
        </div>
      </div>
    </section>
  );
};
