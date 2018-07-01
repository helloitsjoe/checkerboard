const nodeExternals = require('webpack-node-externals');

const config = {
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    mode: "development",
    output: {
        filename: "index.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    }
}

module.exports = [ config ];