import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/cards/EventCard";
import { events } from "@/lib/constants";

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

      <div className="mt-20 space-y-7">
        <h1 className="text-4xl ">Featured Events</h1>

        <div className="grid grid-cols-4 gap-2 items-center justify-center">
          {events.map((event, index) => {
            return (
              <li key={index} className="list-none">
                <EventCard {...event} />
              </li>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
