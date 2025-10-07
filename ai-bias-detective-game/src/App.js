import React, { useState } from 'react';
import { Shuffle, Brain, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

const BiasDetectiveGame = () => {
  const biasTypes = {
    'Sampling Bias':
      'Training data do not represent the wider population, so the model struggles to generalize fairly across different groups (Ferrara, 2024).',
    'Algorithmic Bias':
      'Design choices in the model or its objective function privilege certain attributes and systematically disadvantage others (Ferrara, 2024).',
    'Representation Bias':
      'Key communities or traits are underrepresented in the dataset, leading to worse performance for those groups (Ferrara, 2024).',
    'Generative Bias':
      'Content produced by generative systems echoes stereotypes or imbalances embedded in the data used to train them (Ferrara, 2024).'
  };

  const allScenarios = [
    {
      id: 1,
      title: "Chinese Social Media AI Writer",
      scenario:
        "A Chinese social media manager used an AI writing assistant to promote career paths after graduation. The AI suggested a poster that pictured male doctors and engineers alongside female teachers and nurses, even though no genders were specified in the prompt.",
      question: "What is the bias in this scenario?",
      choices: [
        "The AI reinforced gender stereotypes in how professions were depicted.",
        "The AI promoted careers with higher average salaries over others.",
        "The AI produced a poster that mixed both male and female characters.",
        "The AI responded only in simplified Chinese, ignoring multilingual audiences."
      ],
      correctAnswer: "The AI reinforced gender stereotypes in how professions were depicted.",
      biasCategory: "Generative Bias",
      explanation:
        "Ferrara (2024) notes that generative systems can reproduce stereotypical associations present in their training data. The assistant mirrored gendered patterns by pairing specific jobs with particular genders, reinforcing harmful stereotypes."
    },
    {
      id: 2,
      title: "Singapore Voice Assistant",
      scenario:
        "A family bought a smart home voice assistant designed for Singaporeans. It accurately recognizes Singaporean English and Mandarin, but frequently misunderstands users speaking Tamil or Malay.",
      question: "What is the bias in this scenario?",
      choices: [
        "The microphone sensitivity was calibrated for higher-pitched voices only.",
        "The training data contained far more English and Mandarin samples than Tamil or Malay.",
        "Users were not speaking close enough to the smart speaker.",
        "The assistant intentionally blocked responses in languages outside the app store settings."
      ],
      correctAnswer: "The training data contained far more English and Mandarin samples than Tamil or Malay.",
      biasCategory: "Representation Bias",
      explanation:
        "Ferrara (2024) describes how skewed datasets can underrepresent certain communities. Because Tamil and Malay speech were limited in the training set, the assistant fails to serve speakers of those languages fairly."
    },
    {
      id: 3,
      title: "Indonesian Language Learning App",
      scenario:
        "A language learning app asks users for their full name and username on login. The app recommends beginner lessons to users with Indonesian names but advanced courses to users with Western names.",
      question: "What is the bias in this scenario?",
      choices: [
        "The app forgot to ask users about their country of origin during sign-up.",
        "The app inferred proficiency from naming patterns, creating unfair assumptions.",
        "The app experienced a bug that swapped lesson levels randomly.",
        "The app limited advanced lessons to paying subscribers only."
      ],
      correctAnswer: "The app inferred proficiency from naming patterns, creating unfair assumptions.",
      biasCategory: "Sampling Bias",
      explanation:
        "Ferrara (2024) highlights that biased historical data can encode unjust correlations. The model learned to equate Western names with fluency and Indonesian names with beginner status, perpetuating inequities unrelated to individual skill."
    },
    {
      id: 4,
      title: "Manila Video Streaming App",
      scenario:
        "A video streaming platform trained its recommendation system on viewing data from Metro Manila users. When the service expanded nationwide, viewers in other provinces kept receiving Metro Manila-centric suggestions that did not match their preferences.",
      question: "What is the bias in this scenario?",
      choices: [
        "The dataset overrepresented Metro Manila viewers and ignored broader Filipino preferences.",
        "The app did not update its user interface translations for regional dialects.",
        "The streaming catalog only licensed shows produced in the capital region.",
        "The recommendation algorithm could not process new user accounts from provincial ISPs."
      ],
      correctAnswer: "The dataset overrepresented Metro Manila viewers and ignored broader Filipino preferences.",
      biasCategory: "Sampling Bias",
      explanation:
        "Ferrara (2024) explains that when models rely on narrow datasets, they fail to generalize to other populations. Because the training data focused on Metro Manila, recommendations for the rest of the country remained biased toward urban tastes."
    },
    {
      id: 5,
      title: "Japanese Dating App Algorithm",
      scenario:
        "A Tokyo-based dating app collects information such as height, age, gender, and interests. The app appears to prioritize taller users by giving them more visibility, regardless of shared interests or compatibility.",
      question: "What is the bias in this scenario?",
      choices: [
        "Shorter users are deprioritized because the algorithm encodes height-based preference weights.",
        "Users who sign up during peak hours wait longer to see potential matches.",
        "Users who leave profile sections blank are automatically hidden from search.",
        "Shorter users forget to complete all compatibility quizzes, so they see fewer matches."
      ],
      correctAnswer: "Shorter users are deprioritized because the algorithm encodes height-based preference weights.",
      biasCategory: "Algorithmic Bias",
      explanation:
        "Ferrara (2024) notes that design choices in scoring functions can amplify inequities. Prioritizing height in the matching logic advantages taller users while sidelining others, demonstrating algorithmic bias in the app's ranking mechanism."
    }
  ];

  const [gameScenarios, setGameScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const totalScenarios = gameScenarios.length || 5;

  const startNewGame = () => {
    const shuffled = [...allScenarios].sort(() => Math.random() - 0.5);
    setGameScenarios(shuffled.slice(0, 5));
    setCurrentScenario(0);
    setScore(0);
    setGameStarted(true);
    setGameCompleted(false);
    setShowResult(false);
    setSelectedAnswer('');
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    
    setShowResult(true);
    if (selectedAnswer === gameScenarios[currentScenario].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario < gameScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setShowResult(false);
    setSelectedAnswer('');
    setCurrentScenario(0);
    setScore(0);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="mb-6">
            <Brain className="mx-auto text-purple-600 mb-4" size={64} />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Bias Detective</h1>
            <p className="text-gray-600 text-sm">Test your knowledge of AI bias types through real-world scenarios</p>
          </div>
          
          <div className="mb-8 p-6 bg-purple-50 rounded-xl">
            <h2 className="text-xl font-semibold text-purple-800 mb-3">How to Play:</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• You'll see 5 random scenarios from different Asian contexts</li>
              <li>• Choose the most accurate description of the bias behind each scenario</li>
              <li>• See how every answer connects to four key bias categories from Ferrara (2024)</li>
              <li>• See how well you can detect bias patterns!</li>
            </ul>
          </div>
          
          <button
            onClick={startNewGame}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors flex items-center gap-3 mx-auto"
          >
            <Shuffle size={24} />
            Start Detective Mission
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <Award className="mx-auto text-yellow-500 mb-4" size={64} />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Mission Complete!</h1>
          
          <div className="mb-6 p-6 bg-yellow-50 rounded-xl">
            <p className="text-2xl font-bold text-gray-800 mb-2">Your Score: {score}/{totalScenarios}</p>
            <p className="text-gray-600 text-sm">
              {score === totalScenarios
                ? "Perfect! You're a bias detection expert!"
                : score >= Math.ceil(totalScenarios * 0.6)
                ? "Great work! You have a good understanding of AI bias."
                : "Keep learning! Understanding bias is crucial for fair AI."}
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={startNewGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
            >
              <Shuffle size={20} />
              New Mission
            </button>
            <button
              onClick={resetGame}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Back to Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scenario = gameScenarios[currentScenario];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">AI Bias Detective</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Scenario {currentScenario + 1}/{totalScenarios}</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                Score: {score}/{totalScenarios}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{scenario.title}</h2>
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 leading-relaxed text-sm">{scenario.scenario}</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">{scenario.question}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {scenario.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => setSelectedAnswer(choice)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedAnswer === choice
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700'
                } ${showResult ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
              >
                <span className="font-medium text-sm">{choice}</span>
              </button>
            ))}
          </div>

          {!showResult ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${
                selectedAnswer === scenario.correctAnswer ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  {selectedAnswer === scenario.correctAnswer ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                  <span className={`font-bold text-lg ${
                    selectedAnswer === scenario.correctAnswer ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedAnswer === scenario.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                
                <p
                  className={`text-sm ${
                    selectedAnswer === scenario.correctAnswer ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  <strong>Correct Answer:</strong> {scenario.correctAnswer}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Bias Category:</strong> {scenario.biasCategory}
                </p>
                <p className={`mt-2 text-sm ${
                  selectedAnswer === scenario.correctAnswer ? 'text-green-700' : 'text-red-700'
                }`}>
                  {scenario.explanation}
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-3">Bias Type Definitions:</h4>
                <div className="space-y-3">
                  {Object.entries(biasTypes).map(([bias, definition]) => (
                    <div
                      key={bias}
                      className={`p-3 rounded-lg ${
                        bias === scenario.biasCategory ? 'bg-green-100 border border-green-300' : 'bg-white'
                      }`}
                    >
                      <strong
                        className={`text-sm ${
                          bias === scenario.biasCategory ? 'text-green-800' : 'text-blue-800'
                        }`}
                      >
                        {bias}:
                      </strong>
                      <span
                        className={`ml-2 text-sm ${
                          bias === scenario.biasCategory ? 'text-green-700' : 'text-gray-700'
                        }`}
                      >
                        {definition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={nextScenario}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                {currentScenario < gameScenarios.length - 1 ? 'Next Scenario' : 'Complete Mission'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Reference</h3>
          <div className="text-sm text-gray-600">
            <p>
              Ferrara, E. (2024). Fairness and bias in artificial intelligence: A brief survey of sources, impacts, and mitigation strategies. <em>Sci</em>, <em>6</em>(1), 3. https://doi.org/10.3390/sci6010003
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasDetectiveGame;
