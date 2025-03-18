# 総務省地域情報化アドバイザー一覧

- http://code4sabae.github.io/ictadvisors/
![ictadvisors](https://code4sabae.github.io/ictadvisors/ictadvisors_2023.jpg)  

## 履歴

- http://code4sabae.github.io/ictadvisors/index_2020.html
- http://code4sabae.github.io/ictadvisors/index_2021.html
- http://code4sabae.github.io/ictadvisors/index_2022.html
- http://code4sabae.github.io/ictadvisors/index_2023.html
- http://code4sabae.github.io/ictadvisors/index_2024.html

## 追加方法

1. [地域情報化アドバイザーオープンデータ](https://www.r-ict-advisor.jp/member/opendata/) を ictadvisors.csv として保存
2. 前年度 make_????.js を元に、今年度 make_????.j を作成
3. deno run -A make_????.js を実行し index.html ができるので、動作確認する
4. index_????.html / ictadvisors_????.csv として履歴を作る

## 出典

- [地域情報化アドバイザーオープンデータ](https://www.r-ict-advisor.jp/member/opendata/) by [APPLIC](https://www.r-ict-advisor.jp)
