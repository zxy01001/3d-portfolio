import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src", "app", "api");
const stashDir = path.join(root, ".api-stash-during-static-build");
const outDir = path.join(root, process.env.NEXT_DIST_DIR || "out");
const nextBin = path.join(root, "node_modules", ".bin", "next");

let stashed = false;

try {
  // Recover any previous interrupted stash first
  if (!fs.existsSync(apiDir) && fs.existsSync(stashDir)) {
    fs.renameSync(stashDir, apiDir);
  }

  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, stashDir);
    stashed = true;
  }

  execFileSync(nextBin, ["build", "--webpack"], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "true",
    },
  });

  if (fs.existsSync(outDir)) {
    const redirects = [
      "/cases/agent-platform.html /projects/agent-platform/ 301",
      "/cases/voice-order.html /projects/voice-order/ 301",
      "/cases/sales-coaching.html /projects/sales-coaching/ 301",
      "/cases/business-overview.html /projects/business-overview/ 301",
      "/cases/profile-settings.html /projects/profile-settings/ 301",
      "/cases/resume.html /resume/ 301",
    ].join("\n");
    fs.writeFileSync(path.join(outDir, "_redirects"), redirects + "\n", "utf8");
  }
} finally {
  if (stashed && fs.existsSync(stashDir)) {
    fs.renameSync(stashDir, apiDir);
  }
}
