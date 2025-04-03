"use client"
import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function CvMaker() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    institute: "",
    department: "",
    cgpa: "",
    image: null,
    experience: "",
    skills: "",
    projects: "",
    linkedin: "",
    template: "classic", // Default template
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const generatePDF = (isDownload = false) => {
    const doc = new jsPDF();
    
    // Add image if available
    if (formData.image) {
      doc.addImage(formData.image, "JPEG", 10, 10, 50, 50);
    }

    // Add template-specific styles
    if (formData.template === "modern") {
      doc.setFontSize(14);
      doc.setTextColor(50, 50, 50);
    } else if (formData.template === "classic") {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
    }

    // Adding Company Address (static text)
    doc.text("Company Address", 140, 20);
    doc.text("123 Random Street", 140, 30);
    doc.text("City, Country", 140, 40);

    // Table with user details
    autoTable(doc, {
      startY: 70,
      head: [["Field", "Value"]],
      body: [
        ["Name", formData.name],
        ["Email", formData.email],
        ["Phone", formData.phone],
        ["Address", formData.address],
        ["Institute", formData.institute],
        ["Department", formData.department],
        ["CGPA", formData.cgpa],
        ["Experience", formData.experience],
        ["Skills", formData.skills],
        ["Projects", formData.projects],
        ["LinkedIn", formData.linkedin],
      ],
    });

    if (isDownload) {
      doc.save("UserDetails.pdf"); // Download the PDF
    } else {
      const pdfOutput = doc.output("bloburl");
      window.open(pdfOutput, "_blank"); // Open in new tab
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        {/* User Input Form */}
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2" />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="border p-2" />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2" />
        <input type="text" name="institute" placeholder="Institute" onChange={handleChange} className="border p-2" />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} className="border p-2" />
        <input type="text" name="cgpa" placeholder="CGPA" onChange={handleChange} className="border p-2" />
        <input type="text" name="experience" placeholder="Work Experience" onChange={handleChange} className="border p-2" />
        <input type="text" name="skills" placeholder="Skills" onChange={handleChange} className="border p-2" />
        <input type="text" name="projects" placeholder="Projects" onChange={handleChange} className="border p-2" />
        <input type="text" name="linkedin" placeholder="LinkedIn Profile URL" onChange={handleChange} className="border p-2" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="border p-2" />
        
        {/* Template Selection */}
        <select
          name="template"
          onChange={handleChange}
          className="border p-2 mt-4"
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
        </select>
      </div>

      <div className="border p-4 w-full md:w-1/2">
        <h2 className="text-lg font-bold">User Details</h2>
        {/* Display uploaded image */}
        {formData.image && <img src={formData.image} alt="Profile" className="w-20 h-20 object-cover" />}
        <table className="w-full border-collapse border border-gray-500">
          <tbody>
            <tr><td className="border p-2">Name</td><td className="border p-2">{formData.name}</td></tr>
            <tr><td className="border p-2">Email</td><td className="border p-2">{formData.email}</td></tr>
            <tr><td className="border p-2">Phone</td><td className="border p-2">{formData.phone}</td></tr>
            <tr><td className="border p-2">Address</td><td className="border p-2">{formData.address}</td></tr>
            <tr><td className="border p-2">Institute</td><td className="border p-2">{formData.institute}</td></tr>
            <tr><td className="border p-2">Department</td><td className="border p-2">{formData.department}</td></tr>
            <tr><td className="border p-2">CGPA</td><td className="border p-2">{formData.cgpa}</td></tr>
            <tr><td className="border p-2">Experience</td><td className="border p-2">{formData.experience}</td></tr>
            <tr><td className="border p-2">Skills</td><td className="border p-2">{formData.skills}</td></tr>
            <tr><td className="border p-2">Projects</td><td className="border p-2">{formData.projects}</td></tr>
            <tr><td className="border p-2">LinkedIn</td><td className="border p-2">{formData.linkedin}</td></tr>
          </tbody>
        </table>
        <div className="flex gap-4 mt-4">
          <button className="bg-blue-500 text-white p-2" onClick={() => generatePDF(false)}>View Details</button>
          <button className="bg-green-500 text-white p-2" onClick={() => generatePDF(true)}>Download PDF</button>
        </div>
      </div>
    </div>
  );
}
