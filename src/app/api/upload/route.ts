import { NextRequest, NextResponse } from 'next/server';
import { parseVisionDocument } from '@/services/visionParser';

// 5MB limit
const MAX_FILE_SIZE = 5 * 1024 * 1024; 

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const instructions = formData.get('instructions') as string || 'Extract key health metrics and text.';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // In a real production scenario, we'd stream this directly to Firebase Storage.
    // For now, we process it in-memory using Vertex AI Vision parser.
    
    const parsedData = await parseVisionDocument(buffer, file.type, instructions);

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
