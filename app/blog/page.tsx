// app/blog/page.tsx
import Link from 'next/link';

const blogPosts = [
  { id: 1, title: 'Blog Post 1', slug: 'blog-post-1' },
  { id: 2, title: 'Blog Post 2', slug: 'blog-post-2' },
  { id: 3, title: 'Blog Post 3', slug: 'blog-post-3' },
];

export default function Blog() {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
