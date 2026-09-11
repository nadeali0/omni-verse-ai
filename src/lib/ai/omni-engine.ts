import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Replicate from 'replicate';

export type AIModel =
  | 'gpt-4o'
  | 'gpt-4-turbo'
  | 'claude-3-5-sonnet'
  | 'claude-3-opus'
  | 'gemini-1.5-pro'
  | 'llama-3.1-405b'
  | 'mistral-large';

export type GenerationType = 'chat' | 'image' | 'video' | 'avatar' | 'voice' | 'code';

export interface AIConfig {
  openaiKey?: string;
  anthropicKey?: string;
  googleKey?: string;
  replicateKey?: string;
}

export class OmniEngine {
  private openai: OpenAI | null = null;
  private anthropic: Anthropic | null = null;
  private google: GoogleGenerativeAI | null = null;
  private replicate: Replicate | null = null;

  constructor(config: AIConfig = {}) {
    if (config.openaiKey || process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: config.openaiKey || process.env.OPENAI_API_KEY,
      });
    }

    if (config.anthropicKey || process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: config.anthropicKey || process.env.ANTHROPIC_API_KEY,
      });
    }

    if (config.googleKey || process.env.GOOGLE_AI_API_KEY) {
      this.google = new GoogleGenerativeAI(
        config.googleKey || process.env.GOOGLE_AI_API_KEY!,
      );
    }

    if (config.replicateKey || process.env.REPLICATE_API_TOKEN) {
      this.replicate = new Replicate({
        auth: config.replicateKey || process.env.REPLICATE_API_TOKEN,
      });
    }
  }

  async generateChat(
    model: AIModel,
    prompt: string,
    options?: {
      systemPrompt?: string;
      temperature?: number;
      maxTokens?: number;
      vision?: boolean;
      imageUrl?: string;
    },
  ): Promise<string> {
    if (model.startsWith('gpt')) {
      return this.generateOpenAI(model, prompt, options);
    } else if (model.startsWith('claude')) {
      return this.generateAnthropic(model, prompt, options);
    } else if (model.startsWith('gemini')) {
      return this.generateGoogle(model, prompt, options);
    } else {
      throw new Error(`Unsupported chat model: ${model}`);
    }
  }

  private async generateOpenAI(
    model: string,
    prompt: string,
    options?: any,
  ): Promise<string> {
    if (!this.openai) throw new Error('OpenAI API key not configured');

    const messages: any[] = [];
    if (options?.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }

    if (options?.vision && options?.imageUrl) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: options.imageUrl } },
        ],
      });
    } else {
      messages.push({ role: 'user', content: prompt });
    }

    const response = await this.openai.chat.completions.create({
      model,
      messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens || 2000,
    });

    return response.choices[0]?.message?.content || '';
  }

  private async generateAnthropic(
    model: string,
    prompt: string,
    options?: any,
  ): Promise<string> {
    if (!this.anthropic) throw new Error('Anthropic API key not configured');

    const response = await this.anthropic.messages.create({
      model,
      max_tokens: options?.maxTokens || 2000,
      system: options?.systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    return content.type === 'text' ? content.text : '';
  }

  private async generateGoogle(
    model: string,
    prompt: string,
    options?: any,
  ): Promise<string> {
    if (!this.google) throw new Error('Google AI API key not configured');

    const genAI = this.google;
    const modelInstance = genAI.getGenerativeModel({ model });

    const result = await modelInstance.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async generateImage(
    prompt: string,
    options?: {
      model?: 'sdxl' | 'flux' | 'sdxl-turbo';
      width?: number;
      height?: number;
      numOutputs?: number;
    },
  ): Promise<string[]> {
    if (!this.replicate) throw new Error('Replicate API token not configured');

    const model = options?.model || 'sdxl';
    const modelVersions: { [key: string]: string } = {
      sdxl: 'a00d0aee0ff3be6be147759bb9df6ff7ec452513e7a269b8c1b51efb9f0b9ecc',
      'sdxl-turbo': '39ed52f2a60c3b36b8fe38b9690bb9b69d37890f0b37e06bf1fbf81261d899de',
      flux: 'fed7de109d997bde7f7ebc9fb41cb1ef89b088f61df41ef59702eae1d81b2f65',
    };

    const output = await this.replicate.run(modelVersions[model], {
      input: {
        prompt,
        width: options?.width || 1024,
        height: options?.height || 1024,
        num_outputs: options?.numOutputs || 1,
      },
    });

    return Array.isArray(output) ? output : [output];
  }

  async generateVideo(
    prompt: string,
    options?: {
      duration?: number;
      fps?: number;
    },
  ): Promise<string> {
    if (!this.replicate) throw new Error('Replicate API token not configured');

    const output = await this.replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b1ef2d917878d998cda38aa52be6765425f8e074498f',
      {
        input: {
          text: prompt,
          duration: options?.duration || 8,
          num_frames: (options?.duration || 8) * (options?.fps || 30),
        },
      },
    );

    return output as string;
  }
}
