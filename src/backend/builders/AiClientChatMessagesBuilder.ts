import { AiClientChatMessage } from '../../libraries/AiClient/AiClientChatMessage';
import { QuestionAnswer } from '../../types/QuestionAnswer';

export class AiClientChatMessagesBuilder
{
	private questionAnswers: QuestionAnswer[] = [];
	private question: string = '';
	private systemPrompt: string = '';
	private allowWithoutContext: boolean = false;

	/**
	 * Sets the question answers.
	 *
	 * @param {QuestionAnswer[]} questionAnswers
	 * @returns {AiClientChatMessagesBuilder}
	 */
	public withQuestionAnswers(questionAnswers: QuestionAnswer[]): AiClientChatMessagesBuilder
	{
		this.questionAnswers = questionAnswers;
		return this;
	}

	/**
	 * Sets the question.
	 *
	 * @param {string} question
	 * @returns {AiClientChatMessagesBuilder}
	 */
	public withQuestion(question: string): AiClientChatMessagesBuilder
	{
		this.question = question;
		return this;
	}

	/**
	 * Sets the system prompt.
	 *
	 * @param {string} systemPrompt
	 * @returns {AiClientChatMessagesBuilder}
	 */
	public withSystemPrompt(systemPrompt: string): AiClientChatMessagesBuilder
	{
		this.systemPrompt = systemPrompt;
		return this;
	}

	/**
	 * Sets the allow without context.
	 *
	 * @param {boolean} allowWithoutContext
	 * @returns {AiClientChatMessagesBuilder}
	 */
	public withAllowWithoutContext(allowWithoutContext: boolean): AiClientChatMessagesBuilder
	{
		this.allowWithoutContext = allowWithoutContext;
		return this;
	}

	/**
	 * Resets the builder.
	 *
	 * @returns {AiClientChatMessagesBuilder}
	 */
	public reset(): AiClientChatMessagesBuilder
	{
		this.questionAnswers = [];
		this.question = '';
		this.systemPrompt = '';
		this.allowWithoutContext = false;
		return this;
	}

	/**
	 * Builds the AI chat messages.
	 *
	 * @returns {AiClientChatMessage[]}
	 */
	public build(): AiClientChatMessage[]
	{
		const contextMessages = this.getContextMessages();
		if (contextMessages.length === 0 && !this.allowWithoutContext)
		{
			return [];
		}

		const messages = [
			...contextMessages,
			{ role: 'user', content: this.question }
		];

		return messages;
	}

	/**
	 * Returns the AI context messages from the question answers.
	 *
	 * @returns {string}
	 */
	private getContextMessages(): AiClientChatMessage[]
	{
		const context = this.getContext();
		if (context.length === 0)
		{
			return [];
		}

		return [
			{ role: 'system', content: `Context:\n ${context}` },
			{ role: 'system', content: this.systemPrompt }
		];

	}

	/**
	 * Returns the AI context from the question answers.
	 *
	 * @returns {string}
	 */
	private getContext(): string
	{
		let context = '';

		this.questionAnswers.forEach((questionAnswer) =>
		{
			context += `
			Question:
			${questionAnswer.question}
			
			Answer:
			${questionAnswer.answer}
			
			`;
		});

		return context;
	}
}
