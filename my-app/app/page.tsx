import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/cards/EventCard";

const events = [
  {
    title: "event 1",
    image: "/events/event1.jpg",
    slug: "enent-1",
    location: "location-1",
    date: "date-1",
    time: "Time-1",
  },
  { title: "event 2", image: "/events/event2.jpg" },
  { title: "event 3", image: "/events/event3.jpg" },
  { title: "event 4", image: "/events/event4.jpg" },
];

const Home = () => {
  return (
    <section className="mt-9 flex flex-col items-center min-h-screen m-10">
      <h1 className="text-center text-6xl font-extra-bold">
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
