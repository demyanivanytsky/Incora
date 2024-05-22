'use client';

import React, { FC, useEffect, useState } from "react";
import { getPostById } from "@/services/services";

interface Post {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface DetailsProps {
    params: {
        id: number;
        postId: number;
    };
}

const Details: FC<DetailsProps> = ({ params }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData: Post = await getPostById(params.id, params.postId);
                setPost(postData);
            } catch (err) {
                setError('Failed to fetch post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [params.id, params.postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>No post found</div>;
    }

    return (
        <div className="m-6">
            <h2 className="text-2xl font-bold mb-4">Details of Post {params.id}</h2>
            <h3 className="text-lg mb-2"><span className="text-blue-500 font-semibold">PostID:</span> {post.postId}</h3>
            <p className="text-gray-600"><span className="text-blue-500 font-semibold">ID:</span> {post.id}</p>
            <p className="text-gray-600"><span className="text-blue-500 font-semibold">Name:</span> {post.name}</p>
            <p className="text-gray-600"><span className="text-blue-500 font-semibold">Email:</span> {post.email}</p>
            <p className="text-gray-600"><span className="text-blue-500 font-semibold">Body:</span> {post.body}</p>
        </div>
    );
};

export default Details;
