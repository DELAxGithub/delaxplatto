# 番組管理システム (Delaxplatto)

テレビ番組の制作進行を管理するためのウェブアプリケーション

## 機能

- 番組一覧表示と管理
- カンバンボード形式での進捗管理
- カレンダーでの収録・放送日程管理
- Magic Link認証によるセキュアなアクセス

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (認証・データベース)
- shadcn/ui (UIコンポーネント)
- FullCalendar (カレンダー)
- dnd-kit (ドラッグ&ドロップ)

## 環境構築

1. リポジトリのクローン:
```bash
git clone <repository-url>
cd delaxplatto
```

2. 依存パッケージのインストール:
```bash
npm install
```

3. 環境変数の設定:
`.env.local`ファイルを作成し、以下の変数を設定:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. データベースのセットアップ:
Supabaseのダッシュボードで`supabase/schema.sql`を実行

5. 開発サーバーの起動:
```bash
npm run dev
```

## デプロイ

1. Vercelへのデプロイ:
```bash
vercel
```

2. 本番環境変数の設定:
Vercelのダッシュボードで環境変数を設定

## ライセンス

MIT

## 開発者

Hiroshi Kodera
