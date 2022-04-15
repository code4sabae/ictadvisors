import { CSV } from "https://code4sabae.github.io/js/CSV.js";

/*
try {
  const url = "https://www.r-ict-advisor.jp/prom/chiiki_adviser/R4/22_ad_opendata_UTF-8&BOM.csv";
  const csv = await (await fetch(url)).text();
  await Deno.writeTextFile("ictadvisors_2022.csv", csv);
} catch (e) {
  console.log(e);
}
Deno.exit(0);
*/

// make htmls

const data = CSV.toJSON(CSV.decode(await Deno.readTextFile("ictadvisors_2022.csv")));
//const json = CSV.toJSON(csv);
//console.log(json[0]);
//Deno.exit(0);

// make index
const toHTML = (s) => {
  s = s.replace(/\n/g, "<br>");
  return s;
};

// ID,ふりがな,氏名,所属・役職,活動拠点,略歴,地域情報化の専門分野・技術,専門分野,自治体向けメッセージ,関連ＵＲＬ,地域情報化に関する実績（これまでの経験業務・研究活動）,地域情報化に関する実績（これまでに関与した地域情報化に関するプロジェクト）
const makeHTML = (d) => {
  // <img style="float:left" src="${d.img}">
  //<div>${d["所属・役職"]}${d["担当"]}</div>
  const html1 = `<div id="data${d["ID"]}" class="advisor"><h2>${d["氏名"]}（${d["ふりがな"]}）</h2>`;
  const names = "所属・役職,活動拠点,略歴,地域情報化の専門分野・技術,専門分野,自治体向けメッセージ,関連ＵＲＬ,地域情報化に関する実績（これまでの経験業務・研究活動）,地域情報化に関する実績（これまでに関与した地域情報化に関するプロジェクト）".split(",");
  const html2 = [];
  for (const name of names) {
    html2.push(`<div><div class=name>${name}</div>${toHTML(d[name])}</div>`);
  }
  return html1 + "<div class=content>" + html2.join("<br>") + "</div></div>";
};

const divs2 = [];
for (const l of data) {
  divs2.push(makeHTML(l));
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
<meta property="og:image"  content="https://code4sabae.github.io/ictadvisors/ictadvisors_2022.jpg">
<meta name="twitter:image" content="https://code4sabae.github.io/ictadvisors/ictadvisors_2022.jpg">
<title>総務省 地域情報化アドバイザー検索 2022</title>
<script type="module" src="filter_2022.js"></script>
<link rel="stylesheet" type="text/css" href="index_2022.css">
<body>

<h1>総務省 地域情報化アドバイザー検索 2022</h1>
<div id=inputc>
<input id="inputfilter" type=text placeholder="キーワードを入力して絞り込み"><br>
</div>
<div id="filtered"></diV>

<div id="main">${divs2.join("\n")}</div>
<hr>
<div class=credit>
  <div>App: <a href=https://fukuno.jig.jp/>福野泰介の一日一創</a> (<a href=https://github.com/code4sabae/ictadvisors/>src on GitHub</a>)</div>
  <div>Data: <a href=https://www.r-ict-advisor.jp/member/opendata/>地域情報化アドバイザーオープンデータ</a> by <a href=https://www.r-ict-advisor.jp>APPLIC（https://www.r-ict-advisor.jp）</a></div>
  <div>Archive: <a href=index_2021.html>地域情報化アドバイザー一覧2021</a>, <a href=index_2020.html>地域情報化アドバイザー一覧2020</a></div>
</div>
</body>
</html>`;

await Deno.writeTextFile("index.html", indexhtml);
