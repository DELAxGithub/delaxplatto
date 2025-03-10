#!/bin/bash

# カラー設定
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}依存関係の更新を開始します...${NC}"

# 現在のディレクトリがプロジェクトルートであることを確認
if [[ ! -f "package.json" ]]; then
    cd delaxplatto
fi

# package.jsonの変更をコミット
echo -e "${GREEN}package.jsonの変更をコミットしています...${NC}"
git add package.json
git commit -m "Update lucide-react version to 0.479.0"

# 変更をプッシュ
echo -e "${GREEN}変更をGitHubにプッシュしています...${NC}"
git push origin main

echo -e "${BLUE}依存関係の更新が完了しました${NC}"
echo -e "${GREEN}Vercelで自動的に再デプロイが開始されます${NC}"
echo "デプロイの進行状況は以下のURLで確認できます："
echo "https://vercel.com/delaxgithubs-projects/delaxplatto/deployments"
