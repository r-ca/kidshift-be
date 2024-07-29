# KidShift バックエンドサーバー
## kidshift-be

### Setup (prod)
#### Docker (docker compose)
```bash
git clone https://ns1b-gitea.nem.one/kidshift/kidshift-be.git
cd kidshift-be
docker compose up -d
```

### 既知の問題 - Known Issues
- ユーザーの権限処理に重大な不備がある
  - 子供/保護者それぞれが他のHomeGroupの同権限ユーザーとして操作できてしまう(homeGroupIdでのチェックが行われていない)
- アイコンのアップロードが未実装(minioは現時点で起動しているだけ)
- CORSの設定が不十分
- NODE_ENVを考慮するような実装がなされていない
- Port, ListenAddressなどがハードコードされている
- Swaggerがインストールされているだけで内容が存在しない
- IDEによってはgitignoreに不足がある
- 依存関係の整理が不十分で、devDependenciesにあるべきものがdependenciesに含まれている
- ディレクトリ構成が不適切なままになっている部分がある

### 関連
- [KidShift Webフロントエンド](https://ns1b-gitea.nem.one/kidshift/kidshift-web)
- [KidShift Androidクライアント](https://ns1b-gitea.nem.one/kidshift/KidShift)
- [KisShift AlexaSkills](https://ns1b-gitea.nem.one/kidshift/kidshift-skills)


