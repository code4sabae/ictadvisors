import { CSV } from "https://js.sabae.cc/CSV.js";
import HTMLParser from "https://dev.jspm.io/node-html-parser";

const base2 = "https://code4sabae.github.io/ictadvisors";

const base = "https://www.applic.or.jp"
const url = "https://www.applic.or.jp/page-1862/";
const fetchHTML = async (url) => {
  try {
    return await Deno.readTextFile("data/index.html");
  } catch (e) {
    const html = await (await fetch(url)).text();
    try {
      await Deno.mkdir("data");
    } catch (e) {
    }
    await Deno.writeTextFile("data/index.html", html);
    return html;
  }
};

const html = await fetchHTML(url);
const root = HTMLParser.parse(html);

/*
<tbody>
<tr style="height: 71px;">
<td style="width: 131px; height: 71px;"><a href="https://www.applic.or.jp/?p=27194"><img class="alignnone size-full wp-image-13161" src="/wordpress/wp-content/uploads/2021/04/S01.png" alt="" width="30" height="30" /></a>　<a href="https://www.applic.or.jp/?p=27198"><img class="alignnone size-full wp-image-13161" src="/wordpress/wp-content/uploads/2021/04/S05.png" alt="" width="30" height="30" /></a>　<a href="https://www.applic.or.jp/?p=27195"><img class="alignnone size-full wp-image-13161" src="/wordpress/wp-content/uploads/2021/04/S02.png" alt="" width="30" height="30" /></a>　</td>
<td style="width: 69px; height: 71px;"><img class="size-medium wp-image-13123 aligncenter" src="/wordpress/wp-content/uploads/2021/04/AD062.jpg" alt="" width="50" height="60" /></td>
<td style="width: 427px; height: 71px;"><a href="/prom/chiiki_adviser/R3_profile/062_2021adviser.pdf">川島　宏一（かわぐち　ひろゆき）</a><strong><span style="font-size: 8pt; color: #ff0000;">※アドバイザーリーダー</span></strong><br />
内閣官房IT総合戦略室　オープンデータ伝道師<br />
筑波大学システム情報系社会工学域　教授</td>
<td style="width: 129px; height: 71px;"><a href="/prom/chiiki_adviser/R3_profile/062_2021adviser.pdf">プロフィール</a></td>
</tr>

*/
const trs = root.querySelectorAll("tbody tr");
const list = [];
for (const tr of trs) {
  const d = [];
  const tds = tr.querySelectorAll("td");
  for (const td of tds) {
    d.push(td.text);
    const imgs = td.querySelectorAll("img");
    for (const img of imgs) {
      d.push(img.attributes.src.replace(/\n/g, ""));
    }
    const as = td.querySelectorAll("a");
    for (const a of as) {
      d.push(a.attributes.href);
    }
  }
  //console.log(d);
  list.push(d);
}
//await Deno.writeTextFile("ictadviser2021_t0.csv", CSV.encode(list));

const fetchMark = async (list) => {
  for (const l of list) {
    for (let i = 0; i < 3; i++) {
      const url = base + l[i + 1];
      console.log(url);
      const fn = url.substring(url.lastIndexOf("/") + 1);
      try {
        await Deno.readFile("data/" + fn);
      } catch (e) {
        const bin = await (await fetch(url)).arrayBuffer();
        await Deno.writeFile("data/" + fn, new Uint8Array(bin));
      }
    }
  }
};
//await fetchMark(list);
const MARK = [
  "",
  "オープンデータ",
  "ＥＢＰＭ（エビデンスに基づく政策立案）",
  "ＡＩ活用",
  "シェアリングエコノミー",
  "地域情報化計画・官民データ計画",
  "人材の育成・活用",
  "自治体システム／セキュリティ／地域情報プラットフォーム",
  "自治体システムの標準化・共通化",
  "ネットワークインフラ（Ｗｉ-Ｆｉ／ＬＰＷＡ／光ネットワーク）",
  "５Ｇ",
  "マイナンバー",
  "マイキープラットフォーム",
  "防災",
  "教育情報化／情報教育",
  "デジタルアーカイブ／図書館",
  "働き方",
  "子育て",
  "テレワーク",
  "ＲＰＡ導入",
  "医療・介護・健康",
  "農林水産業",
  "地域ビジネス",
  "観光",
  "個人情報保護",
  "スマートシティ",
  "",
  "その他",
];
for (const l of list) {
  for (let i = 0; i < 3; i++) {
    const url = base + l[i + 1];
    //console.log(url);
    const fn = url.substring(url.lastIndexOf("/") + 1);
    const no = parseInt(url.substring(url.lastIndexOf("S") + 1, url.length - 4), 10);
    //console.log(fn, no);
    l[i + 1] = MARK[no];
  }
}
//console.log(list);

await Deno.mkdir("img/2021/", { recursive: true });

const csv = [];
csv.push(["https://schema.org/identifier", "https://schema.org/name", "https://schema.org/alternateName", "https://schema.org/jobTitle", "https://schema.org/jobTitle", "https://schema.org/jobTitle", "https://schema.org/image", "https://schema.org/knowsAbout", "https://schema.org/knowsAbout", "https://schema.org/knowsAbout", "https://schema.org/publishingPrinciples", "https://schema.org/isBasedOnUrl" ])
for (const l of list) {
  const d = [];
  const pdf = base + l[10];
  const sn = pdf.substring(pdf.lastIndexOf("/") + 1, pdf.lastIndexOf("_"));
  const id = parseInt(sn, 10);
  d.push(id);
  const s = l[9].split("\n");
  const names = s[0].replace(/[　）]/g, " ").split("（");
  const name = names[0].trim();
  d.push(name);
  if (names[1].indexOf("※") >= 0) {
    const name2 = names[1];
    d.push(name2.substring(0, name2.lastIndexOf(" ")).trim());
    d.push("地域情報化アドバイザー アドバイザーリーダー");
    
  } else {
    const name2 = names[1];
    d.push(name2.trim());
    d.push("地域情報化アドバイザー");
  }
  for (let i = 0; i < s.length - 1; i++) {
    s[i + 1] = s[i + 1].replace(/　/g, " ");
    s[i + 1] = s[i + 1].replace(/  /g, " ").trim();
    if (s[i + 1] == "利用サービス課長") { // for data bug
      d[4] += " " + s[i + 1];
      d.push("");
    } else {
      d.push(s[i + 1]);
    }
  }
  for (let i = s.length - 1; i < 2; i++) {
    d.push("");
  }
  const imgurl = base + l[8];
  //console.log(imgurl);
  const imgurl2 = "img/2021/AD" + sn + ".jpg";
  //const img = new Uint8Array(await (await fetch(imgurl)).arrayBuffer());
  //await Deno.writeFile(imgurl2, img);
  d.push(base2 + "/" + imgurl2);
  for (let i = 0; i < 3; i++) {
    d.push(l[i + 1]);
  }
  d.push(pdf);
  d.push(url);
  csv.push(d);
}
await Deno.writeTextFile("ictadvisors_2021.csv", CSV.encode(csv));
