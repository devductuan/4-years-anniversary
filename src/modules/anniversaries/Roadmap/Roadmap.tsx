"use client";

import { useRef, useState } from "react";
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaRegCircle,
} from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RoadMapItem } from "./roadmap.type";
import Markdown from "react-markdown";

export const Roadmap = ({ roadmap }: { roadmap: RoadMapItem[] }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {!isBeginning && (
        <div className="absolute top-0 left-0 w-1/6 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-200" />
      )}
      {!isEnd && (
        <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-200" />
      )}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Mục tiêu của chúng mình
        </h2>
      </div>

      <div className="relative px-4 md:px-20 mt-20">
        <>
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous slide"
            className="roadmap-swiper-prev absolute left-4 md:left-12 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-pink-200 bg-white text-pink-600 shadow-md transition hover:bg-pink-50 hover:border-pink-300 disabled:opacity-40 disabled:pointer-events-none">
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <button
            ref={nextRef}
            type="button"
            aria-label="Next slide"
            className="roadmap-swiper-next absolute right-4 md:right-12 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-pink-200 bg-white text-pink-600 shadow-md transition hover:bg-pink-50 hover:border-pink-300 disabled:opacity-40 disabled:pointer-events-none">
            <FaChevronRight className="h-5 w-5" />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            slidesPerGroup={1}
            onSwiper={(swiper: SwiperType) => {
              // @ts-expect-error - Swiper extends params with custom nav refs
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error - Swiper extends params with custom nav refs
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              updateNavState(swiper);
            }}
            onSlideChange={(swiper) => updateNavState(swiper)}
            className="!overflow-visible !px-12"
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}>
            {roadmap.map((item, index) => (
              <SwiperSlide
                key={`${item.month}-${item.year}-${index}`}
                className="!w-[280px] !flex !shrink-0">
                <div className="flex w-full flex-col">
                  {/* Month/year header + connector */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-pink-200 bg-pink-50 ring-4 ring-white"
                      aria-hidden>
                      <span className="text-xs font-semibold text-pink-700">
                        {index + 1}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {item.month}
                      </h3>
                      <p className="text-sm text-gray-500">{item.year}</p>
                    </div>
                  </div>

                  {/* Todo list card */}
                  <ul className="flex-1 space-y-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                    {item.todolist.map((todo, todoIndex) => (
                      <li
                        key={`${todo.title}-${todoIndex}`}
                        className={`flex gap-3 rounded-lg border p-3 transition-colors ${
                          todo.completed
                            ? "border-pink-100 bg-pink-50/50"
                            : "border-gray-200 bg-white"
                        }`}>
                        <span
                          className={`mt-0.5 shrink-0 ${
                            todo.completed ? "text-pink-500" : "text-gray-300"
                          }`}
                          aria-hidden>
                          {todo.completed ? (
                            <FaCheck className="h-5 w-5" />
                          ) : (
                            <FaRegCircle className="h-4 w-4" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`font-medium text-gray-900 ${
                              todo.completed ? "text-gray-500 line-through" : ""
                            }`}>
                            {todo.title}
                          </p>
                          {todo.description && (
                            <div className="mt-0.5 text-sm text-gray-500 markdown">
                              <Markdown>{todo.description}</Markdown>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </section>
  );
};
