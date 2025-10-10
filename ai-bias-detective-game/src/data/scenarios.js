export const biasTypes = {
  'Sampling Bias':
    'Training data that fail to represent the broader population produce uneven performance and unfair outcomes for underrepresented groups (Ferrara, 2024).',
  'Algorithmic Bias':
    'Design choices in objective functions or model heuristics can privilege certain attributes and disadvantage others (Ferrara, 2024).',
  'Representation Bias':
    'Key communities or traits missing from datasets lead models to perform worse for those users (Ferrara, 2024).',
  'Generative Bias':
    'Generative systems can mirror stereotypes and imbalances embedded in their training data (Ferrara, 2024).'
};

export const scenarioBank = [
  {
    id: 1,
    title: 'Chinese Social Media AI Writer',
    scenario:
      'A Chinese social media manager used an AI writing assistant to create a copy about the different professions students can take after graduation. GenAI generated a post that included a poster with male doctors and engineers, and female teachers and nurses.',
    question: 'What is the bias in this scenario?',
    choices: [
      'AI creating gender stereotypes.',
      'The poster included male and female characters.',
      'AI generated a copy written in Chinese only.',
      'AI highlighted only the highest-paying professions.'
    ],
    correctAnswer: 'AI creating gender stereotypes.',
    biasCategory: 'Generative Bias',
    explanation:
      'Ferrara (2024) explains that generative models can replicate stereotypes present in their data. The assistant reproduced gendered expectations by pairing certain jobs with specific genders.'
  },
  {
    id: 2,
    title: 'Singapore Voice Assistant',
    scenario:
      'A family bought a smart home voice assistant that is designed for Singaporeans. The voice assistant recognizes and responds to Singaporean English and Mandarin, but frequently misunderstands users speaking Tamil or Malay.',
    question: 'What is the bias in this scenario?',
    choices: [
      'The users are not prompting the smart home voice assistant properly.',
      'The training data contained more English and Mandarin voice samples than the other languages.',
      'The microphone has a hardware fault that lowers audio quality.',
      'Background music in the home confused the voice assistant.'
    ],
    correctAnswer:
      'The training data contained more English and Mandarin voice samples than the other languages.',
    biasCategory: 'Representation Bias',
    explanation:
      'Ferrara (2024) highlights that when datasets underrepresent certain communities, AI performance drops for those users. Limited Tamil and Malay samples cause the assistant to misinterpret those languages.'
  },
  {
    id: 3,
    title: 'Indonesian Language Learning App',
    scenario:
      'A language learning app asks users to input their full name and username upon login. The app recommends beginner lessons to users with Indonesian names but advanced courses to users with Western names.',
    question: 'What is the bias in this scenario?',
    choices: [
      'The app did not ask the country of origin.',
      'The app created unfair assumptions.',
      'The app only checked how long users spent on the welcome screen.',
      'The app limited advanced lessons to paying subscribers only.'
    ],
    correctAnswer: 'The app created unfair assumptions.',
    biasCategory: 'Sampling Bias',
    explanation:
      'Ferrara (2024) notes that biased historical patterns can shape AI outputs. The app equated Western names with fluency and Indonesian names with beginner status, embedding unfair assumptions.'
  },
  {
    id: 4,
    title: 'Manila Video Streaming App',
    scenario:
      'A video streaming platform\'s recommendation system was trained primarily on data from Metro Manila users. When expanded nationwide, the platform recommended content from Metro Manila, despite having different cultural backgrounds for users in the other provinces.',
    question: 'What is the bias in this scenario?',
    choices: [
      'The dataset did not represent the broader Filipino population.',
      'The dataset was not trained on the different preferences.',
      'The app forgot to add regional language subtitles.',
      'The internet connections outside Metro Manila were too slow for recommendations.'
    ],
    correctAnswer: 'The dataset did not represent the broader Filipino population.',
    biasCategory: 'Sampling Bias',
    explanation:
      'Ferrara (2024) discusses how narrow datasets limit generalization. Because Metro Manila viewing habits dominated training, recommendations for other regions stayed biased toward urban tastes.'
  },
  {
    id: 5,
    title: 'Japanese Dating App Algorithm',
    scenario:
      'A dating app in Tokyo asked for data such as height, age, gender, and interests. The app seemed to prioritize matches based on height, with taller users getting more visibility.',
    question: 'What is the bias in this scenario?',
    choices: [
      'Shorter users have a disadvantage in visibility, regardless of compatibility in other areas.',
      'Users who sign up during peak hours wait longer to see potential matches.',
      'Users who leave profile sections blank are automatically hidden from search.',
      'Shorter users forget to complete all compatibility quizzes, so they see fewer matches.'
    ],
    correctAnswer:
      'Shorter users have a disadvantage in visibility, regardless of compatibility in other areas.',
    biasCategory: 'Algorithmic Bias',
    explanation:
      'Ferrara (2024) points out that model design can privilege specific traits. Prioritizing height in the ranking logic sidelines shorter users even when compatibility is high.'
  }
];

export const selectRandomScenarios = (count = 5) => {
  const pool = [...scenarioBank];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
};
