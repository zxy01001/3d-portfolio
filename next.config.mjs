const isStaticExport = process.env.STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
    "@chibi3d/runtime",
  ],
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        async redirects() {
          return [
            {
              source: "/cases/agent-platform.html",
              destination: "/projects/agent-platform",
              permanent: false,
            },
            {
              source: "/cases/voice-order.html",
              destination: "/projects/voice-order",
              permanent: false,
            },
            {
              source: "/cases/sales-coaching.html",
              destination: "/projects/sales-coaching",
              permanent: false,
            },
            {
              source: "/cases/business-overview.html",
              destination: "/projects/business-overview",
              permanent: false,
            },
            {
              source: "/cases/profile-settings.html",
              destination: "/projects/profile-settings",
              permanent: false,
            },
            {
              source: "/cases/resume.html",
              destination: "/resume",
              permanent: false,
            },
          ];
        },
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=()",
                },
              ],
            },
            {
              source: "/assets/(.*)",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=3600, must-revalidate",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
