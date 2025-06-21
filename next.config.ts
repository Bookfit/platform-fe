import type { NextConfig } from "next";

/**
 * Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure resource 'http://...'. This request has been blocked; the content must be served over HTTPS.
 * 암호화된 HTTPS 페이지에 암호화가 안 된 HTTP를 사용해 요청했을때 발생해서 임시 추가
 *  **/

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*/api/:subpath*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:subpath*`,
      },
    ];
  },
};

export default nextConfig;
