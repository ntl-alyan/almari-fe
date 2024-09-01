/**  @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: '**',
              port: '',
              pathname: '**',
          },
      ],
  },

  flags: {
    DEV_SSR: false,
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/Home",
        permanent: true,
      },
    ];
  },

}
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.exports = nextConfig
