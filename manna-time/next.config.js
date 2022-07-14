/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, //development mode
  trailingSlash: true, // i18n
  async redirects() {
    return [
      {
        source: "/",
        destination: "/make-room",
        permanent: false
      }, 
    ]
  }
}

module.exports = nextConfig
