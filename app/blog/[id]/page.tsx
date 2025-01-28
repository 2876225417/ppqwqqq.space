"use client";

// app/blog/[id]/page.tsx
import { useParams } from 'next/navigation';  // 使用 next/navigation 的 useParams
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ArticleDetail = () => {
  const { id } = useParams(); // 使用 useParams 获取动态路由参数
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // 向后端请求文章数据
      const fetchArticle = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8080/articles/${id}`);
          
          if (!response.ok) {
            throw new Error('Article not found');
          }
          
          const data = await response.json();
          setArticle(data);
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-dots loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-16">
        <h2 className="text-3xl font-bold">Error: {error}</h2>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center my-16">
        <h2 className="text-3xl font-bold">Article Not Found</h2>
        <p className="mt-4 text-lg text-gray-600">Sorry, the article you're looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center">{article.title}</h1>
      <p className="text-sm text-center text-gray-500 mt-2">{article.date} - By {article.author}</p>
      <div className="mt-8 text-lg text-gray-800 leading-relaxed">
        <p>{article.content}</p>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="btn btn-outline btn-primary">Back to Homepage</Link>
      </div>
    </div>
  );
};

export default ArticleDetail;
