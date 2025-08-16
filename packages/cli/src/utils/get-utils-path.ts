// helpers/getRemoteUtilsFile.ts

/**
 * Returns metadata for utils.ts file hosted on GitHub
 * Converts GitHub blob URL to raw URL
 */
export function getRemoteUtilsFile() {
  const githubBlobUrl =
    "https://github.com/Hareesh108/harukit-ui/blob/main/apps/web/lib/utils.ts";

  // Convert GitHub blob URL to raw URL
  const rawUrl = githubBlobUrl
    .replace("https://github.com/", "https://raw.githubusercontent.com/")
    .replace("/blob/", "/");

  return {
    name: "utils.ts",
    path: rawUrl,
    content: "", // Optional: can fetch dynamically later
    type: "utility" as const,
  };
}
