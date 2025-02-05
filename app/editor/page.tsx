"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
// import { Scope_One } from 'next/font/google';

// 动态加载 MDEditor 编辑器
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const EditorPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });

  // 表单变化处理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Markdown 编辑器内容变化处理
  const handleEditorChange = (value?: string) => {
    setFormData(prevData => ({
      ...prevData,
      content: value || '', // 如果 value 是 undefined，则设置为空字符串
    }));
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data_to_send = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
    };

    try {
      const response = await fetch("/api/articles/create_art", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data_to_send),
      });

      if (!response.ok) {
        throw new Error("Failed to sumbit article!");
      }

      console.log("Sumbit article successfully!");

      setFormData({title: "", author: "", content: ""});

    } catch (error) {
      console.error("Failed to sumbit article: ", error);
    }
  
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">编辑文章</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">标题</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="请输入文章标题"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">简短描述</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="请输入简短描述"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">内容</label>
          <MDEditor
            value={formData.content}
            onChange={handleEditorChange} // 修复后的方法
            height={400}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="btn btn-primary"
          >
            保存文章
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditorPage;
