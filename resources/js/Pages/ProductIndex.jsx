import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

const ProductIndex = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleDelete = (id) => {
        Inertia.delete(`/api/products/${id}`, {
            onSuccess: () => setProducts(products.filter(product => product.id !== id))
        });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Product List</h1>
            <InertiaLink href="/products/create" className="text-blue-500">Add New Product</InertiaLink>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="w-1/3 text-left py-3 px-4">Name</th>
                        <th className="w-1/3 text-left py-3 px-4">Description</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Stock</th>
                        <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="w-1/3 text-left py-3 px-4">{product.name}</td>
                            <td className="w-1/3 text-left py-3 px-4">{product.description}</td>
                            <td className="text-left py-3 px-4">{product.price}</td>
                            <td className="text-left py-3 px-4">{product.stock}</td>
                            <td className="text-left py-3 px-4">
                                <InertiaLink href={`/products/edit/${product.id}`} className="text-blue-500">Edit</InertiaLink>
                                <button onClick={() => handleDelete(product.id)} className="text-red-500 ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductIndex;
