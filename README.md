# Tsubuyaki

Twitter風のシンプルなSNSアプリです。React + TypeScriptのフロントエンドと、Flaskによるバックエンドで構成されています。

## プロジェクト構成

- **frontend/** – Vite + React + TypeScript で実装されたフロントエンド
- **backend/** – Flask で実装されたAPIサーバー（SQLite + SQLAlchemy 利用予定。現在は簡易的にメモリ上に保存）

## セットアップ

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Build frontend for production
```bash
cd frontend
npm install
npm run build
```

## 起動方法
- 開発時はフロントエンド: `npm run dev` で `http://localhost:5173` に起動します。
- バックエンド: `python app.py` を実行すると `http://localhost:5000` で API とビルド済みフロントエンドが提供されます。

## API 仕様
- `GET /posts`
  - すべての投稿を取得します。
- `POST /posts`
  - ボディ: `{ "content": "投稿内容" }`
  - 新しい投稿を追加し、作成された投稿を返します。

## 補足
- フロントエンドからのAPIアクセス先は `http://localhost:5000` です。
- ポート番号は必要に応じて変更してください。
- 現在データはメモリ上に保存され、アプリを再起動すると失われます。今後SQLite + SQLAlchemy に置き換える予定です。
