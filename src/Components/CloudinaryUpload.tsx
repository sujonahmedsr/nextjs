"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';

const CLOUD_NAME = 'dvjeaplel';
const UPLOAD_PRESET = 'cycle_labs';
const STORAGE_KEY = 'uploaded_image_urls';

export default function CloudinaryMultipleUpload() {
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [urls, setUrls] = useState<{ url: string, public_id: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    console.log(modalImage);
    

    // Load from localStorage
    useEffect(() => {
        const storedUrls = localStorage.getItem(STORAGE_KEY);
        if (storedUrls) {
            setUrls(JSON.parse(storedUrls));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    }, [urls]);

    // Select images and store in state
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFiles(prev => [...prev, ...Array.from(files)]);
        }
    };

    // Upload selected images
    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setLoading(true);

        const uploaders = selectedFiles.map(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            return fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            }).then(res => res.json());
        });

        const responses = await Promise.all(uploaders);
        console.log(responses, "images");

        const imageUrls = responses.map(res => ({
            url: res.secure_url,
            public_id: res.public_id
        }));
        setUrls(prev => [...prev, ...imageUrls]);
        setSelectedFiles([]); // clear selection
        setLoading(false);
    };

    // Delete uploaded image
    const handleDeleteUploaded = async (public_id: string) => {
        try {
            const res = await fetch('/api/delete-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_id }),
            });

            const data = await res.json();

            if (data.result === 'ok') {
                const updated = urls.filter(u => u.public_id !== public_id);
                setUrls(updated);
            } else {
                console.error('Error deleting image:', data);
            }
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };


    // Delete selected (preview) image
    const handleDeleteSelected = (index: number) => {
        const updated = [...selectedFiles];
        updated.splice(index, 1);
        setSelectedFiles(updated);
    };

    return (
        <div className="space-y-4 p-4 max-w-3xl mx-auto">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 w-full"
            />

            <button
                onClick={handleUpload}
                disabled={loading || selectedFiles.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Uploading..." : "Upload Selected Images"}
            </button>

            {/* 🖼️ Preview before upload */}
            {selectedFiles.length > 0 && (
                <div>
                    <h3 className="font-semibold mb-2">Selected (Not Uploaded):</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="relative">
                                <Image
                                    width={500}
                                    height={500}
                                    src={URL.createObjectURL(file)}
                                    alt={`selected-${index}`}
                                    className="rounded border shadow w-full h-64 object-cover"
                                />
                                <button
                                    onClick={() => handleDeleteSelected(index)}
                                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {modalImage && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="relative bg-white p-4 rounded shadow-lg max-w-xl w-full">
                        <button
                            onClick={() => setModalImage(null)}
                            className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-sm rounded"
                        >
                            ✖
                        </button>
                        <Image width={500} height={500} src={modalImage} alt="Preview" className="w-full h-auto rounded" />
                    </div>
                </div>
            )}

            {/* ✅ Uploaded Images */}
            <div>
                <h3 className="font-semibold mt-6 mb-2">Uploaded Images:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {urls.map((image, index) => (
                        <div key={index} className="relative">
                            <Image
                                width={500}
                                height={500}
                                src={image.url}
                                alt={`uploaded-${index}`}
                                className="rounded shadow w-full h-64 object-cover"
                                onClick={() =>setModalImage(image.url)}
                            />
                            <button
                                onClick={() => handleDeleteUploaded(image.public_id)}
                                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

