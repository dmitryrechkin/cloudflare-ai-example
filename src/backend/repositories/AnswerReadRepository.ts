import { QuestionAnswer } from '../../types/QuestionAnswer';

export class AnswerReadRepository
{
	/**
	 * Constructor.
	 *
	 * @param {D1Database} database
	 */
	public constructor(
		private readonly database: D1Database
	) {}

	/**
	 * Add a question.
	 *
	 * @param {number} questionId
	 * @param {string} answer
	 * @returns {Promise<QuestionAnswer>}
	 */
	public async getByQuestionIds(questionIds: number[]): Promise<QuestionAnswer[]>
	{
		console.log(`Get answers by question ids: ${questionIds}`);

		let query = `
			SELECT
				answer.id AS answer_id,
				answer.question_id AS question_id,
				answer.answer AS answer,
				question.question AS question
			FROM
				answer INNER JOIN question
					ON answer.question_id = question.id
			WHERE `;

		for (let idx = 0; idx < questionIds.length; idx++)
		{
			if (idx > 0)
			{
				query += ' OR ';
			}

			query += ' question_id = ?';
		}

		const preparedStatement = this.database.prepare(query);

		// eslint-disable-next-line @typescript-eslint/naming-convention
		const result = (await preparedStatement.bind(...questionIds).run()) as D1Result<QuestionAnswer>;

		console.log('Results: ', JSON.stringify(result?.results ?? []));

		return result.results;
	}
}
