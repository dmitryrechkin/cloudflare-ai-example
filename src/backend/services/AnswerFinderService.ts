import { AiClientChatInterface } from '../../libraries/AiClient/AiClientChatInterface';
import { AiClientChatMessage } from '../../libraries/AiClient/AiClientChatMessage';
import { Errors } from '../../types/Errors';
import { QuestionAnswer } from '../../types/QuestionAnswer';
import { AiClientChatMessagesBuilder } from '../builders/AiClientChatMessagesBuilder';
import { AnswerReadRepository } from '../repositories/AnswerReadRepository';
import { VectorizeReadService } from './VectorizeReadService';

export class AnswerFinderService
{
	/**
	 * Constructor.
	 *
	 * @param {AiChatInterface} aiClientChat
	 */
	public constructor(
		private readonly aiClientChat: AiClientChatInterface,
		private readonly vectorizeReadService: VectorizeReadService,
		private readonly answerReadRepository: AnswerReadRepository,
		private readonly aiClientChatMessagesBuilder: AiClientChatMessagesBuilder
	) {}

	/**
	 * Find an answer for a given question.
	 *
	 * @param {string} question
	 * @returns {string}
	 */
	public async findAnswer(question: string): Promise<QuestionAnswer|Errors>
	{
		console.log(`Find answer for: ${question}`);

		let questionAnswers: QuestionAnswer[] = [];
		let answer: string = '';
		let questionId: number | undefined = undefined;
		let answerId: number | undefined = undefined;

		try
		{
			questionAnswers = await this.getQuestionAnswers(question);
			questionId = questionAnswers.length === 1 ? questionAnswers[0].questionId : undefined;
			answerId = questionAnswers.length === 1 ? questionAnswers[0].answerId : undefined;

			answer = await this.getAiAnswer(this.getAiChatMessages(questionAnswers, question));
		}
		catch (error)
		{
			return this.handleErrors(error);
		}

		return {
			question,
			answer,
			questionId,
			answerId,
			vectorIds: questionAnswers.map((qa) => qa.questionId?.toString() ?? '')
		};
	}

	/**
	 * Handle errors.
	 *
	 * @param {unknown} error
	 * @returns {Errors}
	 */
	private handleErrors(error: unknown): Errors
	{
		if (error instanceof Errors)
		{
			return error;
		}
		else if (error instanceof Error)
		{
			return new Errors([error.message]);
		}

		return new Errors(['An unknown error occurred.']);
	}

	/**
	 * Get question answers.
	 *
	 * @param {string} question
	 * @returns {QuestionAnswer[]}
	 */
	private async getQuestionAnswers(question: string): Promise<QuestionAnswer[]>
	{
		const questionIds = await this.vectorizeReadService.query(question);
		const questionAnswers = await this.answerReadRepository.getByQuestionIds(questionIds);

		console.log('Question Answers: ', JSON.stringify(questionAnswers));

		return questionAnswers;
	}

	/**
	 * Get AI chat messages.
	 *
	 * @param {QuestionAnswer[]} questionAnswers
	 * @param {string} question
	 * @returns {AiClientChatMessage[]}
	 */
	private getAiChatMessages(questionAnswers: QuestionAnswer[], question: string): AiClientChatMessage[]
	{
		const aiChatMessages = this.aiClientChatMessagesBuilder
			.withQuestionAnswers(questionAnswers)
			.withQuestion(question)
			.build();

		console.log('AI Chat Messages: ', JSON.stringify(aiChatMessages));

		return aiChatMessages;
	}

	/**
	 * Get AI answer.
	 *
	 * @param {AiClientChatMessage[]} messages
	 * @returns {string}
	 */
	private async getAiAnswer(messages: AiClientChatMessage[]): Promise<string>
	{
		const aiChatResponse = await this.aiClientChat.invoke(messages);
		console.log('Ai Chat Response: ', JSON.stringify(aiChatResponse));

		if (aiChatResponse.errors.length > 0)
		{
			console.error(`Errors: ${aiChatResponse.errors}`);

			throw new Errors(aiChatResponse.errors);
		}

		return aiChatResponse.response;
	}
}
