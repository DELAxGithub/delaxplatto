#!/bin/bash

# カラー設定
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}クライアントコンポーネントの更新を開始します...${NC}"

# 対象ファイルリスト
FILES=(
  "src/components/auth/LoginForm.tsx"
  "src/contexts/AuthContext.tsx"
  "src/app/providers.tsx"
  "src/components/programs/Calendar.tsx"
  "src/components/programs/CalendarCard.tsx"
  "src/components/programs/KanbanBoard.tsx"
  "src/components/programs/KanbanCard.tsx"
  "src/components/programs/KanbanColumn.tsx"
  "src/components/programs/ProgramForm.tsx"
  "src/components/programs/ProgramTable.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}処理中: $file${NC}"
    # ファイルの先頭に'use client'がない場合のみ追加
    if ! grep -q "^'use client';" "$file" && ! grep -q '^"use client";' "$file"; then
      sed -i '' '1i\
"use client";\
' "$file"
      echo -e "${GREEN}✓ 'use client'を追加しました${NC}"
    else
      echo -e "${BLUE}→ 'use client'は既に存在します${NC}"
    fi
  else
    echo -e "${RED}エラー: $file が見つかりません${NC}"
  fi
done

# 変更をコミット
echo -e "${GREEN}変更をコミットしています...${NC}"
git add .
git commit -m "Add 'use client' directive to client components"
git push origin main

echo -e "${BLUE}クライアントコンポーネントの更新が完了しました${NC}"
echo -e "${GREEN}Vercelで自動的に再デプロイが開始されます${NC}"
