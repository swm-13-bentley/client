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

// module.exports = nextConfig

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  
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