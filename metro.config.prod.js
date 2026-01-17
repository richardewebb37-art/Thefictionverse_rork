const { getDefaultConfig } = require("expo/metro-config");

// Standard Expo Metro config for EAS builds
const config = getDefaultConfig(__dirname);

module.exports = config;