import Image from 'next/image';
import React from 'react';
import imgFromAssets from '../../../assets/1736402241.jpg';
import CloudinaryUpload from '../../../Components/CloudinaryUpload';

export const metadata = {
    title: "Gallery",
    description: "This is the project gallery system."
}

const Gallary = () => {
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Upload Images to Cloudinary</h1>
            <CloudinaryUpload />
        </div>
    );
};

export default Gallary;