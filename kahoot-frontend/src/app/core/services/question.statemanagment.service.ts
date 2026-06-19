import { computed, Injectable, linkedSignal, signal } from '@angular/core';
import { QuestionType, QuizQuestion } from '@app-types';

const MOCK_QUESTIONS: QuizQuestion[] = [
    {
        id: crypto.randomUUID(),
        name: 'What is the capital of France?',
        type: 'multiple-choice',
        points: 10,
        calculationAlgorithm: 'standard',
        timeLimit: 30,
        quizConfig: [
            {
                id: crypto.randomUUID(),
                title: 'What is the capital of France?',
                options: [
                    { id: crypto.randomUUID(), title: 'Paris', config: { cssClass: 'option-paris' }, isCorrect: true },
                    { id: crypto.randomUUID(), title: 'London', config: { cssClass: 'option-london' } },
                ],
            },
        ],
    },
    {
        id: crypto.randomUUID(),
        name: 'The Earth is flat.',
        type: 'true-false',
        points: 5,
        calculationAlgorithm: 'standard',
        timeLimit: 10,
        quizConfig: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'Which planet is closest to the Sun?',
        type: 'multiple-choice',
        points: 10,
        calculationAlgorithm: 'standard',
        timeLimit: 30,
        quizConfig: [],
    },
];

@Injectable({ providedIn: 'root' })
export class QuestionStateManagementService {
    readonly questions = signal<QuizQuestion[]>(MOCK_QUESTIONS);
    readonly activeIndex = signal(0);
    readonly activeQuestion = linkedSignal(() => this.questions()[this.activeIndex()] ?? null);

    readonly activeQuestionState = signal<QuizQuestion | null>(null);
    readonly activeQuestionIdState = computed(() => this.activeQuestion()?.id ?? null);

    setActiveIndex(index: number): void {
        this.activeIndex.set(index);
    }

    addQuestion(payload: { name: string; description: string; type: QuestionType }): void {
        const question: QuizQuestion = {
            id: crypto.randomUUID(),
            name: payload.name,
            description: payload.description || undefined,
            type: payload.type,
            points: 10,
            calculationAlgorithm: 'standard',
            timeLimit: 30,
            quizConfig: [],
        };
        this.questions.update(qs => [...qs, question]);
        this.activeIndex.set(this.questions().length - 1);
    }

    removeQuestion(index: number): void {
        this.questions.update(qs => qs.filter((_, i) => i !== index));
        this.activeIndex.update(i => Math.min(i, this.questions().length - 1));
    }

    updateQuestion(updated: QuizQuestion): void {
        this.questions.update(qs => qs.map(q => (q.id === updated.id ? updated : q)));
    }
}
