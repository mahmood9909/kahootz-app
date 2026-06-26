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
        options: [
            { id: crypto.randomUUID(), title: 'Paris', config: { cssClass: 'option-paris' }, isCorrect: true },
            { id: crypto.randomUUID(), title: 'London', config: { cssClass: 'option-london' } },
        ],
        
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

    // state for captured quizId from route param and based on that we can manage the active question id and index
    readonly activeQuestionIdState = signal<string | null>(null);
    readonly activeQuestionIdxState = linkedSignal(() => this.questions().findIndex((q) => q.id === this.activeQuestionIdState()) ?? undefined);
    readonly activeQuestionState = linkedSignal(() => this.questions()[this.activeQuestionIdxState()] ?? {});

   

    addQuestion(payload: { name: string; description: string; type: QType }): void {
      
    }

    removeQuestion(index: number): void {
    }

    updateQuestion(updated: QStruct): void {
    }
}
