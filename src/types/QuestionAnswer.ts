import { Answer } from './Answer';

export interface QuestionAnswer extends Answer {
	questionId?: number | undefined;
	question: string;
}
