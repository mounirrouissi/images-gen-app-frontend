import { useState } from "react";
import TextToImageForm from "./components/TextToImage";
import ImageToImageForm from "./components/ImageToImage";
import FloatingParticles from "./components/FloatingParticles";

export default function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Enhanced Header */}
        <header className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 animate-pulse">
              ✨ Ghibli AI Studio ✨
            </h1>
            <p className="text-lg text-gray-600 font-medium">Create magical worlds with the power of AI</p>
            <div className="flex justify-center space-x-2 mt-3">
              <span className="text-2xl animate-bounce">🌸</span>
              <span className="text-2xl animate-pulse">🎨</span>
              <span className="text-2xl animate-bounce">🌙</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Enhanced Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
              <button
                onClick={() => setActiveTab("text")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "text" 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105" 
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                📝 Text to Image
              </button>
              <button
                onClick={() => setActiveTab("image")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "image" 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-105" 
                    : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                🖼️ Image to Image
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="transition-all duration-500 ease-in-out">
            {activeTab === "text" ? (
              <TextToImageForm onGenerate={setImageUrl} />
            ) : (
              <ImageToImageForm onGenerate={setImageUrl} />
            )}
          </div>

          {/* Enhanced Result Display */}
          {imageUrl && (
            <div className="mt-12 text-center animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  ✨ Your Magical Creation ✨
                </h2>
                <div className="relative group">
                  <img 
                    src={imageUrl} 
                    alt="Generated" 
                    className="rounded-2xl shadow-2xl max-w-full max-h-[600px] mx-auto transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = imageUrl;
                      link.download = 'ghibli-creation.png';
                      link.click();
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    💾 Download
                  </button>
                  <button 
                    onClick={() => setImageUrl("")}
                    className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    🗑️ Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
