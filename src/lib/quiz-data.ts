export interface Option {
  text: string;
  tags: string[];
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Какой бюджет на обучение в год?",
    options: [
      { text: "До $3,000", tags: ["korea", "turkey", "malaysia"] },
      { text: "$3,000–$8,000", tags: ["korea", "turkey", "france", "malaysia"] },
      { text: "$8,000–$15,000", tags: ["uk", "germany", "france"] },
      { text: "Бюджет не важен", tags: ["uk", "germany"] }
    ]
  },
  {
    id: 2,
    question: "Какое направление интересует?",
    options: [
      { text: "IT и программирование", tags: ["korea", "germany", "uk"] },
      { text: "Бизнес и менеджмент", tags: ["turkey", "uk", "malaysia"] },
      { text: "Медицина", tags: ["turkey", "germany"] },
      { text: "Дизайн и искусство", tags: ["korea", "france", "uk"] }
    ]
  },
  {
    id: 3,
    question: "На каком языке хочешь учиться?",
    options: [
      { text: "Английский", tags: ["korea", "turkey", "uk", "malaysia"] },
      { text: "Немецкий", tags: ["germany"] },
      { text: "Французский", tags: ["france"] },
      { text: "Не важно", tags: ["korea", "turkey", "germany", "uk", "malaysia", "france"] }
    ]
  },
  {
    id: 4,
    question: "Какой климат предпочитаешь?",
    options: [
      { text: "Тёплый", tags: ["turkey", "malaysia", "korea"] },
      { text: "Умеренный", tags: ["germany", "uk", "france"] },
      { text: "Тропический", tags: ["malaysia"] },
      { text: "Не важно", tags: ["korea", "turkey", "germany", "uk", "malaysia", "france"] }
    ]
  },
  {
    id: 5,
    question: "Что важнее всего?",
    options: [
      { text: "Низкая стоимость", tags: ["korea", "turkey", "malaysia"] },
      { text: "Престиж диплома", tags: ["uk", "germany"] },
      { text: "Стипендии и гранты", tags: ["turkey", "korea", "germany"] },
      { text: "Простота поступления", tags: ["turkey", "malaysia"] }
    ]
  }
];
