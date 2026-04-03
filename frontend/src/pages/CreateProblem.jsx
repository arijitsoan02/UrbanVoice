import React, { useState, useContext } from 'react';
import { UrbanContext } from '../context/urbanContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Upload, X, MapPin, AlertCircle, Loader2 } from 'lucide-react';

const CreateProblem = () => {
    const { backendUrl, token } = useContext(UrbanContext);
    const navigate = useNavigate();

    // Form States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Road');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]); // Stores actual file objects
    const [previews, setPreviews] = useState([]); // Stores blob URLs for UI display
    const [loading, setLoading] = useState(false);

    const categories = ["Road", "Water", "Electricity", "Garbage", "Other"];

    // Handle Image Selection
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        
        if (images.length + selectedFiles.length > 5) {
            return toast.error("You can only upload up to 5 images");
        }

        setImages((prev) => [...prev, ...selectedFiles]);

        // Generate previews
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    // Remove Image
    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Using FormData for Multipart Support
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('location', location);

            // Append each image to the 'images' array key
            images.forEach((image) => {
                formData.append('images', image);
            });

            const response = await axios.post(`${backendUrl}/problems/create`, formData, {
                headers: { 
                    token, // Sending token from context
                    'Content-Type': 'multipart/form-data' 
                }
            });

            if (response.data.success) {
                toast.success("Problem reported successfully!");
                navigate('/problems');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to submit report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12">
                
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Report a Problem</h1>
                    <p className="text-slate-500 font-medium">Provide details and photos to help authorities take action.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Issue Title</label>
                        <input 
                            type="text"
                            required
                            placeholder="e.g., Deep pothole on Main Street"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 transition-all font-medium"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Category</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 transition-all font-medium appearance-none cursor-pointer"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="text"
                                    required
                                    placeholder="Area or Landmark"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500 transition-all font-medium"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Description</label>
                        <textarea 
                            rows="4"
                            required
                            placeholder="Describe the problem in detail..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 transition-all font-medium resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Image Upload Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Upload Photos (Max 5)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {previews.map((url, index) => (
                                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                                    <img src={url} className="w-full h-full object-cover" alt="preview" />
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}

                            {images.length < 5 && (
                                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all text-slate-400 hover:text-blue-500">
                                    <Upload size={24} />
                                    <span className="text-[10px] font-bold mt-2 uppercase tracking-tighter">Add Photo</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Information Note */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl text-blue-700 text-sm border border-blue-100">
                        <AlertCircle className="shrink-0 mt-0.5" size={18} />
                        <p className="font-medium">Your report will be reviewed by administrators before being moved to 'Accepted' status.</p>
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={loading}
                        type="submit"
                        className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:bg-slate-400 disabled:cursor-not-allowed shadow-xl shadow-blue-100"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Posting Report...
                            </>
                        ) : (
                            'Submit Report'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProblem;