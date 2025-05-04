import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin"

const nextConfig: NextConfig = {
  /* Custom webpack plugin for including Prisma engines in the resulting build (required for updating caches) */
  webpack: ((config, { dev, isServer }) => {
    if (!isServer || dev) return config

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "*.node", // filepath glob pattern relative to context (so full pattern would be orm/client/*.node)
            to: ".", // copy to the root of the output directory (ie; .next/server for server build)
            context: "orm/client" // set context to orm/client directory (relative to the current source dir)
          }
        ]
      })
    )

    return config
  })
};

export default nextConfig;
