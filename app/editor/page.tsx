"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';


// 动态加载 MDEditor 编辑器
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const EditorPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: ''
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
  const handleEditorChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      content: value,
    }));
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交的数据：', formData);
    alert('文章已提交');
    setFormData({ title: '', description: '', content: '' });
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">简短描述</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
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
            onChange={handleEditorChange}
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
