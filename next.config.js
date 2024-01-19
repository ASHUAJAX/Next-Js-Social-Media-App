/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    async generateStaticParams() {
        // Your custom logic to generate static params
        return {
          '/': { page: '/' },
          '/login': { page: '/login' },
          '/feed': { page: '/feed' },
          // Add more paths as needed
        };
      },
    images:{unoptimized:true},
    sassOptions:{
        includePaths: [path.join(__dirname,'styles')]
    }
}

module.exports = nextConfig
