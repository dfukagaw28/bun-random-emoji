# bun で npm パッケージを作成する練習

## init

まず bun プロジェクトを初期化する（ひな形を作る）。

```bash
bun init random-emoji
```

メインプログラム `index.ts` を書き換える。

```ts
export function getEmoji() {
  const list = ["😎", "🚀", "🦄", "🔥", "🤖"];
  return list[Math.floor(Math.random() * list.length)];
}
```

`package.json` も書き換える。

```json
{
  "name": "@dfukagaw28/random-emoji",
  "version": "0.0.1",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "bun build index.ts --outdir dist --format esm && bun x tsc --declaration --emitDeclarationOnly --outDir dist"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "typescript": "^5"
  }
}
```

## build

```bash
bun run build
```

## publish

npm アカウントを持っていなければ作る。

```bash
npm login
```

ブラウザ認証が始まるが，WSL2では失敗しがち。その場合は，以下のように legacy を指定するとよい。

```bash
npm login --auth-type=legacy
```

アカウント名，パスワード，2FA（OTP等）が必要。

以下のように SECURITY NOTICE が表示された。
Classic token はあと数日で廃止される。

```
npm notice SECURITY NOTICE: Classic tokens expire December 9. Granular tokens now limited to 90 days with 2FA enforced by default. Update your CI/CD workflows to avoid disruption. Learn more: https://gh.io/npm-token-changes
Logged in on https://registry.npmjs.org/.
```

GitHub Actions の自動公開などを考えていてトークンを作成するなら新しい方式（Granular tokens）を導入した方が良い。

今回は手動 publish のつもりなのでいったん無視して進む。

```bash
npm publish --access=public --auth-type=legacy
```

再び 2FA が必要。

## 動作確認

```bash
mkdir test-random-emoji

cd test-random-emoji

bun init

bun add @dfukagaw28/random-emoji

bun -e "import { getEmoji } from '@dfukagaw28/random-emoji'; console.log(getEm
oji());"
😎

bun -e "import { getEmoji } from '@dfukagaw28/random-emoji'; console.log(getEmoji());"
🦄
```

## その他

@dfukagaw28/random-emoji
https://www.npmjs.com/package/@dfukagaw28/random-emoji

ホームページの情報がない。
そもそもまだ GitHub にリポジトリを置いていなかった。

GitHub でリポジトリを作って push する。
そのうえで `package.json` にいくつか項目を追加する。

必要に応じて LICENSE も追加しておく。GitHub の雛形を利用するのが手軽（Add file でファイル名を LICENSE とすればテンプレートを選択することができる）。
