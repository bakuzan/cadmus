import fs from 'fs';
import path from 'path';

type URLParams = { params: { isbn13: string } };

export async function GET(_request: Request, { params }: URLParams) {
  if (!process.env.IMAGES_PATH) {
    throw new Error('No images folder set.');
  }

  const isbn13 = params.isbn13;
  const filePath = path.resolve(process.env.IMAGES_PATH, `${isbn13}.jpg`);
  const data = fs.readFileSync(filePath);

  return new Response(data, { headers: { 'content-type': 'image/jpg' } });
}
