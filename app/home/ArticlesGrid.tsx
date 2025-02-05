"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 定义文章的类型
type Article = {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
};

const ArticlesGrid = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 每页显示的文章数量
  const articlesPerPage = 6;

  // 获取文章数据
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data: Article[] = await response.json(); // 明确指定返回的数据类型
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // 计算当前页要展示的文章
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // 计算总页数
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // 分页函数
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 加载中的提示或错误处理
  if (loading) return <p>加载中...</p>;
  if (error) return <p>错误: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentArticles.map((article: Article) => (
          <div key={article.id} className="card shadow-xl bg-base-100 hover:bg-gray-100 transition-all duration-300">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold">{article.title}</h2>
              <p className="text-sm text-gray-500">{article.date}</p>
              <p className="mt-4">{article.content}</p>
              <p className="mt-2 text-sm text-gray-600">Written by {article.author}</p>
              <div className="card-actions justify-end">
                {/* "Read More" 按钮，链接到文章详细页面 */}
                <Link href={`/articles/${article.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页按钮 */}
      <div className="flex justify-center mt-8">
        <div className="btn-group">
          {/* Previous Button */}
          <button
            className={`btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* 页面数字 */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            className={`btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlesGrid;
