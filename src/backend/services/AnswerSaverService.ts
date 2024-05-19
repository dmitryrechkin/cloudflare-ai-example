import { Errors } from '../../types/Errors';
import { QuestionAnswer } from '../../types/QuestionAnswer';
import { AnswerWriteRepository } from '../repositories/AnswerWriteRepository';
import { QuestionWriteRepository } from '../repositories/QuestionWriteRepository';

export class AnswerSaverService
{
	/**
	 * Constructor.
	 *
	 * @param {QuestionWriteRepository} questionWriteRepository
	 * @param {AnswerWriteRepository} answerWriteRepository
	 */
	public constructor(
		private readonly questionWriteRepository: QuestionWriteRepository,
		private readonly answerWriteRepository: AnswerWriteRepository
	) {}

	/**
	 * Save an answer.
	 *
	 * @param {QuestionAnswer} questionAnswer
	 * @returns {number} - ID of the saved answer
	 */
	public async saveAnswer(questionAnswer: QuestionAnswer): Promise<QuestionAnswer|Errors>
	{
		console.log(`Saved answer: ${questionAnswer.answer}`);

		let result: QuestionAnswer;

		try
		{
			const questionId = questionAnswer.questionId ?? (await this.questionWriteRepository.add(questionAnswer.question));
			const answerId = await this.answerWriteRepository.add(questionId, questionAnswer.answer);

			result = { ...questionAnswer, questionId, answerId };
		}
		catch (error)
		{
			console.error('Failed to save answer:', error);

			return { errors: [ (error as Error)?.message ?? 'Failed to save answer' ] };
		}

		return result;
	}
}
