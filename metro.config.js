const { getDefaultConfig } = require("expo/metro-config");

// Check if we're in EAS build environment or should use standard Expo
const isEasBuild = process.env.EAS_BUILD === '1' || process.env.USE_STANDARD_EXPO === '1';

const config = getDefaultConfig(__dirname);

// Only use Rork Metro wrapper for local development, not for EAS builds
if (!isEasBuild) {
  try {
    const { withRorkMetro } = require("@rork-ai/toolkit-sdk/metro");
    console.log("🔧 Using Rork Metro wrapper for development");
    module.exports = withRorkMetro(config);
  } catch (error) {
    console.log("⚠️ Rork SDK not available, using standard Metro config");
    module.exports = config;
  }
} else {
  console.log("🏗️ Using standard Expo Metro config for EAS build");
  module.exports = config;
}