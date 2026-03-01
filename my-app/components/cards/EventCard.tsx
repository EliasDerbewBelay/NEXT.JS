import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export default function EventCard({
  image,
  title,
  slug,
  location,
  date,
  time,
}: Props) {
  return (
    <div
      className="
        group
        rounded-xl 
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        overflow-hidden 
        transition-all duration-300
        hover:shadow-md dark:hover:shadow-lg/30
        hover:border-gray-300 dark:hover:border-gray-600
        active:scale-[0.99]
      "
    >
      <Link href={`/event/${slug}`} className="block h-full">
        <div className="aspect-[4/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 410px"
          />
        </div>

        <div className="p-4 pt-3 space-y-2.5">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Image
              src="/icons/pin.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0 opacity-80 dark:opacity-70"
            />
            <span className="truncate">{location}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-tight line-clamp-2 min-h-[2.5rem]">
            {title}
          </h3>

          {/* Date & Time */}
          <div className="flex items-center gap-5 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Image
                src="/icons/calander.svg"
                alt=""
                width={16}
                height={16}
                className="shrink-0 opacity-80 dark:opacity-70"
              />
              <time dateTime={date}>{date}</time>
            </div>

            <div className="flex items-center gap-1.5">
              <Image
                src="/icons/clock.svg"
                alt=""
                width={16}
                height={16}
                className="shrink-0 opacity-80 dark:opacity-70"
              />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
