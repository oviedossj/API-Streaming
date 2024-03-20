import path from 'path';
import fs from 'fs';

export default function retrieveSchemas() {
  const routesDir = path.join(__dirname);
  const routeFiles = fs.readdirSync(routesDir).filter((file) => file.endsWith('.graphql'));
  const typeDefs = routeFiles.reduce(
    (acc, file) => acc.concat(fs.readFileSync(path.join(routesDir, file), { encoding: 'utf-8' })),
    ''
  );
  return typeDefs;
}
