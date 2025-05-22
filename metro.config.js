const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// Remove `.svg` from asset extensions and add it to source extensions
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');
defaultConfig.resolver.sourceExts.push('svg');

// Use react-native-svg-transformer for SVG files
defaultConfig.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

module.exports = mergeConfig(defaultConfig, {});
