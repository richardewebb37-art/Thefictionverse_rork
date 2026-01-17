const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Check for EAS build environment using multiple indicators
const isEasBuild = 
  process.env.EAS_BUILD === '1' ||
  process.env.EAS_BUILD_MODE === 'production' || 
  process.env.EAS_BUILD_MODE === 'preview' ||
  process.env.EAS_BUILD_MODE === 'development' ||
  process.env.CI === 'true' ||
  process.env.EXPO_CI === '1';

if (isEasBuild) {
  console.log("🏗️ EAS Build detected - using standard Expo Metro config");
  module.exports = config;
} else {
  // For local development, try to use Rork Metro wrapper
  try {
    const { withRorkMetro } = require("@rork-ai/toolkit-sdk/metro");
    console.log("🔧 Local development - using Rork Metro wrapper");
    module.exports = withRorkMetro(config);
  } catch (error) {
    console.log("⚠️ Rork SDK not available, falling back to standard Metro config");
    console.log("Error:", error.message);
    module.exports = config;
  }
}