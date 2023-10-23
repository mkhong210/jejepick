/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
    dest: "public",
    // disable: process.env.NODE_ENV !== "production",
    runtimeCaching: [],
  });
