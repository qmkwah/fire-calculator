export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Fire Retirement Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your path to financial independence and early retirement. 
            Start with our Coast FIRE calculator and discover when you can stop saving.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Calculator Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🔥 Coast FIRE Calculator
            </h2>
            <p className="text-gray-600 mb-6">
              Find out how much you need to save now to retire comfortably later, 
              even if you never save another dollar.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Calculator
            </button>
          </div>

          {/* Blog Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📚 Learn FIRE
            </h2>
            <p className="text-gray-600 mb-6">
              Master the concepts of financial independence with our comprehensive 
              guides and strategies.
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Read Articles
            </button>
          </div>

        </div>

        {/* Email Signup Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📧 Get FIRE Tips Weekly
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands learning to achieve financial independence faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Subscribe Free
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}