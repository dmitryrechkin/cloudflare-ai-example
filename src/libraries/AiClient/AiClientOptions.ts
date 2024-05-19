export interface AiClientOptions {
	apiKey?: string | undefined;
	organization?: string | undefined;
	project?: string | undefined;
	baseURL?: string | undefined;
	timeout?: number;
	modelId: string;
	maxRetries: number;
	maxTokens: number;
	temperature: number;
}
