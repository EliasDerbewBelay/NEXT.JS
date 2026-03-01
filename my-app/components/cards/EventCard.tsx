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

export default function EventCard({ image, title }: Props) {
  return (
    <div className="">
      <Link href={`event/`}>
        <Image src={image} alt="event-image" height={300} width={410} />
        <h1>{title}</h1>
      </Link>
    </div>
  );
}
