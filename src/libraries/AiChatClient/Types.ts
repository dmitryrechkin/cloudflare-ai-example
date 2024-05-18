export interface AiChatClientOptions {
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

export interface AiChatClientMessage {
	role: string;
	content: string;
}

export interface AiChatClientResponse {
	response: string;
	success: boolean;
	errors: string[];
}
