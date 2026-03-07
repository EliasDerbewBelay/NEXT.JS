"use server";

import { IEvent } from "@/database";
import { Event } from "@/database";
import { connectToDatabase } from "../mongodb";

// Subset of IEvent fields that EventCard needs — avoids fetching the full document.
export type SimilarEvent = Pick<
  IEvent,
  "title" | "slug" | "image" | "date" | "location" | "time"
>;

export const getSimilarEventsBySlug = async (
  slug: string
): Promise<SimilarEvent[]> => {
  try {
    await connectToDatabase();

    // Only fetch the fields needed for the similarity query — tags and _id.
    const event = await Event.findOne({ slug }).select("tags _id").lean();

    if (!event || !Array.isArray(event.tags) || event.tags.length === 0) {
      return [];
    }

    // Find other events that share at least one tag, limited to 6 results.
    // select() is kept in sync with the SimilarEvent type above.
    const similar = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    })
      .limit(6)
      .select("title slug image date location time")
      .lean<SimilarEvent[]>();

    return similar;
  } catch (err) {
    console.error(`getSimilarEventsBySlug failed for slug "${slug}":`, err);
    return [];
  }
};
