import { Suspense } from "react";
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/cards/EventCard";
import { IEvent, Event } from "@/database";
import { connectToDatabase } from "@/lib/mongodb";

// Configure dynamic rendering with revalidation
export const revalidate = 300; // Revalidate every 5 minutes

// Separate component for fetching events - can be wrapped in Suspense
async function FeaturedEvents() {
  let events: IEvent[] = [];

  try {
    await connectToDatabase();
    // Fetch events directly from database instead of API route
    // This prevents build-time fetch errors to localhost
    const eventsData = await Event.find().sort({ createdAt: -1 }).lean();
    events = eventsData as IEvent[];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return (
      <div className="text-center text-muted-foreground">
        Failed to load events. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center justify-center">
      {events && events.length > 0 ? (
        events.map((event: IEvent, index: number) => (
          <li key={event.slug || index} className="list-none">
            <EventCard {...event} />
          </li>
        ))
      ) : (
        <p className="col-span-full text-center text-muted-foreground">
          No events available at the moment.
        </p>
      )}
    </div>
  );
}

// Loading fallback component
function EventsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden animate-pulse"
        >
          <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

const Home = () => {
  return (
    <section className="mt-30 flex flex-col items-center min-h-screen m-10">
      <h1 className="text-center text-6xl font-bold">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackthons, Meetups, and Conferences, All in one place{" "}
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7 w-full">
        <h1 className="text-4xl">Featured Events</h1>

        <Suspense fallback={<EventsLoadingSkeleton />}>
          <FeaturedEvents />
        </Suspense>
      </div>
    </section>
  );
};

export default Home;
