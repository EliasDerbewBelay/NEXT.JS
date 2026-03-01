import mongoose, { Schema, Model } from "mongoose";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  /** Stored as YYYY-MM-DD after normalization. */
  date: string;
  /** Stored as HH:MM (24-hour) after normalization. */
  time: string;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Converts a title to a URL-friendly slug.
 * e.g. "My Awesome Event!" → "my-awesome-event"
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // strip special characters
    .replace(/\s+/g, "-")          // spaces → hyphens
    .replace(/-+/g, "-")           // collapse consecutive hyphens
    .replace(/^-|-$/g, "");        // trim leading/trailing hyphens
}

/**
 * Normalizes time strings to HH:MM 24-hour format.
 * Accepts: "15:00", "3:00 PM", "03:00am", etc.
 * Returns null if the format is unrecognized or the value is out of range.
 */
function normalizeTime(raw: string): string | null {
  const match = raw.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3]?.toLowerCase();

  // Apply 12-hour → 24-hour conversion when AM/PM is present.
  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;

  if (hours > 23 || minutes > 59) return null;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    // Slug is auto-generated from title in the pre-save hook.
    slug: { type: String },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: {
      type: String,
      required: true,
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be one of: online, offline, hybrid.",
      },
    },
    audience: { type: String, required: true, trim: true },
    // Arrays are validated to be non-empty in the pre-save hook.
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

// Unique index on slug — enforces URL uniqueness at the database level.
EventSchema.index({ slug: 1 }, { unique: true });

// ─── Pre-save Hook ────────────────────────────────────────────────────────────

/**
 * Async hooks throw errors directly; Mongoose 9 catches them and rejects
 * the save() promise, keeping error handling consistent throughout the app.
 */
EventSchema.pre("save", async function () {
  // Slug: regenerate only when the title field changes to avoid unnecessary writes.
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }

  // Date: parse and normalize to YYYY-MM-DD ISO format.
  if (this.isModified("date")) {
    const parsed = new Date(this.date);
    if (isNaN(parsed.getTime())) {
      throw new Error(`Invalid date value: "${this.date}".`);
    }
    // Split on "T" to extract the date portion and discard the time component.
    this.date = parsed.toISOString().split("T")[0];
  }

  // Time: normalize to HH:MM 24-hour format.
  if (this.isModified("time")) {
    const normalized = normalizeTime(this.time);
    if (!normalized) {
      throw new Error(
        `Invalid time format: "${this.time}". Expected "HH:MM" or "H:MM AM/PM".`
      );
    }
    this.time = normalized;
  }

  // Validate that array fields contain at least one item.
  if (this.agenda.length === 0) {
    throw new Error("Agenda must contain at least one item.");
  }
  if (this.tags.length === 0) {
    throw new Error("Tags must contain at least one item.");
  }
});

// ─── Model ────────────────────────────────────────────────────────────────────

// Guard against model recompilation during Next.js hot reloads in development.
const Event: Model<IEvent> =
  (mongoose.models.Event as Model<IEvent>) ??
  mongoose.model<IEvent>("Event", EventSchema);

export default Event;
