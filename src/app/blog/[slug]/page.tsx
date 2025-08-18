import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog';

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.tags);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span>→</span>
            <span className="text-gray-400">{post.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            
            {/* Article Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-800 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-800 prose-strong:font-semibold
                prose-ul:text-gray-700 prose-ol:text-gray-700
                prose-li:my-1
                prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-lg
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to Action */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                🔥 Ready to Calculate Your FIRE Number?
              </h3>
              <p className="text-blue-700 mb-4">
                Put these insights into practice with our free Coast FIRE calculator and see exactly when you can achieve financial independence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/calculator/coast-fire"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Try Coast FIRE Calculator
                </Link>
                <Link 
                  href="/#email-signup"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  Get Weekly FIRE Tips
                </Link>
              </div>
            </div>

          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{relatedPost.readTime}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      <Link 
                        href={`/blog/${relatedPost.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {relatedPost.excerpt.substring(0, 100)}...
                    </p>
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm mt-2 inline-block"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>

      </div>
    </div>
  );
}