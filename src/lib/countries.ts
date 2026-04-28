export interface Country {
  slug: string;
  name: string;
  flag: string;
  price: string;
  uniCount: string;
  description: string;
  gradient: string;
  whyReasons: string[];
  topUniversities: string[];
  scholarships: string;
}

export const countries: Country[] = [
  {
    slug: "korea",
    name: "Южная Корея",
    flag: "🇰🇷",
    price: "от $3,000/год",
    uniCount: "45+ университетов",
    description: "Передовые технологии, K-культура и доступные цены.",
    gradient: "from-rose-200 to-rose-100",
    whyReasons: ["K-culture и технологии", "Доступная стоимость", "Стипендии GKS до 100%", "Безопасная страна"],
    topUniversities: ["Seoul National University", "Yonsei University", "Korea University", "KAIST", "Sungkyunkwan University"],
    scholarships: "GKS (Korean Government Scholarship) покрывает 100% обучения + проживание + стипендию."
  },
  {
    slug: "turkey",
    name: "Турция",
    flag: "🇹🇷",
    price: "от $2,500/год",
    uniCount: "60+ университетов",
    description: "Стипендии, культурная близость и доступное образование.",
    gradient: "from-red-200 to-red-100",
    whyReasons: ["Культурная близость", "Огромное количество грантов", "Отличный климат", "Упрощенная виза"],
    topUniversities: ["Bilkent University", "Koc University", "METU", "Bogazici University"],
    scholarships: "Turkiye Burslari покрывает 100% обучения, проживание, страховку и перелет."
  },
  {
    slug: "germany",
    name: "Германия",
    flag: "🇩🇪",
    price: "от €0/год",
    uniCount: "100+ университетов",
    description: "Бесплатное обучение в государственных университетах.",
    gradient: "from-amber-200 to-amber-100",
    whyReasons: ["Бесплатное образование", "Высокий уровень жизни", "Возможность работать во время учебы", "Сильные технические вузы"],
    topUniversities: ["TU Munich", "LMU Munich", "Heidelberg University", "Humboldt University"],
    scholarships: "DAAD предоставляет множество стипендий для иностранных студентов на магистратуру и PhD."
  },
  {
    slug: "uk",
    name: "Великобритания",
    flag: "🇬🇧",
    price: "от £12,000/год",
    uniCount: "80+ университетов",
    description: "Престиж, английский язык и дипломы с мировым признанием.",
    gradient: "from-blue-200 to-blue-100",
    whyReasons: ["Одни из лучших вузов мира", "Год учебы на магистратуре", "Английский язык", "Post-Study Work виза на 2 года"],
    topUniversities: ["University of Oxford", "University of Cambridge", "Imperial College London", "UCL", "King's College London"],
    scholarships: "Chevening Scholarship полностью покрывает обучение, проживание и перелет (магистратура)."
  },
  {
    slug: "malaysia",
    name: "Малайзия",
    flag: "🇲🇾",
    price: "от $4,000/год",
    uniCount: "30+ университетов",
    description: "Обучение на английском, тропики и доступная жизнь.",
    gradient: "from-teal-200 to-teal-100",
    whyReasons: ["Низкая стоимость жизни", "Двойные дипломы с вузами UK/USA", "Теплый климат круглый год", "Безопасность"],
    topUniversities: ["Universiti Malaya", "UCSI University", "Taylor's University", "Monash University Malaysia"],
    scholarships: "MIS (Malaysian International Scholarship) для талантливых студентов магистратуры и PhD."
  },
  {
    slug: "france",
    name: "Франция",
    flag: "🇫🇷",
    price: "от €2,770/год",
    uniCount: "50+ университетов",
    description: "Низкая стоимость обучения, искусство, дизайн и бизнес.",
    gradient: "from-indigo-200 to-indigo-100",
    whyReasons: ["Относительно недорогое обучение", "Богатое культурное наследие", "Лучшие бизнес-школы", "Скидки для студентов"],
    topUniversities: ["Sorbonne University", "Ecole Polytechnique", "HEC Paris", "Sciences Po"],
    scholarships: "Стипендия Eiffel от правительства Франции покрывает расходы на проживание (до €1181/мес)."
  }
];
