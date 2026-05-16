import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Mock b.well & CLEAR EHR Sync
  return NextResponse.json({
    success: true,
    message: "Successfully synchronized EHR records with b.well FHIR API.",
    data: { panels: ["Lipid", "CBC"], medications: ["Lisinopril"] }
  });
}
