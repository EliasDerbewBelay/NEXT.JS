"use client";

import { useState } from "react";

export default function BookEvent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
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

          {/* Submit button */}
          <button
            type="submit"
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
            Reserve My Spot
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
