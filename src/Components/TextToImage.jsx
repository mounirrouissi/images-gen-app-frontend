import { useState } from "react";

export default function TextToImageForm({ onGenerate }) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("anime");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("1024x1024");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
      const res = await fetch(`${API_BASE_URL}/api/v1/generate-from-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, size }),
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

  const examplePrompts = [
    "A magical floating castle in the clouds with cherry blossoms",
    "Enchanted forest with glowing mushrooms and fireflies",
    "A peaceful village by a crystal clear lake at sunset",
    "Ancient tree house connected by wooden bridges",
    "Mystical garden with floating islands and waterfalls"
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🎨 Text to Image Magic
        </h2>
        <p className="text-gray-600">Describe your dream and watch it come to life</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ✨ Describe your magical scene
          </label>
          <textarea
            rows="4"
            placeholder="A serene  landscape with rolling hills, ancient trees, and a small cottage with smoke rising from the chimney..."
            className="w-full border-2 border-purple-200 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none bg-gradient-to-br from-purple-50 to-pink-50"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          
          {/* Example Prompts */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">💡 Try these magical prompts:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.slice(0, 3).map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPrompt(example)}
                  className="text-xs px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full hover:from-purple-200 hover:to-pink-200 transition-all duration-300 transform hover:scale-105"
                >
                  {example.slice(0, 30)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style and Size Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              🎭 Art Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full border-2 border-purple-200 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50"
            >
              <option value="anime">🌸 Anime Style</option>
              <option value="fantasy">🧚 Fantasy Art</option>
              <option value="ghibli">🏰 Studio Ghibli</option>
              <option value="realistic">📸 Photographic</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              📐 Image Size
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border-2 border-purple-200 px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50"
            >
              <option value="512x512">📱 Small (512×512)</option>
              <option value="768x768">💻 Medium (768×768)</option>
              <option value="1024x1024">🖥️ Large (1024×1024)</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
            loading || !prompt.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Magic...</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>✨ Generate Magical Image ✨</span>
            </div>
          )}
        </button>
      </form>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tips for Better Results:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Be descriptive with colors, lighting, and mood</li>
          <li>• Include specific details like "golden hour lighting" or "misty atmosphere"</li>
          <li>• Mention art styles like "watercolor", "oil painting", or "digital art"</li>
          <li>• Add emotional elements like "peaceful", "mysterious", or "whimsical"</li>
        </ul>
      </div>
    </div>
  );
}
