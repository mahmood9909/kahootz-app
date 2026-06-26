import { computed, Injectable, linkedSignal, signal } from '@angular/core';
import { QType, QStruct } from '@app-types';

const MOCK_QUESTIONS: QStruct[] = [
    {
        id: '1',
        name: 'capital-of-france',
        type: 'multiple-choice',
        points: 10,
        calculationAlgorithm: 'standard',
        timeLimit: 30,
        options: [
            { id: crypto.randomUUID(), title: 'Paris', config: { cssClass: 'option-paris' }, isCorrect: true },
            { id: crypto.randomUUID(), title: 'London', config: { cssClass: 'option-london' } },
        ],
    },
    {
        id: '2',
        name: 'earth-is-flat',
        type: 'true-false',
        points: 5,
        calculationAlgorithm: 'standard',
        timeLimit: 10,
        options: [],
    },
    {
        id: '3',
        name: 'planet-closest-to-sun',
        type: 'multiple-choice',
        points: 10,
        calculationAlgorithm: 'standard',
        timeLimit: 30,
        options: [],
    },
];

@Injectable({ providedIn: 'root' })
export class QuestionStateManagementService {
    readonly questions = signal<QStruct[]>(MOCK_QUESTIONS);
    readonly activeIndex = signal(0);
    readonly activeQuestion = linkedSignal(() => this.questions()[this.activeIndex()] ?? null);

    // state for captured quizId from route param and based on that we can manage the active question id and index
    readonly activeQuestionIdState = signal<string | null>(null);
    readonly activeQuestionIdxState = linkedSignal(() => this.questions().findIndex((q) => q.id === this.activeQuestionIdState()) ?? undefined);
    readonly activeQuestionState = linkedSignal(() => this.questions()[this.activeQuestionIdxState()] ?? {});

    setActiveIndex(index: number): void {
        this.activeIndex.set(index);
    }

    addQuestion(payload: { name: string; description: string; type: QType }): void {
        const question: QStruct = {
            id: crypto.randomUUID(),
            name: payload.name,
            description: payload.description || undefined,
            type: payload.type,
            points: 10,
            calculationAlgorithm: 'standard',
            timeLimit: 30,
            options: [],
        };
        this.questions.update(qs => [...qs, question]);
        this.activeIndex.set(this.questions().length - 1);
    }

    removeQuestion(index: number): void {
        this.questions.update(qs => qs.filter((_, i) => i !== index));
        this.activeIndex.update(i => Math.min(i, this.questions().length - 1));
    }

    updateQuestion(updated: QStruct): void {
        this.questions.update(qs => qs.map(q => (q.id === updated.id ? updated : q)));
    }
}
