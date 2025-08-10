import { useState } from "react";

export default function ImageToImageForm({ onGenerate }) {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !prompt) return;
    setLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
      const formData = new FormData();
      formData.append("image", image);
      formData.append("prompt", prompt);

      const res = await fetch(`${API_BASE_URL}/api/v1/generate`, {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();
      onGenerate(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const transformationExamples = [
    "Transform into a magical  landscape",
    "Add floating islands and mystical creatures",
    "Convert to watercolor painting with soft pastels",
    "Add cherry blossoms and golden hour lighting",
    "Transform into an enchanted forest scene"
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          🖼️ Image to Image Transformation
        </h2>
        <p className="text-gray-600">Upload your image and describe how you want to transform it</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">
            📸 Upload Your Image
          </label>
          
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-emerald-300 rounded-2xl cursor-pointer bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 group"
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Click to change image</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📷</div>
                  <p className="text-lg font-semibold text-emerald-700 mb-2">Click to upload an image</p>
                  <p className="text-sm text-emerald-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </label>
          </div>

          {image && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-emerald-700 font-medium">{image.name}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
                className="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
              >
                🗑️
              </button>
            </div>
          )}
        </div>

        {/* Transformation Prompt */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            ✨ Describe the transformation
          </label>
          <textarea
            rows="3"
            placeholder="Transform this image into a magical  scene with floating islands, mystical creatures, and golden hour lighting..."
            className="w-full border-2 border-emerald-200 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 resize-none bg-gradient-to-br from-emerald-50 to-teal-50"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />

          {/* Example Transformations */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">💡 Try these transformation ideas:</p>
            <div className="flex flex-wrap gap-2">
              {transformationExamples.slice(0, 3).map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPrompt(example)}
                  className="text-xs px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full hover:from-emerald-200 hover:to-teal-200 transition-all duration-300 transform hover:scale-105"
                >
                  {example.slice(0, 25)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading || !image || !prompt.trim()}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
            loading || !image || !prompt.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Transforming Magic...</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>🎭 Transform Image with Magic 🎭</span>
            </div>
          )}
        </button>
      </form>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
        <h3 className="font-semibold text-green-800 mb-2">💡 Transformation Tips:</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Upload clear, well-lit images for best results</li>
          <li>• Be specific about the style you want (Ghibli, watercolor, etc.)</li>
          <li>• Describe lighting, colors, and mood changes</li>
          <li>• Images are automatically resized to work with AI models</li>
        </ul>
      </div>
    </div>
  );
}
