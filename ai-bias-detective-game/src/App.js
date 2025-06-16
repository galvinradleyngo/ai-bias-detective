import React, { useState } from 'react';
import { Shuffle, Brain, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

const BiasDetectiveGame = () => {
  const biasTypes = {
    'Sampling Bias': 'Occurs when the training data are not representative of the population they serve, leading to poor performance and biased predictions for certain groups.',
    'Algorithmic Bias': 'Results from the design and implementation of the algorithm that may prioritize certain attributes and lead to unfair outcomes.',
    'Representation Bias': 'Happens when a dataset does not accurately represent the population it is meant to model, leading to inaccurate predictions.',
    'Generative Bias': 'Occurs in generative AI models where outputs disproportionately reflect specific attributes, perspectives, or patterns present in training data, leading to skewed representations.'
  };

  const allScenarios = [
    {
      id: 1,
      title: "Seoul Food Delivery App",
      scenario: "A popular food delivery app in Seoul consistently shows Korean restaurants first in search results, even when users search for 'pizza' or 'burgers'. The AI was trained mainly on data from users who frequently ordered Korean food.",
      correctAnswer: "Sampling Bias",
      explanation: "Similar to the facial recognition bias in Ferrara (2024), the training data over-represented one group (Korean food preferences), leading to poor service for users wanting other cuisines."
    },
    {
      id: 2,
      title: "Japanese Dating App Algorithm",
      scenario: "A dating app in Tokyo was programmed to prioritize matches based on height, with taller users getting more visibility. This systematically disadvantages shorter users regardless of compatibility in other areas.",
      correctAnswer: "Algorithmic Bias",
      explanation: "Like the hiring algorithm bias examples in Ferrara (2024), the app's design choices create unfair advantages for certain physical characteristics."
    },
    {
      id: 3,
      title: "Singapore Voice Assistant",
      scenario: "A smart home voice assistant works perfectly with Singaporean English and Mandarin, but frequently misunderstands users speaking Tamil or Malay. The training data contained 80% English and Mandarin voice samples, 20% other languages.",
      correctAnswer: "Representation Bias",
      explanation: "Similar to healthcare AI bias noted in Ferrara (2024), the dataset doesn't accurately represent Singapore's multilingual population."
    },
    {
      id: 4,
      title: "Chinese Social Media AI Writer",
      scenario: "An AI writing assistant for social media posts consistently suggests that doctors and engineers are male, while suggesting that teachers and nurses are female, even when users don't specify gender in their prompts.",
      correctAnswer: "Generative Bias",
      explanation: "This mirrors the GenAI bias examples in Ferrara (2024) where AI image generators showed similar gender stereotypes when creating professional images."
    },
    {
      id: 5,
      title: "Manila Video Streaming App",
      scenario: "A video streaming platform's recommendation system was trained primarily on viewing data from Metro Manila users. When expanded nationwide, it poorly recommends content for users in rural areas with different cultural preferences.",
      correctAnswer: "Sampling Bias",
      explanation: "The training data wasn't representative of the broader Filipino population, leading to poor recommendations for underrepresented geographic areas."
    },
    {
      id: 6,
      title: "Thai Online Job Platform",
      scenario: "A job matching website automatically filters out applicants over age 35 for 'dynamic' positions and applicants under 25 for 'senior' roles, based on the platform's assumption about age and job suitability.",
      correctAnswer: "Algorithmic Bias",
      explanation: "Similar to the COMPAS system bias described in Ferrara (2024), the algorithm's design creates systematic age-based discrimination."
    },
    {
      id: 7,
      title: "Korean Photo App",
      scenario: "A smartphone camera app's auto-enhancement feature was trained mostly on photos of people with light skin tones. It over-brightens photos of people with darker skin, making them look unnatural.",
      correctAnswer: "Representation Bias",
      explanation: "Like the facial recognition disparities cited in Ferrara (2024), the dataset fails to represent the full spectrum of users the app serves."
    },
    {
      id: 8,
      title: "Indonesian Language Learning App",
      scenario: "A language learning app recommends beginner lessons to users with Indonesian names but advanced courses to users with Western names, based on training data that showed this historical pattern.",
      correctAnswer: "Sampling Bias",
      explanation: "The training data reflected historical patterns rather than individual ability, creating unfair assumptions about users based on their names."
    },
    {
      id: 9,
      title: "Vietnamese E-commerce Site",
      scenario: "An online shopping platform's search algorithm was designed to show premium products first to users browsing from expensive phone models, assuming these users have higher purchasing power.",
      correctAnswer: "Algorithmic Bias",
      explanation: "The algorithm's design makes assumptions about purchasing behavior based on device type, creating different shopping experiences for users."
    },
    {
      id: 10,
      title: "Malaysian AI Chatbot",
      scenario: "A customer service chatbot trained on Malaysian internet conversations consistently uses more formal language with users who have Chinese names and casual language with users who have Malay names, reflecting patterns in its training data.",
      correctAnswer: "Generative Bias",
      explanation: "This reflects the generative bias patterns highlighted in Ferrara (2024), where AI outputs reproduce cultural patterns present in training data."
    }
  ];

  const [gameScenarios, setGameScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

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
              <li>• Identify the type of AI bias from 4 key categories based on Ferrara (2024)</li>
              <li>• Get explanations for correct answers and learn about all bias types</li>
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
            <p className="text-2xl font-bold text-gray-800 mb-2">Your Score: {score}/5</p>
            <p className="text-gray-600 text-sm">
              {score === 5 ? "Perfect! You're a bias detection expert!" :
               score >= 3 ? "Great work! You have a good understanding of AI bias." :
               "Keep learning! Understanding bias is crucial for fair AI."}
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
              <span className="text-gray-600">Scenario {currentScenario + 1}/5</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                Score: {score}/5
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{scenario.title}</h2>
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 leading-relaxed text-sm">{scenario.scenario}</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">What type of bias is this?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {Object.keys(biasTypes).map((bias) => (
              <button
                key={bias}
                onClick={() => setSelectedAnswer(bias)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedAnswer === bias
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700'
                } ${showResult ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
              >
                <span className="font-medium text-sm">{bias}</span>
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
                
                <p className={`text-sm ${
                  selectedAnswer === scenario.correctAnswer ? 'text-green-700' : 'text-red-700'
                }`}>
                  <strong>Correct Answer: {scenario.correctAnswer}</strong>
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
                    <div key={bias} className={`p-3 rounded-lg ${
                      bias === scenario.correctAnswer ? 'bg-green-100 border border-green-300' : 'bg-white'
                    }`}>
                      <strong className={`text-sm ${
                        bias === scenario.correctAnswer ? 'text-green-800' : 'text-blue-800'
                      }`}>
                        {bias}:
                      </strong>
                      <span className={`ml-2 text-sm ${
                        bias === scenario.correctAnswer ? 'text-green-700' : 'text-gray-700'
                      }`}>
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
