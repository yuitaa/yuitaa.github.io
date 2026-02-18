import { unrailedMaps } from '@/data/unrailedMaps';
import type { APIRoute } from 'astro';
import sharp from 'sharp';

export const GET: APIRoute = async ({ params }) => {
  const response = await fetch(`https://u2.unrailed-online.com/CustomMap/Screenshot/${params.id}`);

  const imageBuffer = await response.arrayBuffer();

  const resizedImageBuffer = await sharp(imageBuffer).resize(304, 171).webp({ quality: 80 }).toBuffer();

  return new Response(resizedImageBuffer, {
    headers: { 'Content-Type': 'image/webp' },
  });
};

export function getStaticPaths() {
  return unrailedMaps.map((map) => ({ params: { id: map.customMapId } }));
}
