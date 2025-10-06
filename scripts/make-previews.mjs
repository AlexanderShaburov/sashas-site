// scripts/make-previews.mjs
// Запуск:
// node scripts/make-previews.mjs \
//     --in ./public/gallery/mixed \
//     --out ./public/gallery/mixed/preview \
//     --long 500 \
//     --copy-full ./public/gallery/mixed/full

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

function parseArgs() {
  const args = process.argv.slice(2);
  const map = {};
  for (let i = 0; i < args.length; i += 2) {
    const k = args[i],
      v = args[i + 1];
    if (!v || v.startsWith("--")) {
      throw new Error("Неверные аргументы");
    }
    map[k.replace(/^--/, "")] = v;
  }
  if (!map.in || !map.out) {
    console.log(
      "Usage: node scripts/make-previews.mjs --in <INPUT_DIR> --out <OUTPUT_DIR> --long <500> [--copy-full <FULL_DIR>]"
    );
    process.exit(1);
  }
  map.long = parseInt(map.long ?? "500", 10);
  return map;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

const {
  in: IN_DIR,
  out: OUT_DIR,
  long: LONG_SIDE,
  "copy-full": FULL_DIR,
} = parseArgs();

const SUPPORTED = /\.(jpe?g|png|webp|tiff|bmp)$/i;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (SUPPORTED.test(e.name)) yield p;
  }
}

(async () => {
  await ensureDir(OUT_DIR);
  if (FULL_DIR) await ensureDir(FULL_DIR);

  let count = 0;
  for await (const file of walk(IN_DIR)) {
    const rel = path.relative(IN_DIR, file); // подкаталоги сохраняем
    const baseName = path.parse(rel).name; // имя без расширения
    const outDirForFile = path.join(OUT_DIR, path.dirname(rel));
    await ensureDir(outDirForFile);

    // Делаем превью: длинная сторона <= LONG_SIDE, пропорции сохраняются,
    // не увеличиваем маленькие (withoutEnlargement)
    const pipeline = sharp(file).rotate().resize({
      width: LONG_SIDE,
      height: LONG_SIDE,
      fit: "inside",
      withoutEnlargement: true,
    });

    // Сохраняем превью в двух форматах (на выбор — можно оставить только webp)
    const outAvif = path.join(outDirForFile, `${baseName}.avif`);
    const outWebp = path.join(outDirForFile, `${baseName}.webp`);

    await pipeline.clone().avif({ quality: 45 }).toFile(outAvif);
    await pipeline.clone().webp({ quality: 72 }).toFile(outWebp);

    // По желанию: скопировать оригинал в каталог «full» (для лайтбокса)
    if (FULL_DIR) {
      const fullDirForFile = path.join(FULL_DIR, path.dirname(rel));
      await ensureDir(fullDirForFile);
      const dest = path.join(fullDirForFile, path.basename(file));
      await fs.copyFile(file, dest);
    }

    count++;
    if (count % 20 === 0) console.log(`Processed ${count} files...`);
  }

  console.log(`Done. Processed ${count} file(s).`);
  console.log(`Previews → ${OUT_DIR}`);
  if (FULL_DIR) console.log(`Full copies → ${FULL_DIR}`);
})();
