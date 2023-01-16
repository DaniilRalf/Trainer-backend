const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './webpack_plug.bundle.js',
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack_plug.bundle.js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'api'), to: path.resolve(__dirname, "dist/api")},
                { from: path.resolve(__dirname, 'controllers'), to: path.resolve(__dirname, "dist/controllers")},
                { from: path.resolve(__dirname, 'middleware'), to: path.resolve(__dirname, "dist/middleware")},
                { from: path.resolve(__dirname, 'models'), to: path.resolve(__dirname, "dist/models")},
                { from: path.resolve(__dirname, 'workers'), to: path.resolve(__dirname, "dist/workers")},
                { from: path.resolve(__dirname, 'package.json'), to: path.resolve(__dirname, "dist")},
                { from: path.resolve(__dirname, 'db.js'), to: path.resolve(__dirname, "dist")},
                { from: path.resolve(__dirname, '.env'), to: path.resolve(__dirname, 'dist')},
                { from: path.resolve(__dirname, 'index.js'), to: path.resolve(__dirname, "dist")},
            ],
        }),
        new CleanWebpackPlugin(
            {
                cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')],
                cleanAfterEveryBuildPatterns: [path.join(__dirname, 'dist/webpack_plug.bundle.js')]
            }
        ),
    ],
};