module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['linkarchive-profile.s3.ap-northeast-2.amazonaws.com'],
    unoptimized: true,
  },
};
