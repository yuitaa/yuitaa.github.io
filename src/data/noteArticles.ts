import z from 'zod';

const username = 'yuita';
const url = `https://note.com/api/v2/creators/${username}/contents`;

const NoteContentSchema = z.object({
  publishAt: z.string().pipe(z.coerce.date()),
  eyecatch: z.string(),
  noteUrl: z.string(),
  name: z.string(),
});

const NoteApiResponseSchema = z.object({
  data: z.object({
    contents: z.array(NoteContentSchema),
    isLastPage: z.boolean(),
    totalCount: z.number(),
  }),
});

async function getNoteArticles() {
  const noteArticles: z.infer<typeof NoteContentSchema>[] = [];

  for (let i = 1; i < 10; i++) {
    const params: Record<string, string> = {
      kind: 'note',
      page: String(i),
    };
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const rawData = await response.json();
    const data = NoteApiResponseSchema.parse(rawData);

    noteArticles.push(...data.data.contents);
  }

  return noteArticles;
}

export const noteArticles = await getNoteArticles();
