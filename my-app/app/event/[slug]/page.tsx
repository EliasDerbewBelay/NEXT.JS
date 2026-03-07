import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, Globe, Tag } from "lucide-react";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug, SimilarEvent } from "@/lib/actions/actions";
import EventCard from "@/components/cards/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type EventDetailItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const EventDetailItem = ({ icon: Icon, label }: EventDetailItemProps) => (
  <div className="flex items-center gap-2.5 text-muted-foreground">
    <Icon className="h-5 w-5 shrink-0 opacity-80" />
    <span className="text-sm sm:text-base">{label}</span>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="space-y-3">
    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-foreground">
      Agenda
    </h2>
    <ul className="space-y-2.5 text-muted-foreground">
      {agendaItems.map((item, idx) => (
        <li
          key={idx}
          className="pl-6 relative text-sm sm:text-base before:absolute before:left-0 before:top-1.5 before:h-2 before:w-2 before:rounded-full before:bg-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className="inline-flex items-center rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-foreground/90 sm:text-sm border border-border/40"
      >
        <Tag className="mr-1.5 h-3.5 w-3.5 opacity-70" />
        {tag}
      </span>
    ))}
  </div>
);

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/events/${slug}`, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) return notFound();

  // Cast the response so all destructured fields carry their correct types.
  const { event } = (await res.json()) as { event: IEvent };

  if (!event?.description) return notFound();

  const booking = 10;

  // SimilarEvent only contains the fields EventCard needs (no full IEvent required).
  const similarEvents: SimilarEvent[] = await getSimilarEventsBySlug(slug);

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  // agenda and tags are stored as native string[] in MongoDB.
  // JSON.parse is not needed — using them directly avoids the SyntaxError.
  const agendaItems: string[] = Array.isArray(agenda) ? agenda : [];
  const eventTags: string[] = Array.isArray(tags) ? tags : [];

  return (
    <div className="min-h-screen pb-12">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-8 pb-10 md:pt-12 lg:pt-16">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Event Description
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 xl:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10 lg:space-y-12">
            {/* Banner */}
            {image && (
              <div className="-mx-4 sm:-mx-6 lg:mx-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/50 shadow-sm">
                  <Image
                    src={image}
                    alt="Event banner"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Overview */}
            {overview && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-foreground">
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed sm:text-lg">
                  {overview}
                </p>
              </section>
            )}

            {/* Event Details */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-foreground">
                Event Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <EventDetailItem icon={Calendar} label={date} />
                <EventDetailItem icon={Clock} label={time} />
                <EventDetailItem icon={MapPin} label={location} />
                <EventDetailItem icon={Globe} label={mode} />
                <EventDetailItem icon={Users} label={audience} />
              </div>
            </section>

            {/* Agenda */}
            {agendaItems?.length > 0 && (
              <EventAgenda agendaItems={agendaItems} />
            )}

            {/* Organizer */}
            {organizer && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-foreground">
                  About the Organizer
                </h2>
                <p className="text-muted-foreground leading-relaxed sm:text-lg whitespace-pre-line">
                  {organizer}
                </p>
              </section>
            )}

            {/* Tags */}
            {eventTags?.length > 0 && (
              <section className="pt-2">
                <EventTags tags={eventTags} />
              </section>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div
              className="
    sticky top-6 z-10
    mt-8 lg:mt-0
    rounded-xl border border-border
    bg-card p-6
    shadow-sm
  "
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Book Your Spot
              </h2>

              {booking > 0 ? (
                <p className="text-sm text-muted-foreground mb-6">
                  {booking} people have already booked
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mb-6">
                  Be the first to book
                </p>
              )}

              <BookEvent />
            </div>
          </aside>
        </div>

        <section className="flex w-full flex-col gap-6 pt-20">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-foreground">
            Similar Events
          </h2>
          {similarEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarEvents.map((event) => (
                <EventCard key={event.slug} {...event} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No similar events found.</p>
          )}
        </section>
      </main>
    </div>
  );
}
