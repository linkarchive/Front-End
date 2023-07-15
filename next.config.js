module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Ignore test files in build
    if (!options.isServer) {
      config.module.rules.push({
        test: /\.test\.tsx?$/,
        loader: 'ignore-loader',
      });
    }

    return config;
  },
  images: {
    domains: ['linkarchive-profile.s3.ap-northeast-2.amazonaws.com'],
    unoptimized: true,
  },
};
