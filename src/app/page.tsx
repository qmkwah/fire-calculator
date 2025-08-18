'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setEmailSubmitting(true);

    try {
      // Simple email collection for homepage
      const response = await fetch('/api/collect-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'homepage'
        }),
      });

      if (response.ok) {
        setEmailSubmitted(true);
        setEmail('');
      } else {
        alert('Error subscribing. Please try again.');
      }
    } catch {
      alert('Error subscribing. Please try again.');
    } finally {
      setEmailSubmitting(false);
    }
  };

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
            <Link 
              href="/calculator/coast-fire"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Start Calculator
            </Link>
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
            <Link 
              href="/blog"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
            >
              Read Articles
            </Link>
          </div>

        </div>

        {/* Email Signup Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📧 Get FIRE Tips Weekly
          </h2>
          
          {!emailSubmitted ? (
            <>
              <p className="text-gray-600 mb-6">
                Join thousands learning to achieve financial independence faster.
              </p>
              <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  disabled={emailSubmitting}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-orange-300 transition-colors"
                >
                  {emailSubmitting ? 'Subscribing...' : 'Subscribe Free'}
                </button>
              </form>
            </>
          ) : (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-green-600 text-2xl mb-2">✅</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Welcome aboard!</h3>
              <p className="text-green-700">
                You&apos;re now subscribed to our weekly FIRE tips. Check your email for a welcome message!
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Blog Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Learn About Financial Independence
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Master the strategies and concepts behind FIRE with our comprehensive guides
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/blog/what-is-coast-fire-complete-guide" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600">
                  What is Coast FIRE?
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide to understanding Coast FIRE strategy and how it can accelerate your path to retirement.
                </p>
                <div className="text-blue-600 font-medium">
                  Read Full Guide →
                </div>
              </div>
            </Link>
            
            <Link href="/blog/how-to-calculate-fire-number-guide" className="group">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600">
                  Calculate Your FIRE Number
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn the exact formula to determine how much money you need to achieve financial independence.
                </p>
                <div className="text-green-600 font-medium">
                  Read Full Guide →
                </div>
              </div>
            </Link>
            
            <Link href="/blog/fire-strategies-for-beginners" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600">
                  FIRE Strategies
                </h3>
                <p className="text-gray-600 mb-4">
                  Practical strategies and actionable steps to start your FIRE journey today.
                </p>
                <div className="text-purple-600 font-medium">
                  Read Full Guide →
                </div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
              View All Articles
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}