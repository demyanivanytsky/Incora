"use client";
import React, {FC, useEffect, useState} from 'react';
import { getPostsByUserId } from '@/services/services';
import Link from "next/link";
import AddPostPopup from "@/components/PopUp";

interface PostProps {
    params: {
        id: number;
        postId: number;
    };
}

interface PostData {
    id: number;
    title: string;
    body: string;
}

const Post:FC<PostProps> = ({ params }) => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPostsByUserId(params.id);
                setPosts(postsData);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [params.id]);

    const handleAddPost = (newPost:{ title: string; body: string }) => {
        // Перевірка на існування поста з таким самим заголовком
        const existingPost = posts.find((post: any) => post.title === newPost.title);
        if (existingPost) {
            setError("Post with the same title already exists.");
            return;
        }

        // Додавання нового поста до списку постів
        setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="m-6">
            <h2 className="p-4 text-2xl font-bold mb-4">Posts of user {params.id}</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post: any) => (
                    <div key={post.id} className="bg-white flex flex-col items-stretch rounded-lg shadow-xl p-2">
                        <h3 className="text-lg mb-2 flex-grow">
                            <span className="text-blue-500 font-semibold">Title:</span> {post.title}
                        </h3>
                        <p className="text-gray-600 flex-grow">
                            <span className="text-blue-500 font-semibold">Body:</span> {post.body}
                        </p>
                        <Link href={`${params.id}/${params.postId}/`} className=" flex items-center justify-center mt-4 mb-4 border-2 text-blue-500 rounded-xl">Details</Link>
                    </div>
                ))}
                <button onClick={() => setIsAddPostPopupOpen(true)} className="w-[150px] h-[40px] m-20 flex justify-center items-center bg-blue-700 text-white  rounded-xl">Add New</button>
            </div>

            {/* Відображення спливаючого вікна */}
            {isAddPostPopupOpen && (
                <AddPostPopup
                    onAddPost={handleAddPost}
                    onClose={() => setIsAddPostPopupOpen(false)}
                    posts={posts}
                />
            )}
        </div>
    );
};

export default Post;
