import React from 'react';
import { 
  Plus, Search, Filter, Calendar as CalendarIcon, List, 
  Trash2, Settings, Info, LogOut, User, Menu, X
} from 'lucide-react';
import { APP_ICON_URL, SCRIPT_TYPES } from '../utils/constants';
import { formatDateStr } from '../utils/helpers';

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  sidebarMode,
  setSidebarMode,
  searchParams,
  setSearchParams,
  showSearchFilters,
  setShowSearchFilters,
  members,
  tags,
  filteredScripts,
  scripts,
  activeId,
  handleEdit,
  resetForm,
  confirmNavigation,
  handleSave,
  user,
  isFirebaseEnabled,
  setShowTrashModal,
  openSettings,
  setShowCreditsModal,
  signOut,
  auth,
  errorMsg
}) => {
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-4 no-print safe-top">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><Menu size={24} /></button>
          <span className="font-bold text-lg text-slate-800">OnAir Manager</span>
        </div>
        <button onClick={handleSave} className="text-white font-bold text-sm bg-indigo-600 px-4 py-1.5 rounded-full shadow-lg shadow-indigo-200 active:scale-95 transition-all">保存</button>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}/>}
      
      {/* Sidebar Content */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-[85vw] md:w-80 lg:w-96 bg-white/90 backdrop-blur-xl border-r border-slate-200/60 transition-transform duration-300 ease-in-out flex flex-col h-full shadow-2xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} no-print`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 safe-top">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shadow-lg shadow-indigo-500/10 rounded-xl transform -rotate-3 transition-transform bg-white p-0.5">
              <img src={APP_ICON_URL} alt="Logo" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800">OnAir Manager</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-400"><X size={24} /></button>
        </div>

        <div className="px-6 pt-4 pb-2 flex gap-2">
           <div className="w-full py-2 text-sm font-bold text-center text-indigo-700 bg-indigo-50 rounded-xl"><List size={16} className="inline mr-2" /> リスト</div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            <div className="px-6 py-2">
              <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input type="text" placeholder="検索..." value={searchParams.keyword} onChange={(e) => setSearchParams({...searchParams, keyword: e.target.value})} className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-10 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                  <button onClick={() => setShowSearchFilters(!showSearchFilters)} className={`absolute right-2 top-1.5 p-1 rounded-lg ${showSearchFilters ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}><Filter size={16} /></button>
              </div>
              {showSearchFilters && (
                <div className="mt-3 bg-slate-50 p-3 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2 border border-slate-100">
                    <div className="grid grid-cols-2 gap-2">
                      <select value={searchParams.author} onChange={(e) => setSearchParams({...searchParams, author: e.target.value})} className="bg-white border-slate-200 rounded-lg text-xs py-1.5">
                        <option value="">担当者: 全て</option>
                        {members.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select value={searchParams.tag} onChange={(e) => setSearchParams({...searchParams, tag: e.target.value})} className="bg-white border-slate-200 rounded-lg text-xs py-1.5">
                        <option value="">タグ: 全て</option>
                        {tags.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2 bg-white rounded-lg p-1 border border-slate-200">
                        {['ALL', 'MAIN', 'OP'].map(t => (
                          <button key={t} onClick={() => setSearchParams({...searchParams, type: t})} className={`flex-1 text-xs py-1 rounded ${searchParams.type === t ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-500'}`}>{t}</button>
                        ))}
                    </div>
                    <button onClick={() => setSearchParams({keyword:'', author:'', tag:'', type:'ALL', startDate:'', endDate:''})} className="w-full text-xs text-slate-400 hover:text-slate-600 underline text-center">条件をクリア</button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin pb-24">
              {errorMsg && <div className="mb-2 p-3 bg-rose-50 border border-rose-200 rounded-xl flex gap-2 items-start"><p className="text-xs text-rose-600">{errorMsg}</p></div>}
              {filteredScripts.length === 0 && <div className="text-center py-8 text-slate-400 text-sm">{scripts.filter(s=>!s.deletedAt).length === 0 ? "原稿がありません" : "条件に一致する原稿がありません"}</div>}
              {filteredScripts.map(script => (
                <div key={script.id} onClick={() => handleEdit(script)} className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${activeId === script.id ? 'bg-white border-indigo-200 shadow-lg shadow-indigo-500/5 scale-[1.01]' : 'bg-transparent border-transparent hover:bg-white/60'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2 items-center flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${SCRIPT_TYPES[script.type || 'MAIN'].color}`}>{script.type || 'MAIN'}</span>
                      {(script.tags || []).slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-600">{t}</span>
                      ))}
                      {(script.tags || []).length > 3 && <span className="text-[9px] text-slate-400">+{script.tags.length - 3}</span>}
                    </div>
                    <span className="text-xs font-bold text-slate-400 font-mono shrink-0">{script.date.replace(/-/g, '/')}</span>
                  </div>
                  <h3 className={`font-bold text-base mb-1 line-clamp-1 transition-colors ${activeId === script.id ? 'text-indigo-600' : 'text-slate-700'}`}>{script.title || '（無題）'}</h3>
                  <p className="text-sm text-slate-400 line-clamp-1">{script.author || '---'}</p>
                </div>
              ))}
            </div>

            {/* フローティングアクションボタン (FAB) */}
            <button
              onClick={() => resetForm()}
              className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-20"
              title="新しい原稿を作成"
            >
              <Plus size={28} />
            </button>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2 hidden md:block">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowTrashModal(true)} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-xl text-slate-500 hover:bg-white hover:text-slate-700 transition-colors text-sm font-bold"><Trash2 size={16} /> ゴミ箱</button>
            <button onClick={openSettings} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-xl text-slate-500 hover:bg-white hover:text-slate-700 transition-colors text-sm font-bold"><Settings size={16} /> 設定</button>
            <button onClick={() => setShowCreditsModal(true)} className="p-2 rounded-xl text-slate-400 hover:bg-white hover:text-slate-600 transition-colors" title="クレジット"><Info size={16} /></button>
          </div>
          {isFirebaseEnabled && <div className="flex items-center justify-between pt-2 border-t border-slate-200/50"><div className="text-xs font-medium text-slate-400 px-2 truncate max-w-[150px]">{user?.email}</div><button onClick={() => signOut(auth)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="ログアウト"><LogOut size={16} /></button></div>}
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2 md:hidden safe-bottom shrink-0">
           <div className="flex items-center gap-2">
            <button onClick={() => {setShowTrashModal(true); setIsSidebarOpen(false);}} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-xl text-slate-500 bg-white shadow-sm text-sm font-bold"><Trash2 size={16} /> ゴミ箱</button>
            <button onClick={() => {openSettings(); setIsSidebarOpen(false);}} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-xl text-slate-500 bg-white shadow-sm text-sm font-bold"><Settings size={16} /> 設定</button>
            <button onClick={() => {setShowCreditsModal(true); setIsSidebarOpen(false);}} className="p-2 rounded-xl text-slate-400 bg-white shadow-sm" title="クレジット"><Info size={16} /></button>
           </div>
           
           <div className="flex items-center gap-2">
             {isFirebaseEnabled && user && (
               <div className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl">
                  <User size={14} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 truncate">{user.email.split('@')[0]}</span>
               </div>
             )}
             <button onClick={() => signOut(auth)} className="p-2 rounded-xl text-slate-400 bg-white shadow-sm hover:text-rose-500 transition-colors" title="ログアウト">
               <LogOut size={18} />
             </button>
           </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;