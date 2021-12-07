import { merge } from "webpack-merge";

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import commonConfig from "./webpack.common";

const productionConfig = {
  mode: "production",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
    chunkIds: "deterministic",
    moduleIds: "deterministic",
    minimize: true,
    innerGraph: true,
    flagIncludedChunks: true,
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

export default merge(commonConfig, productionConfig);
