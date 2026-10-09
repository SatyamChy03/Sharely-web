// Static hosts serve 404.html for unknown paths; a copy of the app lets
// deep links such as /download load and route on the client.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
