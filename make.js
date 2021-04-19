import { CSV } from "https://code4sabae.github.io/js/CSV.js";

// make htmls

const csv = CSV.decode(await Deno.readTextFile("ictadvisors_2021.csv"));
//const json = CSV.toJSON(csv);
//console.log(json[0]);
//Deno.exit(0);

// make index

const toHTML = (d) => {
  return `<div id="data${d["ID"]}"><a class="data" href="${d.pdf}"><img style="float:left" src="${d.img}"><h2>${d["氏名"]}（${d["ふりがな"]}）</h2>
  <div>${d["所属・役職"]}
${d["担当"]}</div>
  </a></div>`;
};

const divs2 = [];
for (let i = 1; i < csv.length; i++) {
  const l = csv[i];
  const d = {
    ID: l[0],
    氏名: l[1],
    ふりがな: l[2],
    "所属・役職": l[4] + "\n" + l[5],
    pdf: l[10],
    img: l[6],
    "担当": l[7] + " / " + l[8] + " / " + l[9],
  };
  divs2.push(toHTML(d));
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
<title>総務省 地域情報化アドバイザー一覧 2021</title>
<script type="module" src="filter_2021.js"></script>
<link rel="stylesheet" type="text/css" href="index.css">
<body>

<h1>総務省 地域情報化アドバイザー一覧 2021</h1>
<input id="inputfilter" type=text placeholder="キーワードを入力して絞り込み"><br>
<div id="filtered"></diV>

<div id="main">${divs2.join("\n")}</div>
<hr>
<div class=credit>
  <div>App: <a href=https://fukuno.jig.jp/>福野泰介の一日一創</a> (<a href=https://github.com/code4sabae/ictadvisors/>src on GitHub</a>)</div>
  <div>Data: <a href=https://www.applic.or.jp/page-1862/>地域情報化アドバイザー一覧</a> → <a href="ictadvisors_2021.csv">UTF-8 CSV</a></div>
  <div>Archive: <a href=index_2020.html>地域情報化アドバイザー一覧2020</a></div>
</div>
</body>
</html>`;

await Deno.writeTextFile("index.html", indexhtml);
