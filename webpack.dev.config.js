const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: [
      "./src/pages/index/index.js",
      "./src/pages/index/index.scss",
      "./src/components/nav/index.js",
    ],
    about: [
      "./src/pages/about/index.js",
      "./src/pages/about/index.scss",
      "./src/components/nav/index.js",
    ],
    skills: [
      "./src/pages/skills/index.js",
      "./src/pages/skills/index.scss",
      "./src/components/nav/index.js",
    ],
    projects: [
      "./src/pages/projects/index.js",
      "./src/pages/projects/index.scss",
      "./src/components/nav/index.js",
    ],
    contact: [
      "./src/pages/contact/index.js",
      "./src/pages/contact/index.scss",
      "./src/components/nav/index.js",
    ],
  },
  output: {
    filename: "[name]/index.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "auto",
  },
  mode: "development",
  devServer: {
    port: 8080,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        enforce: "pre",
        loader: "import-glob-loader",
      },
      {
        test: /\.(svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
        generator: {
          filename: "resources/svg/[name][ext]",
        },
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
        generator: {
          filename: "resources/images/[name][ext]",
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData:
                '@import "bootstrap"; @import "./src/styles/_mixins.scss"; @import "./src/styles/_main-classes.scss"; @import "./src/styles/_variables.scss"; @import "./src/styles/_main.scss"; @import "./src/styles/_override-bootstrap.scss"; @import "./src/components/footer/_footer.scss"; @import "./src/components/nav/nav.scss";',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/index.css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/resources", to: "resources" }],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/pages/index/index.html",
      filename: "index.html",
      chunks: ["index"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/about/index.html",
      filename: "about/index.html",
      chunks: ["about"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/skills/index.html",
      filename: "skills/index.html",
      chunks: ["skills"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/projects/index.html",
      filename: "projects/index.html",
      chunks: ["projects"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/contact/index.html",
      filename: "contact/index.html",
      chunks: ["contact"],
      inject: true,
    }),
  ],
};
