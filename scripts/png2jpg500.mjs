// png2jpg500.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Использование:
 *   node png2jpg500.mjs --in ./img/source --out ./img/preview
 *
 * Превращает все .png из исходной папки (рекурсивно) в JPEG-превью 500px (по длинной стороне).
 * Структуру подпапок сохраняет, расширение меняет на .jpg
 */

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.replace(/^--/, ""), arr[i + 1]]);
    return acc;
  }, [])
);

const SRC_DIR = path.resolve(args.in || "./img/source"); // где лежат PNG
const OUT_DIR = path.resolve(args.out || "./img/preview"); // куда класть JPEG

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function convertOne(srcFile) {
  const rel = path.relative(SRC_DIR, srcFile);
  const parsed = path.parse(rel);
  const dstDir = path.join(OUT_DIR, parsed.dir);
  const dstFile = path.join(dstDir, parsed.name + ".jpg");

  await ensureDir(dstDir);

  // Конвертация: поворот по EXIF, вписать в 500×500, не увеличивать, JPEG с хорошим сжатием.
  await sharp(srcFile)
    .rotate()
    .resize({
      width: 500,
      height: 500,
      fit: "inside",
      withoutEnlargement: true,
      fastShrinkOnLoad: true,
    })
    .jpeg({
      quality: 80, // обычно достаточно 75–85
      progressive: true, // прогрессивный JPEG
      mozjpeg: true, // чуть лучшее сжатие
      chromaSubsampling: "4:2:0",
    })
    .toFile(dstFile);

  return { srcFile, dstFile };
}

async function main() {
  // sanity checks
  const srcStat = await fs.stat(SRC_DIR).catch(() => null);
  if (!srcStat || !srcStat.isDirectory()) {
    console.error(`❌ Не нашёл папку с исходниками: ${SRC_DIR}`);
    process.exit(1);
  }
  await ensureDir(OUT_DIR);

  let total = 0,
    ok = 0,
    fail = 0;
  for await (const file of walk(SRC_DIR)) {
    if (!file.toLowerCase().endsWith(".png")) continue;
    total++;
    try {
      const { dstFile } = await convertOne(file);
      ok++;
      console.log(
        `✅ ${path.relative(process.cwd(), file)} → ${path.relative(
          process.cwd(),
          dstFile
        )}`
      );
    } catch (err) {
      fail++;
      console.error(`⚠️  Ошибка для ${file}:`, err.message);
    }
  }

  console.log(`\nГотово. Всего PNG: ${total}, успешно: ${ok}, ошибок: ${fail}`);
}

main().catch((e) => {
  console.error("Фатальная ошибка:", e);
  process.exit(1);
});
