"use client"
import { useState } from "react";
import Tiptap from "./Tiptap";

const BlogWrite = () => {
    const [value, setValue] = useState(null)
    const handleGetValue = (value) => {
        setValue(value)
    }
    return (
        <div className="grid place-items-center h-[75vh]">
            contact
            <Tiptap handleGetValue={handleGetValue}/>
            {/* Preview */}
            <div>
                <h3 className="text-lg font-semibold pb-1">Live Preview</h3>
                <div className="border bg-gray-50 rounded p-4 prose max-w-none [&_img]:w-full [&_img]:h-[400px]" dangerouslySetInnerHTML={{ __html: value }} />
            </div>
        </div>
    );
};

export default BlogWrite;