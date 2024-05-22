"use client";

import React, {FC, useState} from 'react';


const AddPostPopup: FC<{
    onAddPost: (newPost: { title: string; body: string }) => void;
    onClose: () => void;
    posts: any[];
}> = ({ onAddPost, onClose, posts }) => {
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostBody, setNewPostBody] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleAddPost = () => {
        // Перевірка на наявність масиву постів перед його використанням
        if (!Array.isArray(posts)) {
            console.log("Posts data is not available.");
            return;
        }

        // Перевірка на існування поста з таким же title
        const existingPost = posts.find((post: any) => post.title === newPostTitle);
        if (existingPost) {
            setError("Post with the same title already exists.");
            return;
        }

        // Додавання нового поста
        onAddPost({ title: newPostTitle, body: newPostBody });

        // Очищення полів після додавання поста
        setNewPostTitle("");
        setNewPostBody("");
        setError(null);

        // Закриття спливаючого вікна
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Add New Post</h2>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                    placeholder="Enter body"
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                    className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-end">
                    <button onClick={handleAddPost} className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md mr-2">
                        Add Post
                    </button>
                    <button onClick={onClose} className="py-2 px-4 bg-gray-400 text-white font-semibold rounded-md">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPostPopup;

