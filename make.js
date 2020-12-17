import { CSV } from "https://code4sabae.github.io/js/CSV.js";

// make htmls

const data = `自治体向けメッセージ
地域情報化の専門分野・技術
活動拠点
これまでの経験業務・研究活動
これまでに関与した地域情報化に関するプロジェクト
所属・役職
略歴
関連URL`.split("\n");

const path = "html";
await Deno.mkdir(path, { recursive: true });

const replaceLink = (s) => {
  return s.replace(/(http(s)?:\/\/[a-zA-Z0-9-.!'()*;/?:@&=+$,%#]+)/gi, "<a href='$1' target='_blank'>$1</a>");
};

const csv = CSV.decode(await Deno.readTextFile("ictadvisors_2020.csv"));
const json = CSV.toJSON(csv);

for (const d of json) {
  const divs = [];
  for (let i = 0; i < data.length; i++) {
    const val = d[data[i]];
    if (val) {
      divs.push(`<div class=data id=data${i}><h2>${data[i]}</h2><div>${replaceLink(val)}</div></div>`)
    }
  }

  const html = `<!DOCTYPE html><html><head>
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
<meta property="og:image"  content="https://code4sabae.github.io/ictadvisors/ictadvisors.png">
<meta name="twitter:image" content="https://code4sabae.github.io/ictadvisors/ictadvisors.png">
<title>${d["氏名"]} - 地域情報アドバイザー2020</title>
<link rel="stylesheet" type="text/css" href="../ictadvisor.css">
</head>
<body>
<h1>地域情報アドバイザー2020<br>${d["氏名"]}（${d["ふりがな"]}）</h1>
${divs.join("\n")}
<a href=../index.html>地域情報アドバイザー2020 一覧に戻る</a>
<hr>
<div class=credit>
<div>App: <a href=https://fukuno.jig.jp/>福野泰介の一日一創</a> (<a href=https://github.com/code4sabae/ictadvisors/>src on GitHub</a>)</div>
<div>Data: <a href=https://www.applic.or.jp/page-1862/>地域情報化アドバイザー一覧</a> → <a href=https://www.data.go.jp/data/dataset/soumu_20201106_0015>DATA GO JP</a> → <a href="../ictadvisors_2020.csv">UTF-8 CSV</a></div>
</div>
`;
  await Deno.writeTextFile(path + "/" + d["ID"] + ".html", html);
}

// make index

const toHTML = (d) => {
  return `<div id="data${d["ID"]}"><a class="data" href="html/${d["ID"]}.html"><h2>${d["氏名"]}（${d["ふりがな"]}）</h2>
  <div>${d["所属・役職"]}</div></a></div>`;
};

const divs2 = [];
for (const d of json) {
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
<meta property="og:image"  content="https://code4sabae.github.io/ictadvisors/ictadvisors.png">
<meta name="twitter:image" content="https://code4sabae.github.io/ictadvisors/ictadvisors.png">
<title>総務省 地域情報化アドバイザー一覧 2020</title>
<script type="module" src="filter.js"></script>
<link rel="stylesheet" type="text/css" href="index.css">
<body>

<h1>総務省 地域情報化アドバイザー一覧 2020</h1>
<input id="inputfilter" type=text placeholder="キーワードを入力して絞り込み"><br>
<div id="filtered"></diV>

<div id="main">${divs2.join("\n")}</div>
<hr>
<div class=credit>
  <div>App: <a href=https://fukuno.jig.jp/>福野泰介の一日一創</a> (<a href=https://github.com/code4sabae/ictadvisors/>src on GitHub</a>)</div>
  <div>Data: <a href=https://www.applic.or.jp/page-1862/>地域情報化アドバイザー一覧</a> → <a href=https://www.data.go.jp/data/dataset/soumu_20201106_0015>DATA GO JP</a> → <a href="ictadvisors_2020.csv">UTF-8 CSV</a></div>
</div>
</body>
</html>`;

await Deno.writeTextFile("index.html", indexhtml);
