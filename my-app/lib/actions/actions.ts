"use server";

import { Event } from "@/database";
import { connectToDatabase } from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return []; // or throw new Error(`Event with slug "${slug}" not found`);
    }

    // Handle case when tags is missing / null / empty
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
      .limit(6)           // ← almost always a good idea
      .select('title slug image date location') // ← only fields you need
      .lean();

    return similar;

  } catch (err) {
    console.error(`getSimilarEventsBySlug failed for slug "${slug}":`, err);
    // Optionally: capture to Sentry / your error service here
    return [];
  }
};