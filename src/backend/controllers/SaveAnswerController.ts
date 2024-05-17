import { Context, TypedResponse } from "hono";
import { AnswerSaverService } from "../services/AnswerSaverService";

export class SaveAnswerController {
	/**
	 * Constructor.
	 * 
	 * @param {AnswerSaverService} answerSaverService 
	 */
	public constructor(
		private readonly answerSaverService: AnswerSaverService = new AnswerSaverService()
	) {}

	/**
	 * Save an answer.
	 * 
	 * @param {Context} context
	 * @returns {Promise<TypedResponse>}
	 */
	public async execute(context: Context): Promise<TypedResponse> {
		const data = await context.req.json();

		return this.answerSaverService.saveAnswer(data.answer).then((id) => {
			return context.json({ id });
		});
	}
}