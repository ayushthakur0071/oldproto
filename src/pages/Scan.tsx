import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertTriangle, Loader2, Sparkles, Refrigerator } from 'lucide-react';

export const Scan = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setIsCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCapturing(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCapturing(false);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setAnalyzing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const base64Data = image.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: "Identify the food item(s) in this image. For each, give Name, Category, Estimated Shelf Life (in days), and a freshness rating (0-100). Format as JSON." },
              { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const parsedResult = JSON.parse(response.text);
      setResult(parsedResult);
    } catch (error) {
      console.error("AI Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles size={14} />
          Powered by Gemini AI
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">AI Food Scanner</h1>
        <p className="text-slate-400">Scan your grocery receipt or food items to automatically update your inventory.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="aspect-video bg-slate-900 rounded-3xl border-2 border-dashed border-slate-800 overflow-hidden relative group">
            {isCapturing ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : image ? (
              <img src={image} className="w-full h-full object-cover" alt="Captured food" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <Camera size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">Camera preview will appear here</p>
              </div>
            )}
            
            <canvas ref={canvasRef} width="640" height="480" className="hidden" />
          </div>

          <div className="flex gap-4">
            {!isCapturing && !image && (
              <button 
                onClick={startCamera}
                className="flex-1 py-4 bg-emerald-500 text-slate-950 font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
              >
                <Camera size={20} />
                Open Camera
              </button>
            )}
            
            {isCapturing && (
              <button 
                onClick={captureImage}
                className="flex-1 py-4 bg-emerald-500 text-slate-950 font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
              >
                Capture Photo
              </button>
            )}

            {image && !analyzing && !result && (
              <>
                <button 
                  onClick={analyzeImage}
                  className="flex-1 py-4 bg-emerald-500 text-slate-950 font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Analyze Food
                </button>
                <button 
                  onClick={reset}
                  className="px-6 py-4 bg-slate-900 text-slate-400 border border-slate-800 font-bold rounded-2xl hover:text-white transition-all"
                >
                  <RefreshCw size={20} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center relative">
          {!image && !analyzing && !result && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 mx-auto">
                <Loader2 size={32} />
              </div>
              <p className="text-slate-500">Capture a photo to start AI analysis</p>
            </div>
          )}

          {analyzing && (
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 animate-pulse" size={24} />
              </div>
              <div className="space-y-2">
                <p className="text-white font-bold text-lg">Gemini is thinking...</p>
                <p className="text-slate-500 text-sm">Identifying items and estimating shelf life</p>
              </div>
            </div>
          )}

          {result && (
            <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Analysis Complete</h3>
                  <p className="text-sm text-emerald-500/70 font-medium">{result.length || 0} items identified</p>
                </div>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {(Array.isArray(result) ? result : [result]).map((item: any, i: number) => (
                  <div key={i} className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-200">{item.Name || item.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full border border-slate-700 uppercase font-bold tracking-wider">
                        {item.Category || item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Refrigerator size={14} />
                        <span>{item.Estimated_Shelf_Life || item.shelf_life} days</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={14} className={ (item.Freshness || item.freshness) > 50 ? 'text-emerald-500' : 'text-orange-500'} />
                        <span>{item.Freshness || item.freshness}% fresh</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                Add to Inventory
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
