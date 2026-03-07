"use server";

import { Event } from "@/database";
import { connectToDatabase } from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return []; 
    }

    const eventTags = Array.isArray(event.tags) && event.tags.length > 0 
      ? event.tags 
      : null;

    if (!eventTags) {
      return [];
    }

    const similar = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: eventTags },
    })
      .limit(6)           
      .select('title slug image date location') 
      .lean();

    return similar;

  } catch (err) {
    console.error(`getSimilarEventsBySlug failed for slug "${slug}":`, err);
   
    return [];
  }
};