import z from 'zod';

const url = 'https://u2.unrailed-online.com/CustomMap/List';

const params: Record<string, string> = {
  limit: '100',
  sort: 'recent',
  showFromUser: 'c0af36b9-d862-4e4c-b3d4-b160fa599af7',
  offset: '0',
};

const UnrailedMapSchema = z.object({
  name: z.string().trim(),
  lastUploadDate: z.string().pipe(z.coerce.date()),
  customMapId: z.string(),
});

const UnrailedMapsListSchema = z.array(UnrailedMapSchema);

async function getUnrailedMaps() {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${url}?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawData = await response.json();
  const data = UnrailedMapsListSchema.parse(rawData);
  return data;
}

export const unrailedMaps = await getUnrailedMaps();
