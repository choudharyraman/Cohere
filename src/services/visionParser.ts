import { getVertexModel } from '@/lib/vertex-ai';

export async function parseVisionDocument(fileBuffer: Buffer, mimeType: string, instructions: string) {
  if (!process.env.GOOGLE_CLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT === 'mock-project-id') {
    console.warn("Vertex AI not configured. Returning mock parsed data.");
    return {
      status: "mock",
      extracted_data: { note: "Mock data. Set GOOGLE_CLOUD_PROJECT." }
    };
  }

  const generativeModel = getVertexModel('gemini-1.5-pro'); // 1.5-pro supports vision

  const documentPart = {
    inlineData: {
      data: fileBuffer.toString("base64"),
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: `Extract structured data from this image/document based on these instructions: ${instructions}. Return pure JSON without any markdown formatting.`,
  };

  try {
    const request = {
      contents: [{ role: 'user', parts: [documentPart, textPart] }],
    };

    const streamingResp = await generativeModel.generateContentStream(request);
    let fullText = '';
    for await (const chunk of streamingResp.stream) {
      if (chunk.candidates && chunk.candidates[0].content.parts[0].text) {
        fullText += chunk.candidates[0].content.parts[0].text;
      }
    }
    
    // Clean up potential markdown formatting
    const cleanedText = fullText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Vision Parser Error:", error);
    throw new Error("Failed to parse document with Gemini Vision.");
  }
}
