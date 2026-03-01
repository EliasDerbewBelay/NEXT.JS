"use client";
import Image from "next/image";

export default function ExploreBtn() {
  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto bg-green-900 px-6 py-2 flex rounded-lg"
      onClick={() => console.log("CLICK")}
    >
      <a href="#events" className="flex gap-4 items-center justify-center text-white">
        Explore Events
        <Image
          src="/icons/down-arrow.svg"
          alt="down-arrow"
          width={24}
          height={24}
          className=""
        />
      </a>
    </button>
  );
}
