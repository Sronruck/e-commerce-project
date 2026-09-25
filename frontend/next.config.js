/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "static.nike.com",
      "assets.adidas.com",
      "d2cva83hdk3bwc.cloudfront.net",
      "blob.sxv.pl",
      "img.sasom.co.th",
      "encrypted-tbn0.gstatic.com",
      "fearofgod.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.nike.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d2cva83hdk3bwc.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blob.sxv.pl",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.sasom.co.th",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fearofgod.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;