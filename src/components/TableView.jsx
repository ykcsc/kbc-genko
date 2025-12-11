import React from 'react';
import { Table as TableIcon } from 'lucide-react';
import { SCRIPT_TYPES } from '../utils/constants';

const TableView = ({ filteredScripts, handleEdit, activeId }) => {
  return (
    <div className="max-w-6xl mx-auto mt-4 md:mt-8 bg-white md:rounded-[2rem] shadow-xl md:p-8 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden flex flex-col h-full md:h-auto pb-32 md:pb-8">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><TableIcon /> 原稿一覧</h3>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto flex-1">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">日付</th>
                  <th className="px-4 py-3">種別</th>
                  <th className="px-4 py-3">タイトル</th>
                  <th className="px-4 py-3">タグ</th>
                  <th className="px-4 py-3">担当者</th>
                  <th className="px-4 py-3 rounded-tr-lg">最終更新</th>
                </tr>
            </thead>
            <tbody>
                {filteredScripts.map(script => (
                  <tr 
                      key={script.id} 
                      onClick={() => handleEdit(script)}
                      className={`border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${activeId === script.id ? 'bg-indigo-50 hover:bg-indigo-100' : ''}`}
                  >
                      <td className="px-4 py-3 font-mono">{script.date}</td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${SCRIPT_TYPES[script.type||'MAIN'].color}`}>{script.type||'MAIN'}</span></td>
                      <td className="px-4 py-3 font-bold text-slate-800">{script.title || '(無題)'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                            {(script.tags||[]).map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 rounded text-xs">{t}</span>)}
                        </div>
                      </td>
                      <td className="px-4 py-3">{script.author}</td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {script.lastEditedBy ? script.lastEditedBy.split('@')[0] : '-'} <br/>
                        {script.lastEditedAt ? new Date(script.lastEditedAt).toLocaleString() : '-'}
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden text-center py-10 text-slate-400">
          <p>モバイル版では一覧表示はサポートされていません。</p>
          <p className="text-xs mt-2">サイドメニューのリストをご利用ください。</p>
      </div>
    </div>
  );
};

export default TableView;