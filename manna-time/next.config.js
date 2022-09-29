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
      // {
      //   source: "/",
      //   destination: "/make-room",
      //   permanent: false
      // }, 
    ]
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}