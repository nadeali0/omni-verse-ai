import { NextRequest, NextResponse } from 'next/server';
import { generateRequestSchema } from '@/lib/validations/generate';
import { generateWithFallback } from '@/lib/ai/generate';
import { prisma } from '@/lib/prisma';
import { toast } from 'sonner';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = generateRequestSchema.parse(body);

    // TODO: Add authentication to get userId from session
    const userId = body.userId || 'test-user-id';

    // Check user credits
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 },
      );
    }

    // Generate content
    const result = await generateWithFallback(
      userId,
      validatedData.type,
      validatedData.model,
      validatedData.prompt,
      {
        systemPrompt: validatedData.systemPrompt,
        temperature: validatedData.temperature,
        maxTokens: validatedData.maxTokens,
        imageUrl: validatedData.imageUrl,
        vision: validatedData.vision,
        imageModel: validatedData.imageModel,
        width: validatedData.width,
        height: validatedData.height,
        numOutputs: validatedData.numOutputs,
      },
    );

    // Save generation record
    const generation = await prisma.generation.create({
      data: {
        userId,
        type: validatedData.type,
        model: validatedData.model,
        prompt: validatedData.prompt,
        result: typeof result === 'string' ? result : JSON.stringify(result),
        creditsUsed: validatedData.type === 'image' ? 5 : 1,
      },
    });

    // Deduct credits
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: generation.creditsUsed,
        },
      },
    });

    return NextResponse.json({
      success: true,
      generationId: generation.id,
      result,
      creditsUsed: generation.creditsUsed,
    });
  } catch (error: any) {
    console.error('Generation error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Generation failed',
      },
      { status: 400 },
    );
  }
}
