import liff from '@line/liff';

const isProd = process.env.NODE_ENV === 'production';
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // แปลงเป็น Static HTML สำหรับ GitHub Pages
  images: { unoptimized: true }, // ปิด Image Optimization
  assetPrefix: isProd ? '/demo-fuels-price/' : '',
  basePath: isProd ? '/demo-fuels-price' : '',
  env: {
    portDev: '5001',
    liffId: '2006968919-ArYdqmNG',
  },
};

export default nextConfig;
