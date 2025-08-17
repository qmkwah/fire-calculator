export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-800">
            🔥 FIRE Calculator
          </a>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <a 
              href="/" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Home
            </a>
            <a 
              href="/calculator/coast-fire" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Calculator
            </a>
            <a 
              href="/blog" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Blog
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}