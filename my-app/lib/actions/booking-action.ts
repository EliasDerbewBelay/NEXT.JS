"use server";

import { Booking } from "@/database";
import { connectToDatabase } from "../mongodb";

export const createBooking = async ({
  eventId,
  email,
}: {
  eventId: string;
  email: string;
}) => {
  try {
    await connectToDatabase();

    // Booking.create() returns a HydratedDocument, not a Query.
    // .lean() is a Query method and must not be called here.
    await Booking.create({ eventId, email });

    return { success: true };
  } catch (e) {
    console.error("create booking failed", e);
    // Return the error instance so the client can display a meaningful message.
    return { success: false, error: e instanceof Error ? e : new Error("Unknown error") };
  }
};
