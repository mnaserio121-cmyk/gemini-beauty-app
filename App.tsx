
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageViewer from './components/ImageViewer';
import ControlPanel from './components/ControlPanel';
import { editImageWithGemini, analyzeFaceWithGemini, constructPrompt } from './services/geminiService';
import type { MakeupOptions, MakeupApplication, FaceAnalysisResult } from './types';
import { FACE_AREAS, PRESETS } from './constants';
import { fileToGenerativePart } from './utils/fileUtils';

const initialMakeupOptions: MakeupOptions = {
  mode: 'preset',
  selectedPresetId: PRESETS[0].id,
  customPrompt: PRESETS[0].prompt,
  manualSettings: FACE_AREAS.reduce((acc, area) => {
    acc[area.id] = { areaId: area.id, areaName: area.name, color: '', intensity: 0, style: area.styles[0] };
    return acc;
  }, {} as { [key: string]: MakeupApplication }),
};

export default function App() {
  const [originalImage, setOriginalImage] = useState<{ file: File; url: string } | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [makeupOptions, setMakeupOptions] = useState<MakeupOptions>(initialMakeupOptions);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<FaceAnalysisResult | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage({ file, url: URL.createObjectURL(file) });
    setEditedImage(null);
    setError(null);
    setShowControls(true);
    setAnalysisResult(null); // Reset analysis
  };

  const handleAnalyze = useCallback(async () => {
     if (!originalImage) return;
     setIsAnalyzing(true);
     setError(null);
     try {
        const imagePart = await fileToGenerativePart(originalImage.file);
        const result = await analyzeFaceWithGemini(imagePart);
        setAnalysisResult(result);
     } catch (e) {
         console.error(e);
         setError("خطا در آنالیز چهره");
     } finally {
         setIsAnalyzing(false);
     }
  }, [originalImage]);

  const handleApplyChanges = useCallback(async () => {
    if (!originalImage) {
      setError('لطفا ابتدا یک عکس انتخاب کنید.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowControls(false); // Close controls on mobile to see result
    
    try {
      // Dynamically construct the prompt based on current mode and settings
      const finalPrompt = constructPrompt(makeupOptions);
      console.log("Sending Prompt:", finalPrompt); // Debugging

      const imagePart = await fileToGenerativePart(originalImage.file);
      const result = await editImageWithGemini(imagePart, finalPrompt);
      setEditedImage(result);
    } catch (err) {
      console.error(err);
      setError('خطایی در پردازش تصویر رخ داد. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, makeupOptions]);

  const handleSaveImage = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage;
    link.download = `gemini-beauty-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleShareImage = async () => {
    if (!editedImage) return;
    try {
      const response = await fetch(editedImage);
      const blob = await response.blob();
      const file = new File([blob], `gemini-beauty-${Date.now()}.png`, { type: 'image/png' });

      if (navigator.share) {
        await navigator.share({
          title: 'Gemini Beauty Studio',
          text: 'Look at my new AI makeover!',
          files: [file],
        });
      } else {
        alert('مرورگر شما از قابلیت اشتراک‌گذاری پشتیبانی نمی‌کند.');
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };


  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-200 overflow-hidden">
      <Header />
      
      <main className="flex-grow flex flex-col lg:flex-row h-full pt-16 relative">
        {/* Mobile Overlay */}
        <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowControls(false)}></div>
        
        {/* Control Panel Sidebar */}
        <aside className={`fixed top-0 bottom-0 right-0 w-80 lg:w-96 transform transition-transform duration-300 ease-out z-40 lg:static lg:transform-none border-l border-white/5 shadow-2xl ${showControls ? 'translate-x-0' : 'translate-x-full'}`}>
          <ControlPanel 
            options={makeupOptions} 
            setOptions={setMakeupOptions} 
            onApply={handleApplyChanges} 
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            isAnalyzing={isAnalyzing}
            analysisResult={analysisResult}
            imageLoaded={!!originalImage}
            onClose={() => setShowControls(false)}
          />
        </aside>

        {/* Main Canvas */}
        <div className="flex-grow flex flex-col items-center justify-center p-4 lg:p-8 relative bg-[#020617]">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-slate-950 to-black pointer-events-none"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-900/10 rounded-full blur-[100px] pointer-events-none"></div>

          {error && (
             <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
             </div>
          )}

          {originalImage ? (
            <ImageViewer
              originalImage={originalImage.url}
              editedImage={editedImage}
              isLoading={isLoading}
              onSave={handleSaveImage}
              onShare={handleShareImage}
            />
          ) : (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}
        </div>
        
        {/* Mobile Toggle Button */}
        {!showControls && originalImage && (
          <button 
            onClick={() => setShowControls(true)}
            className="lg:hidden fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(219,39,119,0.5)] z-20 hover:scale-110 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 16v-2m-6-6H4m16 0h-2m-6 6v-2m-6-6H4m16 0h-2M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        )}
      </main>
    </div>
  );
}
