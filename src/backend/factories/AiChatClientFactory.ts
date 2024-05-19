import { AiChatClientInterface } from "../../libraries/AiChatClient/AiChatClientInterface";
import { CloudflareAiChatClient } from "../../libraries/AiChatClient/Cloudflare/CloudflareAiChatClient";
import { AiChatClientOptionsFactory } from "./AiChatClientOptionsFactory";

export class AiChatClientFactory {
	/**
	 * Constructor.
	 *
	 * @param {AiChatClientOptionsFactory} aiChatClientOptionsFactory
	 */
	public constructor(
		private readonly aiChatClientOptionsFactory: AiChatClientOptionsFactory = new AiChatClientOptionsFactory()
	) {}

	/**
	 * Creates an AI chat client.
	 * 
	 * @param {any} env
	 * @returns {AiChatClientInterface}
	 */
	public create(env: any): AiChatClientInterface {
		return new CloudflareAiChatClient(env?.AI, this.aiChatClientOptionsFactory.create(env));
	}
}