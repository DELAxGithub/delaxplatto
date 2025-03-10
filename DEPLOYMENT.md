# Vercelデプロイメントガイド

## 準備

1. Vercelアカウントの作成
   - [Vercel](https://vercel.com)にアクセス
   - GitHubアカウントでサインアップ

2. Supabaseプロジェクトの準備
   ```bash
   # データベースのマイグレーションを実行
   supabase db push
   
   # シードデータの投入
   psql -h db.xxxxxxxxxxxx.supabase.co -p 5432 -d postgres -U postgres -f supabase/seed.sql
   ```

## デプロイ手順

1. GitHubリポジトリの作成
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/delaxplatto.git
   git push -u origin main
   ```

2. Vercelとの連携
   - Vercelダッシュボードで「New Project」を選択
   - GitHubリポジトリを選択
   - 「Import」をクリック

3. 環境変数の設定
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-supabase-anon-key
   NEXT_PUBLIC_SITE_URL=https://your-production-domain.vercel.app
   NEXT_PUBLIC_AUTH_CALLBACK_URL=https://your-production-domain.vercel.app/auth/callback
   ```

4. デプロイ設定
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. デプロイの実行
   - 「Deploy」ボタンをクリック
   - ビルドログを確認

## デプロイ後の確認事項

1. 基本機能の動作確認
   - [ ] ログイン/ログアウト
   - [ ] 番組一覧表示
   - [ ] 番組作成/編集/削除
   - [ ] カンバンボード
   - [ ] カレンダービュー

2. セキュリティ確認
   - [ ] 認証なしでのアクセス制限
   - [ ] 環境変数の設定
   - [ ] HTTPSの有効化

3. パフォーマンス確認
   - [ ] ページ読み込み速度
   - [ ] API応答時間
   - [ ] 画像の最適化

## トラブルシューティング

1. ビルドエラー
   ```bash
   # キャッシュのクリア
   rm -rf .next
   rm -rf node_modules
   npm install
   ```

2. 認証エラー
   - Supabase URLとAnon Keyの確認
   - コールバックURLの設定確認

3. データベース接続エラー
   - Supabaseの接続情報確認
   - RLSポリシーの確認

## 本番環境の監視

1. Vercel Analytics設定
   - ダッシュボードで「Analytics」を有効化
   - パフォーマンスメトリクスの確認

2. エラー監視
   - Vercel Error Loggingの確認
   - Supabaseログの確認

## 継続的デプロイメント

- mainブランチへのプッシュで自動デプロイ
- プレビューデプロイメントの活用
- デプロイメントアラートの設定

## ロールバック手順

1. Vercelダッシュボードで過去のデプロイを選択
2. 「Redeploy」を実行
3. ドメインの切り替えを確認

## 参考リンク

- [Vercelドキュメント](https://vercel.com/docs)
- [Next.jsデプロイメントガイド](https://nextjs.org/docs/deployment)
- [Supabase環境設定](https://supabase.com/docs/guides/hosting/overview)
