edited: tara, 2023-04-12 に作成されたものです。適宜修正や削除（この行を含めて）をお願いします。

# jizaipad-viewer-vollmont

Vollmont向け、IoTコーンユニット開発用リポジトリです。

*諸注意*
- M5Stick-C Plus用のソースファイル `.ino` の名前は、親のディレクトリの名前と同一である必要があります。ディレクトリの名前を変更した場合、直下の `.ino` ファイルの名前も必ず変更してください。

## React 導入

for Mac

- nodebrew, npm の Install
  - c.f. https://fukatsu.tech/install-nodejs
- `npm install`

### デバッグなど

`npm start`

### ビルド

- `npm run build`
  - `build`ディレクトリにhtmlファイル群が生成される

## CSSフレームワークについて

Bootstrapを使用

## 構成

- `src/index.tsx`
  - 基本はいじらないところ
- `src/App.tsx`
  - メインの部分、`components`で作成されたものを束ねたり、今回はいらなかったけどコンポーネント間でのデータのやりとりなどを行う
- `components`
  - `Video`
    - 16:9 の比率で画面に表示するスペース
    - カメラの映像が導入されるまではmockとして画像を挿入
  - `SwitchMenu`
    - ConeUnit, LEDの2種類の変更ボタンをまとめて表示するコンポーネント
      - `SwitchButtonConeUnit`
      - `SwitchButtonLED`
- `services`
  - APIに関連した動作を行うところ
  - 以下の２つの中身は現状ほとんど同じ中身で、APIの設計が変わった際に対応しやすいようにしているため。DRYなので設計が固まり次第まとめてください。
    - `ApiConeUnnit`
    - `ApiLed`

## Build && Deploy

`nnpm run build` して `build` ディレクトリを更新

### Deploy先

- https://01-technologies.github.io/jizaipad-viewer-vollmont/

## 気になっていること

- もし同時に操作している人がいた時に上手く動作しない可能性がある（未検証）
- デプロイする際に毎回Git管理で`build`を更新しているのが気になる















# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
