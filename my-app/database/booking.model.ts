import mongoose, { Schema, Model, Types } from "mongoose";
import Event from "./event.model";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface IBooking {
  /** Reference to the Event this booking belongs to. Indexed for fast lookups. */
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      // Index on eventId allows efficient queries like "all bookings for event X".
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      // RFC-compliant email format validation.
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address."],
    },
  },
  { timestamps: true }
);

// ─── Pre-save Hook ────────────────────────────────────────────────────────────

/**
 * Before persisting a booking, verify that the referenced event exists.
 * Throwing inside an async hook is caught by Mongoose and surfaces as a
 * validation error, keeping the API consistent with synchronous hooks.
 */
BookingSchema.pre("save", async function () {
  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) {
    throw new Error(
      `Cannot create booking: Event with ID "${this.eventId.toString()}" does not exist.`
    );
  }
});

// ─── Model ────────────────────────────────────────────────────────────────────

// Guard against model recompilation during Next.js hot reloads in development.
const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ??
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
