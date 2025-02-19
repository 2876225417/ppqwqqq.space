"use client";

import { useParams } from 'next/navigation'; // 使用 next/navigation 的 useParams
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight';

import Breadcrumb from '@/app/components/Breadcrumb';


type Article = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>(); // 使用 useParams 获取动态路由参数
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // 向后端请求文章数据
      const fetchArticle = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/articles/${id}`);
          
          if (!response.ok) {
            throw new Error('Article not found');
          }
          
          const data: Article = await response.json();
          setArticle(data);
          setLoading(false);
        } catch (err) {
          setError((err as Error).message);
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
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the article you&apos;re looking for does not exist.
        </p>
      </div>
    );
  }
    // 面包屑数据
    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Articles', path: '/articles' },
      { name: article ? article.title : 'Loading...', path: `/articles/${id}` },
    ];
  

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Breadcrumb items={breadcrumbs} />
      <h1 className="text-4xl font-bold text-center">{article.title}</h1>
      <p className="text-sm text-center text-gray-500 mt-2">{article.date} - By {article.author}</p>
      <div className="mt-8 text-lg text-yellow-50 leading-relaxed">
        {/* 使用 react-markdown 渲染 content */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]} // 支持表格、删除线等扩展语法
          rehypePlugins={[rehypeHighlight]} // 支持代码高亮
          components={{
            // 自定义渲染组件
            code({  className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <code className={`hljs language-${match[1]}`} {...props}>
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
      <div className="mt-8 text-center">
        <Link href="/">
          <div className="btn btn-outline btn-primary">Back to Homepage</div>
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetail;
