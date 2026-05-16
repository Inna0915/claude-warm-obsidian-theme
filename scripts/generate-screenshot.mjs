import fs from "node:fs";
import zlib from "node:zlib";

const width = 512;
const height = 288;
const data = Buffer.alloc((width * 4 + 1) * height);

const palette = {
  ivory: [248, 247, 242, 255],
  paper: [252, 250, 246, 255],
  straw: [233, 228, 214, 255],
  ink: [63, 58, 47, 255],
  gold: [183, 121, 31, 255],
  charcoal: [42, 43, 42, 255],
  panel: [45, 46, 45, 255],
  graphite: [40, 44, 52, 255],
  creamText: [236, 233, 220, 255],
  warmGold: [230, 191, 122, 255]
};

for (let y = 0; y < height; y += 1) {
  data[y * (width * 4 + 1)] = 0;
}

rect(0, 0, 256, height, palette.charcoal);
rect(256, 0, 256, height, palette.ivory);

mockObsidian(20, 22, 216, 244, true);
mockObsidian(276, 22, 216, 244, false);

fs.writeFileSync("screenshot.png", png(width, height, data));
console.log("Generated screenshot.png");

function mockObsidian(x, y, w, h, dark) {
  const bg = dark ? palette.panel : palette.paper;
  const side = dark ? palette.graphite : palette.straw;
  const text = dark ? palette.creamText : palette.ink;
  const accent = dark ? palette.warmGold : palette.gold;
  const muted = dark ? [180, 176, 164, 255] : [126, 117, 96, 255];

  roundedRect(x, y, w, h, 12, bg);
  rect(x, y, 48, h, side);
  rect(x + 12, y + 18, 24, 4, accent);
  rect(x + 12, y + 36, 24, 3, muted);
  rect(x + 12, y + 52, 18, 3, muted);
  rect(x + 12, y + 68, 26, 3, muted);

  rect(x + 68, y + 26, 96, 7, text);
  rect(x + 68, y + 48, 136, 3, muted);
  rect(x + 68, y + 60, 126, 3, muted);
  rect(x + 68, y + 72, 146, 3, muted);

  roundedRect(x + 68, y + 96, 130, 28, 7, dark ? [52, 53, 51, 255] : [240, 238, 230, 255]);
  rect(x + 82, y + 107, 78, 3, accent);
  rect(x + 82, y + 116, 98, 3, muted);

  rect(x + 68, y + 146, 112, 5, text);
  rect(x + 68, y + 166, 142, 3, muted);
  rect(x + 68, y + 178, 132, 3, muted);
  rect(x + 68, y + 190, 120, 3, muted);

  roundedRect(x + 68, y + 214, 146, 24, 7, dark ? palette.graphite : palette.straw);
  rect(x + 82, y + 224, 94, 3, accent);
}

function roundedRect(x, y, w, h, radius, color) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) {
      const dx = xx < x + radius ? x + radius - xx : xx >= x + w - radius ? xx - (x + w - radius - 1) : 0;
      const dy = yy < y + radius ? y + radius - yy : yy >= y + h - radius ? yy - (y + h - radius - 1) : 0;
      if (dx * dx + dy * dy <= radius * radius || dx === 0 || dy === 0) setPixel(xx, yy, color);
    }
  }
}

function rect(x, y, w, h, color) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) setPixel(xx, yy, color);
  }
}

function setPixel(x, y, [r, g, b, a]) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const offset = y * (width * 4 + 1) + 1 + x * 4;
  data[offset] = r;
  data[offset + 1] = g;
  data[offset + 2] = b;
  data[offset + 3] = a;
}

function png(w, h, raw) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk("IHDR", Buffer.concat([u32(w), u32(h), Buffer.from([8, 6, 0, 0, 0])])),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

function chunk(type, bytes) {
  const name = Buffer.from(type);
  const crc = crc32(Buffer.concat([name, bytes]));
  return Buffer.concat([u32(bytes.length), name, bytes, u32(crc)]);
}

function u32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32BE(value >>> 0);
  return buffer;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}
