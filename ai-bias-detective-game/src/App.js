import React, { useState } from 'react';
import { Shuffle, Brain, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { biasTypes, selectRandomScenarios } from './data/scenarios';

const BiasDetectiveGame = () => {

  const [gameScenarios, setGameScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const totalScenarios = gameScenarios.length || 5;

  const startNewGame = () => {
    setGameScenarios(selectRandomScenarios());
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
      setScore((prev) => prev + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario < gameScenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1);
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
    setGameScenarios([]);
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

  if (!scenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <Brain className="mx-auto text-purple-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Preparing your mission…</h2>
          <p className="text-gray-600 text-sm">
            Gathering fresh scenarios so you can continue detecting bias with insights from Ferrara (2024).
          </p>
        </div>
      </div>
    );
  }

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
              <div
                className={`p-6 rounded-xl ${
                  selectedAnswer === scenario.correctAnswer
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {selectedAnswer === scenario.correctAnswer ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                  <span
                    className={`font-bold text-lg ${
                      selectedAnswer === scenario.correctAnswer ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
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
                <p
                  className={`mt-2 text-sm ${
                    selectedAnswer === scenario.correctAnswer ? 'text-green-700' : 'text-red-700'
                  }`}
                >
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
