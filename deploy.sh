#!/bin/bash

# カラー設定
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}デプロイを開始します...${NC}"

# カレントディレクトリの確認
if [[ ! -f "package.json" ]]; then
    echo -e "${RED}エラー: プロジェクトルートディレクトリにいることを確認してください${NC}"
    exit 1
fi

# Gitの初期化と設定
echo -e "${GREEN}Gitリポジトリを初期化しています...${NC}"
if [[ ! -d ".git" ]]; then
    git init
    if [ $? -ne 0 ]; then
        echo -e "${RED}Gitの初期化に失敗しました${NC}"
        exit 1
    fi
fi

# リモートリポジトリの設定
echo -e "${GREEN}リモートリポジトリを設定しています...${NC}"
git remote remove origin 2>/dev/null
git remote add origin https://github.com/DELAXGitHub/delaxplatto.git

# ブランチ名の設定とコミット
echo -e "${GREEN}変更をコミットしています...${NC}"
git add .
git commit -m "Initial deployment commit"
git branch -M main

# GitHubにプッシュ
echo -e "${GREEN}GitHubにプッシュしています...${NC}"
git push -u origin main --force

# プッシュ完了後の案内
echo -e "${BLUE}GitHubへのプッシュが完了しました${NC}"
echo -e "${GREEN}次のステップ:${NC}"
echo "1. Vercelダッシュボード(https://vercel.com/delaxgithubs-projects/delaxplatto)にアクセス"
echo "2. 「Deployments」タブを開く"
echo "3. 「Redeploy」をクリック"
echo "4. デプロイ完了後、以下のURLでアクセス可能になります："
echo "   - https://delaxplatto.com"
echo "   - https://www.delaxplatto.com"

echo -e "${BLUE}デプロイ手順が完了しました。Vercelダッシュボードで再デプロイを実行してください。${NC}"
