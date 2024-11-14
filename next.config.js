// Import the withSentryConfig function
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referrer-policy", value: "no-referrer" }],
      },
    ];
  },
  experimental: {
    instrumentationHook: false,  // Disable instrumentationHook to remove the warning
  },
};

// Use withSentryConfig to wrap your Next.js configuration
module.exports = withSentryConfig(nextConfig, {
  org: "st-peter-lifeplan-inc",
  project: "issue-tracker",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
