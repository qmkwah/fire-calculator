import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'FIRE Blog - Financial Independence Tips & Strategies',
  description: 'Learn about FIRE, Coast FIRE, financial independence, and early retirement strategies. Expert guides and calculators to help you retire early.',
  keywords: 'FIRE, financial independence, early retirement, Coast FIRE, investing, savings',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📚 FIRE Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master financial independence with expert guides, strategies, and real-world examples. 
            Your roadmap to early retirement starts here.
          </p>
        </div>

        {/* Featured Post (if we have posts) */}
        {posts.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-3">
                  <span className="bg-blue-100 px-2 py-1 rounded">Featured</span>
                  <span>{posts[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  <Link 
                    href={`/blog/${posts[0].slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {posts[0].title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{posts[0].author}</span>
                    <span>•</span>
                    <span>{new Date(posts[0].date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <Link 
                    href={`/blog/${posts[0].slug}`}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
                {posts[0].tags.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {posts[0].tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {posts.slice(1).map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.author}</span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm"
                  >
                    Read more →
                  </Link>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
            <p className="text-gray-600 mb-8">
              We&apos;re working on amazing FIRE content for you. Check back soon!
            </p>
            <Link 
              href="/calculator/coast-fire"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Our Calculator Instead
            </Link>
          </div>
        )}

        {/* Call to Action */}
        {posts.length > 0 && (
          <div className="text-center mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Calculate Your FIRE Number?
            </h2>
            <p className="text-gray-600 mb-6">
              Put these strategies into action with our free Coast FIRE calculator.
            </p>
            <Link 
              href="/calculator/coast-fire"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Calculator
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}