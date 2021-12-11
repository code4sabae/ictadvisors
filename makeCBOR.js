import { CSV } from "https://js.sabae.cc/CSV.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";
import { deepEqual } from "https://js.sabae.cc/deepEqual.js";
import { getFileSizeKB } from "https://js.sabae.cc/getFileSize.js";

const fn = "ictadvisors_2021_2";

const csv = await CSV.fetch(fn + ".csv");
const cbor = CBOR.encode(csv);
await Deno.writeFile(fn + ".csv.cbor", new Uint8Array(cbor));

const json = CSV.toJSON(csv);
await Deno.writeTextFile(fn + ".json", JSON.stringify(json));
const cbor2 = CBOR.encode(json);
await Deno.writeFile(fn + ".cbor", new Uint8Array(cbor2));

const list = {
  "csv": async (fn) => CSV.toJSON(await CSV.fetch(fn)),
  "csv.cbor": async (fn) => CSV.toJSON(CBOR.decode(await Deno.readFile(fn))),
  "json": async (fn) => JSON.parse(await Deno.readTextFile(fn)),
  "cbor": async (fn) => CBOR.decode(await Deno.readFile(fn)),
};

for (const ext in list) {
  const t = performance.now();
  const fn2 = fn + "." + ext;
  const data = await list[ext](fn2);
  const dt = performance.now() - t;
  const size = await getFileSizeKB(fn2);
  console.log(fn2, size, dt.toFixed(2) + "msec");
  const ok = deepEqual(data, json);
  if (!ok) {
    //await Deno.writeTextFile("1.json", JSON.stringify(data))
    //await Deno.writeTextFile("2.json", JSON.stringify(json))
    throw new Error("not match!!");
  }
}
