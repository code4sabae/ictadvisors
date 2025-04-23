import { CSV } from "https://code4sabae.github.io/js/CSV.js";
import { addLinkTag } from "https://js.sabae.cc/addLinkTag.js";

const year = 2025;
//const names = "所属・役職,活動拠点,略歴,地域情報化の専門分野・技術,専門分野,自治体向けメッセージ,関連ＵＲＬ,地域情報化に関する実績（これまでの経験業務・研究活動）,地域情報化に関する実績（これまでに関与した地域情報化に関するプロジェクト）".split(",");
//const names = "ふりがな,氏名,所属・役職,活動拠点,略歴,地域情報化の専門分野・技術,専門分野,自治体向けメッセージ,関連サイト,地域情報化に関する実績,これまでに関与した地域情報化に関するプロジェクト".split(","); // 2024
//const names =   "ふりがな,氏名,所属・役職,活動拠点,略歴,地域情報化の専門分野・技術,専門分野,自治体向けメッセージ,関連サイト,地域情報化に関する実績・これまでの経験業務・研究活動,これまでに関与した地域情報化に関するプロジェクト".split(","); // 2025
const names = "ID,ふりがな,氏名,所属・役職,主な対応分野,顔写真,PDF".split(","); // 2025

/*
try {
  const url = "https://www.r-ict-advisor.jp/prom/chiiki_adviser/R5/23_ad_opendata_UTF-8&BOM.csv";
  //const url = "https://www.r-ict-advisor.jp/prom/chiiki_adviser/R4/22_ad_opendata_UTF-8&BOM.csv";
  const csv = await (await fetch(url)).text();
  await Deno.writeTextFile(`ictadvisors_${year}.csv`, csv);
} catch (e) {
  console.log(e);
}
Deno.exit(0);
*/
// make htmls

const data0 = await CSV.fetchJSON(`ictadvisors_${year}.csv`);
const data = data0.filter(i => i["ふりがな"]);
//console.log(data[0], data.length);
//Deno.exit(0);

/*
// add ID
for (let i = 0; i < data.length; i++) {
  data[i].ID = i + 1;
}
*/

// make index
const toHTML = (s) => {
  s = s.replace(/\n/g, "<br>");
  s = addLinkTag(s);
  return s;
};

// ID,ふりがな,氏名,所属・役職,活動拠点,略歴,地域情報化の専門分野・技術,専門分野,自治体向けメッセージ,関連ＵＲＬ,地域情報化に関する実績（これまでの経験業務・研究活動）,地域情報化に関する実績（これまでに関与した地域情報化に関するプロジェクト）
const makeHTML = (d) => {
  // <img style="float:left" src="${d.img}">
  //<div>${d["所属・役職"]}${d["担当"]}</div>
  const html1 = `
    <div id="data${d["ID"]}" class="advisor">
      <img src="${d["顔写真"]}">
      <h2>${d["氏名"]}（${d["ふりがな"]}）</h2>
      <span>${d["所属・役職"]}</span>
    `;
  const html2 = [];
  for (const name of names) {
    html2.push(`<div><div class=name>${name}</div>${toHTML(d[name])}</div>`);
  }
  return html1 + "<div class=content>" + html2.join("") + "</div></div>";
};

const divs2 = [];
for (const l of data) {
  divs2.push(makeHTML(l));
}

const indexhtml =
`<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
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
<meta property="og:image"  content="https://code4sabae.github.io/ictadvisors/ictadvisors_${year}.jpg">
<meta name="twitter:image" content="https://code4sabae.github.io/ictadvisors/ictadvisors_${year}.jpg">
<title>総務省 地域情報化アドバイザー検索 ${year}</title>
<script type="module" src="filter_${year}.js"></script>
<link rel="stylesheet" type="text/css" href="index_2025.css">
<body>

<h1>総務省 地域情報化アドバイザー検索 ${year}</h1>
<div id=inputc>
<input id="inputfilter" type=text placeholder="キーワードを入力して絞り込み"><br>
</div>
<div id="filtered"></diV>

<div id="main">${divs2.join("\n")}</div>
<hr>
<div class=credit>
  <div>App: <a href=https://fukuno.jig.jp/3920>福野泰介の一日一創</a> (<a href=https://github.com/code4sabae/ictadvisors/>src on GitHub</a>)</div>
  <div>Data: <a href=https://www.r-ict-advisor.jp/member/opendata/>地域情報化アドバイザーオープンデータ</a> by <a href=https://www.r-ict-advisor.jp>APPLIC（https://www.r-ict-advisor.jp）</a></div>
  <div>Archive: 地域情報化アドバイザー一覧
    <a href=index_2024.html>2024</a> / 
    <a href=index_2023.html>2023</a> / 
    <a href=index_2022.html>2022</a> / 
    <a href=index_2021.html>2021</a> / 
    <a href=index_2020.html>2020</a>
  </div>
</div>
</body>
</html>`;

await Deno.writeTextFile("index.html", indexhtml);
await Deno.writeTextFile("index_" + year + ".html", indexhtml);
