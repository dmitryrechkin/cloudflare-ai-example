export type Bindings = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	AI_CHAT_MODEL_ID: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	AI_EMBEDDINGS_MODEL_ID: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	AI_OPTIONS_MAX_TOKENS: number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	AI_OPTIONS_TIMEOUT: number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	AI_OPTIONS_TEMPERATURE: number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	DB: D1Database;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	AI: Ai;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	VECTORIZE_INDEX: VectorizeIndex;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	VECTORIZE_OPTIONS_MIN_MATCH_SCORE: number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	VECTORIZE_OPTIONS_MAX_MATCHES: number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	ANSWER_FIND_SYSTEM_PROMPT: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	ALLOW_ANSWER_WITHOUT_CONTEXT: boolean;
}
