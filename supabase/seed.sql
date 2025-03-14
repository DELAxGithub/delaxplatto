-- Seed data for programs
INSERT INTO programs (
  program_id,
  title,
  subtitle,
  status,
  first_air_date,
  filming_date,
  complete_date,
  re_air_date,
  cast1,
  cast2,
  notes,
  script_url,
  pr_80text,
  pr_200text
) VALUES
(
  '#001',
  '春の料理特集',
  '旬の食材で作る簡単レシピ',
  'キャスティング中',
  '2025-04-01',
  '2025-03-15',
  NULL,
  NULL,
  '山田シェフ',
  '佐藤アナウンサー',
  '撮影場所：スタジオキッチン',
  'https://example.com/scripts/001',
  '旬の春野菜を使った簡単レシピを紹介！',
  'プロのシェフが教える、春野菜を使った簡単でおいしい料理レシピ。新生活を始める方必見の時短テクニックも紹介します。'
),
(
  '#002',
  '伝統工芸の世界',
  '受け継がれる職人の技',
  '日程調整中',
  '2025-04-15',
  NULL,
  NULL,
  NULL,
  '田中職人',
  NULL,
  '撮影場所：京都工房',
  'https://example.com/scripts/002',
  '日本の伝統工芸を守り続ける職人の技',
  '京都で400年続く伝統工芸の世界。現代に受け継がれる職人の技と、その魅力に迫ります。'
),
(
  '#003',
  '都市開発最前線',
  '変わりゆく街の姿',
  '収録準備中',
  '2025-05-01',
  '2025-04-20',
  NULL,
  NULL,
  '鈴木記者',
  '高橋アナウンサー',
  '撮影場所：新都市開発エリア',
  'https://example.com/scripts/003',
  '都市開発の最新プロジェクトを追う',
  '2025年、大規模な都市開発が進む街の最前線をレポート。未来の街づくりのビジョンと課題に迫ります。'
);
