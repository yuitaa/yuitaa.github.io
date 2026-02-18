import { noteArticles } from '@/data/noteArticles';
import type { APIRoute } from 'astro';
import sharp from 'sharp';

export const GET: APIRoute = async ({ props }) => {
  const response = await fetch(props.eyecatcUrl);

  const imageBuffer = await response.arrayBuffer();

  const resizedImageBuffer = await sharp(imageBuffer).resize(304, 171).webp({ quality: 80 }).toBuffer();

  return new Response(resizedImageBuffer, {
    headers: { 'Content-Type': 'image/webp' },
  });
};

export function getStaticPaths() {
  return noteArticles.map(({ id, eyecatch }) => ({
    params: { id },
    props: { eyecatcUrl: eyecatch },
  }));
}
