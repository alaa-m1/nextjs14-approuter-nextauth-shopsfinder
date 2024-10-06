/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/en",
  //       permanent: true,
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // Add aliasing
    config.resolve.alias = {
      ...config.resolve.alias,

      'handlebars' : 'handlebars/dist/handlebars.js',
    };

    return config;
  },
};

module.exports = nextConfig;
