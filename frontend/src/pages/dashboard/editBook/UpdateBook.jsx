import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../store/features/book/bookApiSlice.js';
import Loading from '../../../components/Loading.jsx';
import Swal from 'sweetalert2';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';

const UpdateBook = () => {
    const { id } = useParams();
    const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
    const [updateBook] = useUpdateBookMutation();
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (bookData) {
            const fields = ['title', 'description', 'category', 'trending', 'oldPrice', 'newPrice', 'coverImage'];
            fields.forEach(field => setValue(field, bookData[field]));
        }
    }, [bookData, setValue]);

    const onSubmit = async (data) => {
        try {
            const updateBookData = {
                ...data,
                oldPrice: Number(data.oldPrice),
                newPrice: Number(data.newPrice),
            };

            await updateBook({ id, ...updateBookData }).unwrap();
            Swal.fire({
                title: "Success",
                text: "Book updated successfully!",
                icon: "success",
                showConfirmButton: true
            });
            await refetch();
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to update book. Please try again.",
                icon: "error"
            });
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center text-red-500">Error fetching book data</div>;

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                />

                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                <InputField
                    label="Cover Image URL"
                    name="coverImage"
                    type="text"
                    placeholder="Cover Image URL"
                    register={register}
                />

                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors">
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBook;
