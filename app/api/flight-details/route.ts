import { SANITY_DATASET, SANITY_PROJECT_ID } from "@/lib/constants";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function GET() {
  const query = `*[_type == "flightControl"][0]{
  flightNumber,
  flightName,

  "pilotsCount": count(pilots),
  "staffCount": count(staff),
  "passengersCount": count(passengers),

  from,
  to,

  specifications {
    maximumOperatingRange,
    speed,
    passengerCapacity,
    endurance,
    baggageCapacity,
    cruisingAltitude,
    cabinLength,
    cabinWidth,
    cabinHeight
  }
}`;
  try {
    const data = await client.fetch(query);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
