import { CSV } from "https://code4sabae.github.io/js/CSV.js";

// make htmls

const csv = CSV.toJSON(await CSV.fetch("ictadvisors_2021_2.csv"));
//const json = CSV.toJSON(csv);
//console.log(json[0]);
//Deno.exit(0);

// make index

const toHTML = (d, l) => {
  const html = [];
  html.push(`<div class=advisor id="data${d["ID"]}">`);
  html.push(`<img style="float:left" src="${d.img}"><h2>${d["氏名"]}（${d["ふりがな"]}）</h2>`);
  if (d.URL) {
    html.push(`<div>URL: <a href=${d.URL}>${d.URL}</a></div>`);
  }
  html.push(`<div>所属・役職: ${d["所属・役職"]}</div><div>担当: ${d["担当"]}</div>`)
  const names = [
    "活動拠点",
    "略歴",
    "地域情報化の専門分野・技術",
    "自治体向けメッセージ",
    "関連ＵＲＬ",
    "これまでの経験業務・研究活動",
    "これまでに関与した地域情報化に関するプロジェクト"
  ];
  html.push(`<div class=detail>`)
  for (const name of names) {
    const name2 = name.replace("これまでに関与した", "");
    html.push(`<div class=name>${name2}</div><div class=body>${l[name]}</div>`);
  }
  html.push(`</div>`);
  html.push(`</div>`);
  return html.join("\n");
};

/*
  "https://schema.org/identifier",
  "https://schema.org/name",
  "https://schema.org/alternateName",
  "https://schema.org/jobTitle",
  "https://schema.org/image",
  "https://schema.org/publishingPrinciples",
  "https://schema.org/isBasedOnUrl",
  "https://schema.org/knowsAbout",
  "https://schema.org/url",
  "活動拠点",
  "略歴",
  "地域情報化の専門分野・技術",
  "自治体向けメッセージ",
  "関連ＵＲＬ",
  "これまでの経験業務・研究活動",
  "これまでに関与した地域情報化に関するプロジェクト"
*/

const divs2 = [];
for (const l of csv) {
  const d = {
    ID: l["https://schema.org/identifier"],
    氏名: l["https://schema.org/name"],
    ふりがな: l["https://schema.org/alternateName"],
    "所属・役職": l["https://schema.org/jobTitle"],
    //pdf: l[10],
    img: l["https://schema.org/image"],
    "担当": l["https://schema.org/knowsAbout"].split(",").join(" / "),
    URL: l["https://schema.org/url"],
  };
  divs2.push(toHTML(d, l));
}

const indexhtml =
`<!DOCTYPE html><html><head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3SZZNGC94H"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3SZZNGC94H');
</script>
<meta charset="utf-8">
<meta name="twitter:card" content="summary_large_image"/>
<meta property="og:image"  content="https://code4sabae.github.io/ictadvisors/ictadvisors_2021.jpg">
<meta name="twitter:image" content="https://code4sabae.github.io/ictadvisors/ictadvisors_2021.jpg">
<title>地域情報化アドバイザー一覧＆検索 2021</title>
<script type="module" src="filter_2021_2.js"></script>
<link rel="stylesheet" type="text/css" href="index.css">
<body>

<h1>地域情報化アドバイザー一覧＆検索 2021</h1>
<input id="inputfilter" type=text placeholder="キーワードを入力して絞り込み"><br>
<div id="filtered"></diV>

<div id="main">${divs2.join("\n")}</div>
<hr>
<div class=credit>
  <div>App: <a href=https://fukuno.jig.jp/3422>福野泰介の一日一創</a> (<a href=https://github.com/code4sabae/ictadvisors/>src on GitHub</a>)</div>
  <div>Data: <a href=https://www.applic.or.jp/page-1862/>地域情報化アドバイザー オープンデータ</a> → <a href="ictadvisors_2021_2.csv">UTF-8 CSV</a></div>
  <div>Archive: <a href=index_2020.html>地域情報化アドバイザー一覧2020</a></div>
</div>
</body>
</html>`;

await Deno.writeTextFile("index.html", indexhtml);
