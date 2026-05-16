import { NextResponse } from 'next/server';
import { visionParser } from '@/services/visionParser';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    
    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Payload too large, limit is 5MB' }, { status: 413 });
    }

    // Convert file to buffer for Gemini 3
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Process with Vertex AI SDK (visionParser)
    const extractionResult = await visionParser(buffer, file.type);

    return NextResponse.json({
      success: true,
      data: extractionResult,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: 'Upload failed', details: String(error) }, { status: 500 });
  }
}
