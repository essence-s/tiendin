/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_EMAIL: 'ardillaone@absolute-gantry-438703-e4.iam.gserviceaccount.com',
    GOOGLE_PRIVATE_KEY:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVDiDZyIUTyzCg\nnED3HRUWIN1uYZvb9aPTu8ijlwZnM2wR47WesCtTDHZNMYyMbMb4oLhnGka++GBE\naD7sWcqqiZhf7fuL7ZOSXu9nyc9ky5bqlgTosOAR6+Qz465J8rSPGK2o6SjqTamd\nd5Lnz9PRV0xTHpgvd1tKnqtNhQ1LuWsTVs2jSVKAiGDlhNLLzCkqgXSuJgPAbJRO\npx+Ov5qnW1yHrAvqXiYmLaDXy8/lqM2Zt2+lzJsv62MJAWXUNGPDpJ7vZV7Ujs9V\n6+GJw9wNmofgyfKTi1XF4Hsn6eaDMaDH1KsbK0C9Icdsbm3iUX657jGhYS37K2n+\nEdR9R2qVAgMBAAECggEASuDZSNFBfBBoeboQ1wiglZNdX2LsvSSavFp+DIiSloir\nDaqC9U+jGmAB3+VvKRc94rnRtWK1xH5UjxY4LybrpH4RUH26b5ZCzCmTaF20Bw/K\nbY3mEcXAKmxGWrpFUfX74WLh/cBcQeSjnRUeS1xubF+LEpdpEx2WtyYGvIrrflX6\n+q7nWO8O3qQ3chgr/6ehg1a9Q46I+rxedv/K9CGhWSUWOM2OnhKnbB44gwFbDu6d\n1/R/dIbFrq7EftdWIm1WhwMb7vRKe1zxr41E8LfDRbnlk61ZlpPy4hufMZwbDVBc\nfknJDYPpjODQMQVkwWYcvUWxfJl2RJ89yn/RDafXzQKBgQDxyooeKpdm78giGpZO\ntoiCpmzsdWOplBGlOwIJeEJmszXhZqHIc1dSr42rCK8eWDdqIpjCK1oCU/QXkEbs\nJF/3hWGk+1i5CgopvYSBGj5LGvrtiNa9/f06hGNM39W0KiMhb58GWhYxNn3h2Jka\nTSJUHKiY2tJ3/UWBcd+hqllwawKBgQDhk0pHX/59dSFoPDQlrbQduBq0f6CdIpIS\nFVH+sVRinWSbcKqvdRnQr/I71sKkrcGgY3oLmHRIwIfK02QjZYYwPkmzhSWEWffW\nPOjr9LiXyfFKgHaQiQA5k1SZM0qd8Uxc4edh9sQAgGD0FW7PFtjqn7wGOlOYK7H6\nFtTaWO1Q/wKBgQCla8FE1DTTCvdsRa5R2dXZNM1OlR2DNjdASPeizPD43GDffdzv\ni+HRQyP0QLO2WfpHlbXXGduxvghAWsf65QP3Dvz357ISnojHd86AmRjHP4UvH7Bz\nOaKW914MiRLm+PEh/gDZUqbeMn67FfnhIaZ7z0OVmBfoWZHE9sheDXK1UwKBgDMf\nk5ULj3zVgAXEpzjm3kxh/kNsLXWPcTWB+XxUqkBTVYrZBQYQ7xHZ3ndrW9/AtYJp\nKS7ZlXkrkVsJf8d56eijJUb3ZSJS1ZWLZmqbov5buUDeToDBW/iwiFrUQhP7rQfb\n9vm/2HoYnmCTPvLWRcEfBJkQvQNe285HQGRgBSD3AoGAcZD1mY64V7gnuVQL9KjU\nb7orDfDynSeQ+L0N+PSiq5NMywkm7c9Z6ZtH7rSmvg7dbDjzcs3kk0w88U6C9BDD\n7S5IBF43yNpFvYbgxOIWsLsEKmJ0pbIOSDNNwXlPPhiUQYdzYcK5DHlWZc8KooXC\nVCyMbolxA9lhKzBT2M3oWcE=\n-----END PRIVATE KEY-----\n',
    GOOGLE_SHEET_ID: '1EIs9KPTb3a0_khyFzmXnLC6doT8h5Jxd_yufDkcLMTo',
    GOOGLE_CLIENT_ID: '114838754364046529295',
    // APP_URL: 'https://web.vercel.app/'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
