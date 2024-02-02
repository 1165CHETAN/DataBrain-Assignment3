import React, { useState, useEffect } from 'react';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
      const postData = await response.json();
      setPosts([...posts, ...postData]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchCommentsCount = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const commentsData = await response.json();
      const countMap = {};

      commentsData.forEach((comment) => {
        countMap[comment.postId] = countMap[comment.postId] ? countMap[comment.postId] + 1 : 1;
      });

      setCommentsCount(countMap);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchPosts(1);
    fetchCommentsCount();
  }, []);

  const loadMore = () => {
    const postsPerPage = 9;
    const nextPage = Math.ceil(posts.length / postsPerPage) + 1;
    fetchPosts(nextPage);
  };
  
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-sky-500">👋Hey welcome to DataBrain | Assignment-3</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-violet-500 p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-100">{post.body}</p>
            <p className="mt-4 text-sm text-white">Comments Count: {commentsCount[post.id] || 0}</p>
          </div>
        ))}
      </div>
      <button
        className="mt-2 mb-2 p-2 bg-green-500 text-white rounded hover:bg-blue-700"
        onClick={loadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default Posts;
