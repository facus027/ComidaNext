/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
//https://res.cloudinary.com/dwxwejuvu/image/upload/v1716333944/kzqrijiepug8odvv1t6r.jpg
