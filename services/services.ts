import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export async function getPostsByUserId(userId:number) {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getPostById(postId:number, id:number) {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}&id=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


