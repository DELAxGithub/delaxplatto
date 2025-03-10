#!/bin/bash

# カラー設定
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Vercel設定の更新を開始します...${NC}"

# 現在のディレクトリがプロジェクトルートであることを確認
if [[ ! -f "package.json" ]]; then
    cd delaxplatto
fi

# vercel.jsonの変更をコミット
echo -e "${GREEN}vercel.jsonの変更をコミットしています...${NC}"
git add vercel.json
git commit -m "Simplify vercel.json configuration"

# 変更をプッシュ
echo -e "${GREEN}変更をGitHubにプッシュしています...${NC}"
git push origin main

echo -e "${BLUE}設定の更新が完了しました${NC}"
echo -e "${GREEN}以下の手順で確認してください：${NC}"
echo "1. GitHubリポジトリで変更を確認: https://github.com/DELAXGitHub/delaxplatto"
echo "2. Vercelダッシュボードで再デプロイを確認: https://vercel.com/dashboard"

# デプロイ状況の確認
echo -e "${GREEN}デプロイ後、以下のURLでアクセス可能になります：${NC}"
echo "https://delaxplatto.com"
