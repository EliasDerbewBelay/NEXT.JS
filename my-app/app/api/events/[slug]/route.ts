import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database";

// ─── Types ────────────────────────────────────────────────────────────────────

// In Next.js 15+, dynamic route params are passed as a Promise.
type RouteContext = {
  params: Promise<{ slug: string }>;
};

// ─── Validation ───────────────────────────────────────────────────────────────

// Slugs contain only lowercase letters, digits, and hyphens.
// This matches the format produced by the Event model's slug generator.
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(_req: NextRequest, { params }: RouteContext) {
  // Await params before accessing fields (required in Next.js 15+).
  const { slug } = await params;

  // Guard: slug must be a non-empty string.
  if (!slug || slug.trim() === "") {
    return NextResponse.json(
      { message: "Slug parameter is required." },
      { status: 400 }
    );
  }

  // Guard: reject malformed slugs before touching the database.
  if (!SLUG_REGEX.test(slug)) {
    return NextResponse.json(
      { message: `Invalid slug format: "${slug}".` },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    // .lean() returns a plain object instead of a Mongoose document,
    // which is more efficient for read-only responses.
    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `No event found with slug "${slug}".` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully.", event },
      { status: 200 }
    );
  } catch (e) {
    console.error(`[GET /api/events/${slug}]`, e);
    return NextResponse.json(
      {
        message: "An unexpected error occurred.",
        error: e instanceof Error ? e.message : "Unknown error.",
      },
      { status: 500 }
    );
  }
}