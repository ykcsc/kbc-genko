import React from 'react';
import { 
  PenTool, Users, Timer, Play, Pause, RotateCcw, Undo, Clock 
} from 'lucide-react';
import { formatTime } from '../utils/helpers';

const Editor = ({
  formData,
  setFormData,
  setIsDirty,
  tags,
  toggleTag,
  members,
  elapsedTime,
  isStopwatchRunning,
  setIsStopwatchRunning,
  resetStopwatch,
  applyStopwatchTime
}) => {
  return (
    <div className="max-w-4xl mx-auto mt-4 md:mt-6 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-6 md:p-14 min-h-[600px] relative transition-all animate-in fade-in slide-in-from-bottom-4 duration-500 border border-white/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">放送日・種別</label>
          <div className="flex gap-2">
              <input type="date" value={formData.date} onChange={(e) => {setFormData({...formData, date: e.target.value}); setIsDirty(true);}} className="flex-1 bg-slate-50 border-none rounded-2xl px-4 py-3 font-mono text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/50 transition-all" />
              <div className="bg-slate-50 rounded-2xl p-1 flex">
                {['MAIN', 'OP'].map(t => <button key={t} onClick={() => {setFormData({...formData, type: t}); setIsDirty(true);}} className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${formData.type === t ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>)}
              </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">タグ</label>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <button 
                key={t}
                onClick={() => toggleTag(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  (formData.tags || []).includes(t) 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <input type="text" placeholder="タイトルを入力..." value={formData.title} onChange={(e) => {setFormData({...formData, title: e.target.value}); setIsDirty(true);}} className="w-full text-3xl md:text-4xl font-extrabold text-slate-800 placeholder-slate-300 border-none p-0 bg-transparent focus:ring-0 mb-4 tracking-tight leading-tight" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold shrink-0"><Users size={14}/></div>
          <select value={formData.author} onChange={(e) => {setFormData({...formData, author: e.target.value}); setIsDirty(true);}} className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-full text-slate-600 cursor-pointer">
            <option value="">担当者を選択...</option>
            {members.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-2 px-3">
            <div className="flex items-center gap-2 flex-1">
              <Timer size={16} className="text-slate-400" />
              <input type="text" placeholder="読み上げ時間" value={formData.duration} onChange={(e) => {setFormData({...formData, duration: e.target.value}); setIsDirty(true);}} className="bg-transparent border-none p-0 focus:ring-0 text-sm font-medium w-full text-slate-600 placeholder-slate-400" />
            </div>
            <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
              <span className="font-mono text-xs font-bold text-indigo-600 w-12 text-center">{formatTime(elapsedTime)}</span>
              <button onClick={() => setIsStopwatchRunning(!isStopwatchRunning)} className={`p-1.5 rounded-full ${isStopwatchRunning ? 'text-rose-500 bg-rose-50' : 'text-indigo-500 bg-indigo-50'}`}>{isStopwatchRunning ? <Pause size={12} fill="currentColor"/> : <Play size={12} fill="currentColor"/>}</button>
              <button onClick={resetStopwatch} className="p-1.5 text-slate-400 hover:text-slate-600"><RotateCcw size={12} /></button>
              {!isStopwatchRunning && elapsedTime > 0 && <button onClick={applyStopwatchTime} className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-full" title="時間を反映"><Undo size={12} className="transform rotate-180" /></button>}
            </div>
        </div>
      </div>
      <hr className="border-slate-100 mb-8" />
      <textarea placeholder="ここに原稿を書いてください..." value={formData.body} onChange={(e) => {setFormData({...formData, body: e.target.value}); setIsDirty(true);}} className="w-full min-h-[400px] resize-none border-none p-0 bg-transparent text-lg md:text-xl leading-relaxed text-slate-700 placeholder-slate-300 focus:ring-0 font-sans whitespace-pre-wrap" />
      <div className="flex justify-between items-center absolute bottom-4 left-8 right-8">
          <div className="text-[10px] text-slate-300 flex items-center gap-1">
            {formData.lastEditedBy && <><Clock size={10} /> 最終編集: {formData.lastEditedBy} ({formData.lastEditedAt ? new Date(formData.lastEditedAt).toLocaleString() : ''})</>}
          </div>
          <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{formData.body.length} letters</div>
      </div>
    </div>
  );
};

export default Editor;