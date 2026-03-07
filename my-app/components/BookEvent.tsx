"use client";

import { createBooking } from "@/lib/actions/booking-action";
import { useState } from "react";
import posthog from "posthog-js";

export default function BookEvent({
  eventId,
  slug,
}: {
  // Must be `string`, not `"string"` — the latter is a literal type meaning the
  // value must literally equal the word "string", which is never what we want.
  eventId: string;
  slug: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the default form GET/POST submission which would reload the page.
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { success, error: actionError } = await createBooking({
        eventId,
        email,
      });

      if (success) {
        setSubmitted(true);
        posthog.capture("event_booked", { eventId, slug, email });
      } else {
        const message =
          actionError instanceof Error
            ? actionError.message
            : "Booking failed. Please try again.";
        setError(message);
        posthog.captureException(actionError);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Booking submission error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8">
      {submitted ? (
        <div className="py-10 text-center space-y-4">
          <div className="text-5xl mb-2">🎉</div>
          <h3 className="text-xl font-semibold text-foreground tracking-tight">
            Thank you for signing up!
          </h3>
          <p className="text-muted-foreground">
            We’ve received your registration.
          </p>
          <p className="text-sm text-muted-foreground/80">
            You should receive a confirmation soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground/90"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className={`
                block w-full rounded-lg border border-input 
                bg-background px-4 py-3 text-base
                placeholder:text-muted-foreground/60
                focus:border-primary focus:ring-2 focus:ring-primary/20
                disabled:opacity-60 transition-colors
                outline-none
              `}
            />
          </div>

          {/* User-facing error message */}
          {error && (
            <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit button — disabled and labelled while the action is in-flight */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full flex items-center justify-center
              rounded-lg bg-primary px-6 py-3.5
              font-medium text-primary-foreground
              shadow-sm hover:bg-primary/90 active:bg-primary/95
              focus:outline-none focus:ring-2 focus:ring-primary/30
              transition-all duration-200
              disabled:opacity-60 disabled:pointer-events-none
            `}
          >
            {loading ? "Reserving…" : "Reserve My Spot"}
          </button>

          {/* Trust / legal note */}
          <p className="text-xs text-center text-muted-foreground/70 pt-2">
            Your email will only be used for event-related communication.
          </p>
        </form>
      )}
    </div>
  );
}
