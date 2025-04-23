import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, table2json, table2csv, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

const NODETYPE_TEXT = 3;

const url = "https://www.r-ict-advisor.jp/member/serch/";

const makeURL = (s) => new URL(s, url).href;

/*
// spanが閉じられて居ないのでHTMLを修正
const html = `<tbody id="adv_list">
<tr data-sicon="S20 S23 S30 S31 ">
<td><img decoding="async" title="テレワーク" src="/wordpress/wp-content/uploads/2025/04/s20.png" width="30" /><img decoding="async" title="働き方" src="/wordpress/wp-content/uploads/2025/04/s18.png" width="30" /><img decoding="async" title="地域ビジネス" src="/wordpress/wp-content/uploads/2025/04/s23.png" width="30" /></td>
<td><img decoding="async" src="/wordpress/wp-content/uploads/2025/04/R7001.jpg" alt="顔写真" /></td>
<td><a title="：プロフィール" href="/prom/chiiki_adviser/R7_profile/001_2025_ad.pdf" target="_blank" rel="noopener noreferrer"><span class="adname">会田　和子（あいだ　かずこ）</span></a><br />一般社団法人日本テレワーク協会　副会長<br />特定非営利活動法人地域産業おこしの会理事長</td>
<td></td>
</tr>
</tbody>
`;
*/
const fixHTML = (html) => {
  return html.replace(/<span\b([^>]*)>([^<]*(?:(?!<\/span>|<span\b)[\s\S])*?)<\/a>/g, '<span$1>$2</span></a>');
};

const html0 = await fetchOrLoad(url);
const html = fixHTML(html0);
const dom = HTMLParser.parse(html);

/*
<tbody id="adv_list">
<tr data-sicon="S20 S23 S30 S31 ">
<td><img decoding="async" title="テレワーク" src="/wordpress/wp-content/uploads/2025/04/s20.png" width="30" /><img decoding="async" title="働き方" src="/wordpress/wp-content/uploads/2025/04/s18.png" width="30" /><img decoding="async" title="地域ビジネス" src="/wordpress/wp-content/uploads/2025/04/s23.png" width="30" /></td>
<td><img decoding="async" src="/wordpress/wp-content/uploads/2025/04/R7001.jpg" alt="顔写真" /></td>
<td><a title="：プロフィール" href="/prom/chiiki_adviser/R7_profile/001_2025_ad.pdf" target="_blank" rel="noopener noreferrer"><span class="adname">会田　和子（あいだ　かずこ）</a><br />一般社団法人日本テレワーク協会　副会長<br />特定非営利活動法人地域産業おこしの会理事長</td>
<td></td>
</tr>
→
ふりがな,氏名,所属・役職,活動拠点,略歴,地域情報化の専門分野・技術,専門分野,自治体向けメッセージ,関連サイト,地域情報化に関する実績・これまでの経験業務・研究活動,これまでに関与した地域情報化に関するプロジェクト
*/

const list = [];
const trs = dom.querySelectorAll("tbody > tr");
let id = 1;
for (const tr of trs) {
  const tds = tr.querySelectorAll("td");
  const url_pdf = tr.querySelector("a").getAttribute("href");
  const tdname = tds[2];
  
  const adname = tdname.childNodes[0].text;
  const n = adname.indexOf("（");
  const name = adname.substring(0, n);
  const kana = adname.substring(n + 1, adname.length - 1);

  const titles = tdname.childNodes.filter(i => i.nodeType == NODETYPE_TEXT).map(i => i.text.trim()).join("\n");

  const tags = tds[0].querySelectorAll("img").map(i => i.getAttribute("title")).join(",");

  list.push({
    ID: id++,
    ふりがな: kana,
    氏名: name,
    "所属・役職": titles,
    主な対応分野: tags,
    顔写真: makeURL(tds[1].querySelector("img").getAttribute("src")),
    PDF: makeURL(url_pdf),
  });
}
console.log(list, list.length);
await Deno.writeTextFile("ictadvisors_2025.csv", CSV.stringify(list));
