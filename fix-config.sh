#!/bin/bash

# カラー設定
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Next.js設定の修正を開始します...${NC}"

# 現在のディレクトリがプロジェクトルートであることを確認
if [[ ! -f "package.json" ]]; then
    cd delaxplatto
fi

# next.config.jsの変更をコミット
echo -e "${GREEN}next.config.jsの変更をコミットしています...${NC}"
git add next.config.js
git commit -m "Fix next.config.js configuration"

# 変更をプッシュ
echo -e "${GREEN}変更をGitHubにプッシュしています...${NC}"
git push origin main

echo -e "${BLUE}Next.js設定の修正が完了しました${NC}"
echo -e "${GREEN}Vercelで自動的に再デプロイが開始されます${NC}"
echo "デプロイの進行状況は以下のURLで確認できます："
echo "https://vercel.com/delaxgithubs-projects/delaxplatto/deployments"
