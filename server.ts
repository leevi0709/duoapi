// server.ts
import { serve } from "https://deno.land/std@0.137.0/http/server.ts";
import { existsSync, readFileSync } from "https://deno.land/std@0.137.0/fs/mod.ts";
 
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
 
for await (const req of s) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = `./${path}`;
    if (existsSync(filePath)) {
        const file = readFileSync(filePath);
        const headers = new Headers();
        headers.set("Content-Type", "text/html"); // 根据文件类型调整
        req.respond({ body: file, headers });
    } else {
        req.respond({ status: 404 });
    }
}