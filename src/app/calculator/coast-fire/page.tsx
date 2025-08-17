'use client';

import { useState } from 'react';

export default function CoastFireCalculator() {
  // Form inputs
  const [currentAge, setCurrentAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [desiredIncome, setDesiredIncome] = useState('');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [returnRate, setReturnRate] = useState('7');
  
  // Results
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Calculate Coast FIRE
  const calculateCoastFire = () => {
    const age = parseInt(currentAge);
    const savings = parseFloat(currentSavings);
    const retAge = parseInt(retirementAge);
    const income = parseFloat(desiredIncome);
    const withdrawal = parseFloat(withdrawalRate) / 100;
    const returns = parseFloat(returnRate) / 100;

    // Years until retirement
    const yearsToRetirement = retAge - age;
    
    // FIRE number needed (25x annual expenses rule)
    const fireNumber = income / withdrawal;
    
    // What current savings will grow to
    const futureValue = savings * Math.pow(1 + returns, yearsToRetirement);
    
    // Coast FIRE number (what you need now to coast to FIRE)
    const coastFireNumber = fireNumber / Math.pow(1 + returns, yearsToRetirement);
    
    // How much more needed
    const additionalNeeded = Math.max(0, coastFireNumber - savings);
    
    // Are you already Coast FIRE?
    const isCoastFire = savings >= coastFireNumber;

    const calculationResults = {
      fireNumber: fireNumber,
      coastFireNumber: coastFireNumber,
      currentSavings: savings,
      futureValue: futureValue,
      additionalNeeded: additionalNeeded,
      isCoastFire: isCoastFire,
      yearsToRetirement: yearsToRetirement,
      monthlyIncome: income
    };

    setResults(calculationResults);
    setShowResults(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔥 Coast FIRE Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how much you need to save now to "coast" to financial independence, 
            even if you never save another dollar again.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Information</h2>
            
            <div className="space-y-6">
              
              {/* Current Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Age
                </label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  placeholder="25"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Current Savings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Savings ($)
                </label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  placeholder="50000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Retirement Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Retirement Age
                </label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  placeholder="60"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Desired Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Annual Income in Retirement ($)
                </label>
                <input
                  type="number"
                  value={desiredIncome}
                  onChange={(e) => setDesiredIncome(e.target.value)}
                  placeholder="80000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Advanced Settings */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Settings</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Withdrawal Rate (%)
                    </label>
                    <input
                      type="number"
                      value={withdrawalRate}
                      onChange={(e) => setWithdrawalRate(e.target.value)}
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Return (%)
                    </label>
                    <input
                      type="number"
                      value={returnRate}
                      onChange={(e) => setReturnRate(e.target.value)}
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateCoastFire}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Calculate Coast FIRE Number
              </button>

            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Results</h2>
            
            {!showResults ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🧮</div>
                <p>Enter your information and click calculate to see your Coast FIRE results.</p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Coast FIRE Status */}
                <div className={`p-4 rounded-lg ${results.isCoastFire ? 'bg-green-100 border border-green-300' : 'bg-orange-100 border border-orange-300'}`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {results.isCoastFire ? '🎉' : '📈'}
                    </div>
                    <h3 className={`text-xl font-bold ${results.isCoastFire ? 'text-green-800' : 'text-orange-800'}`}>
                      {results.isCoastFire ? 'Congratulations! You\'ve reached Coast FIRE!' : 'You\'re on your way to Coast FIRE!'}
                    </h3>
                  </div>
                </div>

                {/* Key Numbers */}
                <div className="grid grid-cols-1 gap-4">
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Coast FIRE Number</h4>
                    <p className="text-2xl font-bold text-blue-900">
                      {formatCurrency(results.coastFireNumber)}
                    </p>
                    <p className="text-sm text-blue-700">Amount needed now to coast to FIRE</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Full FIRE Number</h4>
                    <p className="text-2xl font-bold text-purple-900">
                      {formatCurrency(results.fireNumber)}
                    </p>
                    <p className="text-sm text-purple-700">Total needed to retire (25x annual income)</p>
                  </div>

                  {!results.isCoastFire && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Additional Needed</h4>
                      <p className="text-2xl font-bold text-orange-900">
                        {formatCurrency(results.additionalNeeded)}
                      </p>
                      <p className="text-sm text-orange-700">Save this much more to reach Coast FIRE</p>
                    </div>
                  )}

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Future Value</h4>
                    <p className="text-2xl font-bold text-green-900">
                      {formatCurrency(results.futureValue)}
                    </p>
                    <p className="text-sm text-green-700">
                      What your {formatCurrency(results.currentSavings)} will grow to in {results.yearsToRetirement} years
                    </p>
                  </div>

                </div>

                {/* Explanation */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">What This Means</h4>
                  <p className="text-sm text-gray-700">
                    {results.isCoastFire 
                      ? `Amazing! Your current savings of ${formatCurrency(results.currentSavings)} will grow to ${formatCurrency(results.futureValue)} by age ${retirementAge}, which exceeds your FIRE goal of ${formatCurrency(results.fireNumber)}. You can stop saving now and still retire comfortably!`
                      : `You need ${formatCurrency(results.coastFireNumber)} total to reach Coast FIRE. Since you have ${formatCurrency(results.currentSavings)}, you need to save ${formatCurrency(results.additionalNeeded)} more. Once you reach this amount, your money will grow to ${formatCurrency(results.fireNumber)} by retirement without any additional savings.`
                    }
                  </p>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a 
            href="/" 
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>

      </div>
    </div>
  );
}