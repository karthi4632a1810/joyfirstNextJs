import * as THREE from "three";

type NoiseTextureOptions = {
  size?: number;
  base?: string;
  variance?: number;
};

/** Generates a small grain/noise texture on a canvas — no network asset fetch. */
export function createNoiseTexture({
  size = 256,
  base = "#b9b2a3",
  variance = 18,
}: NoiseTextureOptions = {}): THREE.CanvasTexture | null {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const baseColor = new THREE.Color(base);
  const imageData = ctx.createImageData(size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const n = (Math.random() - 0.5) * variance;
    imageData.data[i] = Math.min(255, Math.max(0, baseColor.r * 255 + n));
    imageData.data[i + 1] = Math.min(255, Math.max(0, baseColor.g * 255 + n));
    imageData.data[i + 2] = Math.min(255, Math.max(0, baseColor.b * 255 + n));
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

type GridTextureOptions = {
  size?: number;
  lineColor?: string;
  cell?: number;
};

/** Generates a technical-drawing grid on a transparent canvas — used for the blueprint material swatch. */
export function createGridTexture({
  size = 256,
  lineColor = "#c7a06b",
  cell = 32,
}: GridTextureOptions = {}): THREE.CanvasTexture | null {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.strokeStyle = lineColor;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1;
  for (let x = 0; x <= size; x += cell) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  for (let y = 0; y <= size; y += cell) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}
