import React, { useRef, useEffect } from 'react';
import { Sliders, Printer, FileText, FileDown, Share } from 'lucide-react';
import { A4_WIDTH_PX, A4_HEIGHT_PX } from '../utils/constants';

const Preview = ({
  formData,
  printSettings,
  setPrintSettings,
  showPrintSettings,
  setShowPrintSettings,
  exportWord,
  handlePrint,
  isIOS,
  previewScale,
  setPreviewScale,
  paginateText
}) => {
  const previewWrapperRef = useRef(null);

  // プレビューの自動スケール計算 (コンポーネント内で行う)
  useEffect(() => {
    const handleResize = () => {
      if (previewWrapperRef.current) {
        const wrapperWidth = previewWrapperRef.current.offsetWidth;
        const targetWidth = A4_WIDTH_PX + 40; 
        const newScale = Math.min((wrapperWidth / targetWidth) * 0.95, 1);
        setPreviewScale(newScale);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = paginateText(formData.body);
  const { fontSize, lineHeight, letterSpacing } = printSettings;

  return (
    <div className="flex flex-col items-center animate-in zoom-in-95 duration-300 print:block print:absolute print:inset-0 print:bg-white print:z-50">
      {/* PC Toolbar */}
      <div className="hidden md:flex mb-6 items-center gap-2 no-print">
          <div className="flex bg-white/50 px-2 py-1.5 rounded-full shadow-sm">
            <button onClick={() => setShowPrintSettings(!showPrintSettings)} className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold ${showPrintSettings ? 'bg-indigo-100 text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                <Sliders size={14} /> スタイル調整
            </button>
            <div className="w-px bg-slate-300 mx-1"></div>
            <button onClick={exportWord} className="px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600">
                <FileText size={14} /> Word書出
            </button>
            <button onClick={handlePrint} className="px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600">
                {isIOS ? <Share size={14} /> : <Printer size={14} />} {isIOS ? 'PDF/共有' : '印刷'}
            </button>
          </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="md:hidden w-full px-4 mb-4 no-print space-y-2">
          <button 
            onClick={() => setShowPrintSettings(!showPrintSettings)}
            className="w-full bg-white text-slate-600 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm border border-slate-100 text-sm"
          >
            <Sliders size={16} /> 文字サイズ・行間を調整
          </button>
          
          <button 
            onClick={handlePrint}
            className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
          >
            {isIOS ? <Share size={20} /> : <Printer size={20} />} {isIOS ? 'PDFとして共有 (Word経由)' : 'PDFとして保存 (印刷)'}
          </button>
          {isIOS && <p className="text-[10px] text-slate-400 text-center mt-1">※ iOSではレイアウト保持のためWord形式で共有されます</p>}
      </div>

      {/* Settings Panel */}
      {showPrintSettings && (
          <div className="mb-6 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg animate-in slide-in-from-top-2 no-print">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">文字サイズ ({printSettings.fontSize}pt)</label>
                  <input type="range" min="10" max="24" step="0.5" value={printSettings.fontSize} onChange={(e) => setPrintSettings({...printSettings, fontSize: Number(e.target.value)})} className="w-full" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">行間 ({printSettings.lineHeight})</label>
                  <input type="range" min="1.5" max="4.0" step="0.1" value={printSettings.lineHeight} onChange={(e) => setPrintSettings({...printSettings, lineHeight: Number(e.target.value)})} className="w-full" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">字間 ({printSettings.letterSpacing}em)</label>
                  <input type="range" min="0" max="0.5" step="0.01" value={printSettings.letterSpacing} onChange={(e) => setPrintSettings({...printSettings, letterSpacing: Number(e.target.value)})} className="w-full" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">太さ ({printSettings.fontWeight})</label>
                  <select value={printSettings.fontWeight} onChange={(e) => setPrintSettings({...printSettings, fontWeight: Number(e.target.value)})} className="w-full text-sm border-slate-200 rounded-lg">
                      <option value="400">標準 (400)</option>
                      <option value="500">中太 (500)</option>
                      <option value="700">太字 (700)</option>
                  </select>
                </div>
            </div>
          </div>
      )}

      {/* Preview Content */}
      <div ref={previewWrapperRef} className="w-full flex flex-col items-center gap-8 print:block print:w-full print:h-full print:m-0 print:p-0 print-wrapper">
        {pages.map((pageText, i) => (
        <div 
          key={i} 
          style={{
              width: `${A4_WIDTH_PX * previewScale}px`,
              height: `${A4_HEIGHT_PX * previewScale}px`,
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
          }}
          className="print-wrapper origin-top-left"
        >
          <div 
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
              width: `${A4_WIDTH_PX}px`,
              height: `${A4_HEIGHT_PX}px`
            }}
            className="print-paper bg-white text-black relative overflow-hidden font-serif p-[20mm]"
          >
            <div className="absolute top-[15mm] left-[20mm] right-[20mm] h-[20mm] flex justify-between items-end border-b-2 border-black pb-2">
              <div><h1 className="text-2xl font-black tracking-widest">放送原稿 {pages.length > 1 ? `(${i+1}/${pages.length})` : ''}</h1></div>
              <div className="text-right flex gap-6 items-baseline">
                <span className={`text-sm font-bold px-2 py-0.5 border border-black ${formData.type==='OP' ? 'bg-black text-white' : 'bg-white text-black'}`}>{formData.type}</span>
                {formData.duration && <span className="text-sm font-bold bg-gray-100 px-2 py-0.5 rounded">時間: {formData.duration}</span>}
                {(formData.tags || []).map(t => <span key={t} className="text-lg font-bold border border-black px-4 py-0.5">{t}</span>)}
                <span className="text-xl font-bold font-mono">{formData.date.replace(/-/g, '.')}</span>
              </div>
            </div>
            <div className="absolute top-[45mm] right-[20mm] bottom-[20mm] left-[20mm] flex flex-row-reverse gap-8">
              {i === 0 && (
                <div className="vertical-text h-full flex flex-col justify-between items-center w-[20mm] shrink-0 border-l border-slate-300 pl-4">
                  <h2 className="text-3xl font-bold tracking-widest leading-loose">{formData.title}</h2>
                  <div className="mt-auto pt-10 text-xl font-medium">{formData.author}</div>
                </div>
              )}
              <div 
                className="vertical-text flex-1 h-full text-justify whitespace-pre-wrap"
                style={{
                  fontSize: `${fontSize}pt`,
                  fontWeight: printSettings.fontWeight,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}em`
                }}
              >
                {pageText} 
              </div>
            </div>
            <div className="absolute bottom-[5mm] left-[20mm] text-[10px] text-slate-400 print:hidden">OnAir Manager Output</div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;