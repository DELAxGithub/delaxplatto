#!/bin/bash

# カラー設定
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}デプロイ設定の更新を開始します...${NC}"

# 現在のディレクトリがプロジェクトルートであることを確認
if [[ ! -f "package.json" ]]; then
    cd delaxplatto
fi

# vercel.jsonの変更をコミット
echo -e "${GREEN}vercel.jsonの変更をコミットしています...${NC}"
git add vercel.json
git commit -m "Update Vercel configuration with new project ID"

# 変更をプッシュ
echo -e "${GREEN}変更をGitHubにプッシュしています...${NC}"
git push origin main

# Vercel CLIでの再デプロイ
echo -e "${GREEN}Vercelプロジェクトを設定しています...${NC}"
vercel link --project prj_2mPZJ9tl29pYmFUyyfsBFKHnjR9R
vercel deploy --prod

echo -e "${BLUE}デプロイ設定の更新が完了しました${NC}"
echo -e "${GREEN}デプロイの進行状況は以下のURLで確認できます：${NC}"
echo "https://vercel.com/dashboard/1DTqzJzNifuwGRUGzOs0EuiN/delaxplatto/deployments"
