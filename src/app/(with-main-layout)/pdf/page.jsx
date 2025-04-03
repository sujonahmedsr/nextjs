"use client"

import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // 👈 এটি ইমপোর্ট করতে হবে

export default function PdfMaker() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        institute: "",
        department: "",
        cgpa: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generatePDF = (isDownload = false) => {
        const doc = new jsPDF();

        // Add a logo (random placeholder image)
        const imgUrl = "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
        doc.addImage(imgUrl, "JPEG", 10, 10, 30, 30);

        // Add address at the top-right corner
        doc.text("Company Address", 140, 20);
        doc.text("123 Random Street", 140, 30);
        doc.text("City, Country", 140, 40);

        // Use autoTable to create a table
        autoTable(doc, { // 👈 `autoTable` ব্যবহার করা হয়েছে
            startY: 50,
            head: [["Field", "Value"]],
            body: [
                ["Name", formData.name],
                ["Email", formData.email],
                ["Phone", formData.phone],
                ["Address", formData.address],
                ["Institute", formData.institute],
                ["Department", formData.department],
                ["CGPA", formData.cgpa],
            ],
        });

        if (isDownload) {
            doc.save(`${formData.name}Details.pdf`)
        } else {
            const pdfOutput = doc.output("bloburl");
            window.open(pdfOutput, "_blank");
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className="flex flex-col gap-4 w-full md:w-1/2">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2" />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="border p-2" />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2" />
                <input type="text" name="institute" placeholder="Institute" onChange={handleChange} className="border p-2" />
                <input type="text" name="department" placeholder="Department" onChange={handleChange} className="border p-2" />
                <input type="text" name="cgpa" placeholder="CGPA" onChange={handleChange} className="border p-2" />
            </div>
            <div className="border p-4 w-full md:w-1/2">
                <h2 className="text-lg font-bold">User Details</h2>
                <table className="w-full border-collapse border border-gray-500">
                    <tbody>
                        <tr><td className="border p-2">Name</td><td className="border p-2">{formData.name}</td></tr>
                        <tr><td className="border p-2">Email</td><td className="border p-2">{formData.email}</td></tr>
                        <tr><td className="border p-2">Phone</td><td className="border p-2">{formData.phone}</td></tr>
                        <tr><td className="border p-2">Address</td><td className="border p-2">{formData.address}</td></tr>
                        <tr><td className="border p-2">Institute</td><td className="border p-2">{formData.institute}</td></tr>
                        <tr><td className="border p-2">Department</td><td className="border p-2">{formData.department}</td></tr>
                        <tr><td className="border p-2">CGPA</td><td className="border p-2">{formData.cgpa}</td></tr>
                    </tbody>
                </table>
                <div className="flex gap-4 mt-4">
                    <button className="bg-blue-500 text-white p-2" onClick={()=>generatePDF(false)}>View Details</button>
                    <button className="bg-green-500 text-white p-2" onClick={()=>generatePDF(true)}>Download PDF</button>
                </div>
            </div>
        </div>
    );
}

