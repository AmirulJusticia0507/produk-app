import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

const ProductEdit = ({ id }) => {
    const { data, setData, put, processing, errors, setDefaults } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(response => response.json())
            .then(product => {
                setDefaults({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                });
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/products/${id}`, {
            onSuccess: () => {
                // Optional: You can add any action on success
            }
        });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.name && <div className="text-red-600">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.description && <div className="text-red-600">{errors.description}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="text"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.price && <div className="text-red-600">{errors.price}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="text"
                        value={data.stock}
                        onChange={e => setData('stock', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.stock && <div className="text-red-600">{errors.stock}</div>}
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white" disabled={processing}>
                    Update
                </button>
            </form>
            <InertiaLink href="/products" className="text-blue-500">Back to product list</InertiaLink>
        </div>
    );
};

export default ProductEdit;
