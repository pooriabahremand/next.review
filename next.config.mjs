/** @type {import('next').NextConfig} */
export const images = {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    },
  ],
};
