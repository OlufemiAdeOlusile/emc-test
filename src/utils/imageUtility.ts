import { Page, APIResponse } from 'playwright';
import fs from 'fs';
import path from 'path';
import findRoot from 'find-root';

function ensureDirectoryExists(filePath: string): void {
  const directoryPath: string = path.dirname(filePath);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

export async function downloadAndWriteImageFile(page: Page, imageUrl: string, filePath: string): Promise<void> {
  if (fs.existsSync(filePath)) {
    console.debug(`File already exists at ${filePath}, skipping download.`);
    return;
  }

  const response: APIResponse = await page.request.get(imageUrl);
  if (!response.ok()) {
    throw new Error(`Failed to fetch image from ${imageUrl}`);
  }
  const buffer: Buffer = await response.body();

  ensureDirectoryExists(filePath);
  fs.writeFileSync(filePath, buffer);
}

export async function writeToJsonFile<T>(jsonFileName: string, jsonObject: T): Promise<void> {
  const projectRoot: string = findRoot(__dirname);
  const filePath: string = path.join(projectRoot, 'results', `${jsonFileName}.json`);

  ensureDirectoryExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2));
}
