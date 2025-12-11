import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { formatDateStr } from '../utils/helpers';
import { SCRIPT_TYPES } from '../utils/constants';

const Calendar = ({
  calendarDate,
  setCalendarDate,
  scripts,
  handleCalendarClick
}) => {

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const paddingDays = [];
    for (let i = 0; i < firstDay.getDay(); i++) paddingDays.push(null);
    const days = [];
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return [...paddingDays, ...days];
  };

  const getCalendarWeeks = (date) => {
    const days = getDaysInMonth(date);
    const weeks = [];
    let currentWeek = [];
    
    days.forEach((day) => {
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
        currentWeek.push(day);
    });
    
    // 最後の週
    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }
        weeks.push(currentWeek);
    }
    return weeks;
  };

  return (
    <div className="max-w-6xl mx-auto mt-4 md:mt-8 bg-white md:rounded-[2rem] shadow-xl md:p-8 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden flex flex-col h-full md:h-auto pb-32 md:pb-8">
      <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2"><CalendarIcon /> カレンダー</h3>
          <div className="flex items-center gap-2 md:gap-4 bg-slate-100 rounded-xl p-1">
            <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth()-1, 1))} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronLeft size={20}/></button>
            <span className="font-bold text-sm md:text-lg px-2">{calendarDate.getFullYear()}年 {calendarDate.getMonth() + 1}月</span>
            <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth()+1, 1))} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronRight size={20}/></button>
            <button onClick={() => setCalendarDate(new Date())} className="text-xs font-bold px-3 py-1.5 bg-white rounded-lg hover:bg-slate-50 transition-colors border border-slate-200 ml-1">今月</button>
          </div>
      </div>
      
      {/* CSS Grid Calendar - Responsive */}
      <div className="grid grid-cols-7 border border-slate-200 bg-slate-200 rounded-xl overflow-hidden flex-1 auto-rows-fr">
          {['日', '月', '火', '水', '木', '金', '土'].map((d,i) => (
            <div key={i} className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-500 h-8 flex items-center justify-center">{d}</div>
          ))}
          {getCalendarWeeks(calendarDate).flat().map((date, i) => {
            if (!date) return <div key={i} className="bg-white min-h-[80px] md:min-h-[100px]" />;
            const dateStr = formatDateStr(date);
            const daysScripts = scripts.filter(s => s.date === dateStr && !s.deletedAt);
            const isToday = dateStr === formatDateStr(new Date());
            
            return (
                <div 
                  key={i} 
                  onClick={() => handleCalendarClick(date)}
                  className={`bg-white p-1 md:p-2 min-h-[80px] md:min-h-[100px] hover:bg-indigo-50 transition-colors cursor-pointer group flex flex-col gap-1 ${isToday ? 'bg-indigo-50/50' : ''}`}
                >
                  <span className={`text-xs md:text-sm font-bold mb-1 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-700'}`}>{date.getDate()}</span>
                  
                  {/* PC: Titles */}
                  <div className="hidden md:flex flex-col gap-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                      {daysScripts.map(s => (
                          <div key={s.id} className={`text-[10px] px-2 py-1 rounded truncate border ${s.type==='OP' ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                            {s.type} {s.title || '(無題)'}
                          </div>
                      ))}
                  </div>

                  {/* Mobile: Dots */}
                  <div className="md:hidden flex flex-wrap gap-1 content-start">
                      {daysScripts.map(s => (
                          <div key={s.id} className={`w-1.5 h-1.5 rounded-full ${s.type==='OP' ? 'bg-orange-400' : 'bg-indigo-500'}`}></div>
                      ))}
                  </div>

                  <div className="flex-1"></div>
                  {/* PC Only Hover Effect */}
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 text-[10px] text-slate-400 text-center">+ 作成</div>
                </div>
            );
          })}
      </div>
    </div>
  );
};

export default Calendar;