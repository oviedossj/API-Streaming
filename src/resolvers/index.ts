import path from 'path';
import fs from 'fs';

export default async function registerResolvers() {
  const routesDir = path.join(__dirname);
  const routeFiles = fs
    .readdirSync(routesDir)
    .filter((file) => (file.endsWith('.ts') || file.endsWith('.js')) && !file.includes('index'));
  const importedFiles = (await Promise.all(routeFiles.map((file) => import(path.join(routesDir, file))))) as {
    resolver: object;
  }[];
  const resolvers = importedFiles.map((object) => object.resolver);
  return resolvers;
}
