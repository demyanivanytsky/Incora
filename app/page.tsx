'use client';

import React, {FC, useEffect, useState} from 'react';
import { getUsers } from '@/services/services';
import {User} from '@/models/models';
import Link from "next/link";

const Home:FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div className="flex justify-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center mt-4 text-red-500">{error}</div>;
    }


    return (
        <div className="container mx-auto p-4">
            <h2 className="mt-4 flex justify-center font-bold text-2xl">Users Page</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full mt-4 border border-gray-300">
                    <thead>
                    <tr className="cell-class">
                        <th className="cell-class">ID</th>
                        <th className="cell-class">Name</th>
                        <th className="cell-class">Username</th>
                        <th className="cell-class">Email</th>
                        <th className="cell-class">Address</th>
                        <th className="cell-class">Phone</th>
                        <th className="cell-class">Website</th>
                        <th className="cell-class">Company</th>
                        <th className="cell-class">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="table-class">{user.id}</td>
                            <td className="table-class font-bold">{user.name}</td>
                            <td className="table-class">{user.username}</td>
                            <td className="table-class">{user.email}</td>
                            <td className="table-class">
                                {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                            </td>
                            <td className="table-class">{user.phone}</td>
                            <td className="table-class">
                                <a className="underline text-blue-500" href={`http://${user.website}`}>
                                    {user.website}
                                </a>
                            </td>
                            <td className="table-class">{user.company.name}</td>
                            <td className="table-class">
                                <Link href={`/posts/` + user.id }
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded"
                                >
                                    Posts
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
export default Home;
