import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
const html = await readFile("out/index.html", "utf8");
const entry = [
  ...new Set(
    [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map((match) => match[1]),
  ),
];
const gzipBytes = async (file) => gzipSync(await readFile(file)).length;
const core = (
  await Promise.all(entry.map((file) => gzipBytes("out" + file)))
).reduce((a, b) => a + b, 0);
const chunks = (await readdir("out/_next/static/chunks")).filter((file) =>
  file.endsWith(".js"),
);
const total = (
  await Promise.all(
    chunks.map((file) => gzipBytes(path.join("out/_next/static/chunks", file))),
  )
).reduce((a, b) => a + b, 0);
const fonts = (await readdir("public/fonts")).filter((file) =>
  file.endsWith(".woff2"),
);
const fontBytes = (
  await Promise.all(fonts.map((file) => stat(path.join("public/fonts", file))))
).reduce((n, file) => n + file.size, 0);
console.log(
  JSON.stringify(
    {
      coreRouteJavaScriptGzipKiB: +(core / 1024).toFixed(1),
      allJavaScriptChunksGzipKiB: +(total / 1024).toFixed(1),
      additionalChunksIncludingSceneAndOtherRoutesGzipKiB: +(
        (total - core) /
        1024
      ).toFixed(1),
      fontFilesKiB: +(fontBytes / 1024).toFixed(1),
      heroPosterGzipKiB: +(
        (await gzipBytes("public/media/experience/ribbon.svg")) / 1024
      ).toFixed(1),
    },
    null,
    2,
  ),
);
