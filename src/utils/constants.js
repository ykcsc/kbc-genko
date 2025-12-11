// アプリ全体で使う定数（設定値）をここにまとめます

export const APP_ICON_URL = "https://ykcsclym.xsrv.jp/kbc.png";
export const BGM_URL = "https://ykcsclym.xsrv.jp/hiruhou-op.mp3"; 
export const ADMIN_EMAIL = "admin@kbc.bc"; 

// 原稿の種別定義
export const SCRIPT_TYPES = {
  MAIN: { label: 'MAIN', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
  OP: { label: 'OP', color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' }
};

// デフォルトタグ
export const DEFAULT_TAGS = ['校内の話題', '校外の話題', '季節', '行事', '緊急', 'その他'];

// A4横サイズ定義 (px換算)
export const A4_WIDTH_PX = 1123; 
export const A4_HEIGHT_PX = 794; 

// パッチノート
export const PATCH_NOTES = [
  { version: "1.2.0e", date: "2025/12/11", content: ["スマホ版ファイルメニューの表示位置ズレを修正"] },
  { version: "1.2.0d", date: "2025/12/11", content: ["緊急修正: カレンダー表示時の関数未定義エラーを修正"] },
  // ... (過去分は長くなるので省略、必要なら追記)
  { version: "1.0.0", date: "2025/12/08", content: ["初期リリース"] },
];