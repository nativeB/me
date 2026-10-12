"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Accra",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

// Ticks every 15s; the minute is the smallest unit shown.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

const getSnapshot = () => format.format(new Date());
const getServerSnapshot = () => null;

/** Local time in Accra. Blank on the server so it never hydrates a stale minute. */
export default function AccraClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [h, min] = time ? time.split(":") : ["--", "--"];

  return (
    <span className="tabular-nums">
      {h}
      <span className="clock-colon">:</span>
      {min}
    </span>
  );
}
