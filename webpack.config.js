const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Webpack Server Url
const webpackDevServerIP = "127.0.0.1";
const webpackDevServerPort = 9003;
const webpackDevServerUrl = buildUrl(webpackDevServerIP, webpackDevServerPort);

// Production Server IP/Domain
const productionServerUrl = webpackDevServerUrl;

module.exports = (env, argv) => {
    const mode = getMode(argv);

    const config = {
        mode: mode,

        entry: {
            "mainBundle": path.join(__dirname, "./src/ts/Main.ts")
        },

        output: {
            path: path.resolve(__dirname, "www")
        },

        module: {
            rules: [
                {
                    // Pictures
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                    use: 'file-loader'
                },
                {
                    // TypeScript
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader"
                    }
                },
                {
                    // Sass + CSS
                    test: /\.(s*)css$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                namedExport: true,
                                camelCase: "only",
                                modules: true,
                                localIdentName: "[local]"
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }
            ]
        },

        resolve: {
            extensions: [".tsx", ".ts", ".js", ".css", ".scss"],

            // NOTE: You should make an entry in tsconfig.json as well for each of these entries.
            alias: {
                "@Sass": path.resolve(__dirname, "src/sass/"),
                "@Fetcher": path.resolve(__dirname, "src/ts/Fetcher/"),
                "@Environment": path.resolve(__dirname, "src/ts/Environment/")
            },
        },

        devtool: "eval-source-map",

        devServer: {
            headers: { "Access-Control-Allow-Origin": "*" },
            host: webpackDevServerIP,
            port: webpackDevServerPort,
            hot: true,
            open: true,
            openPage: "index.html",
            inline: true,
            https: false
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),

            new HtmlWebpackPlugin({
                hash: true,
                filename: "index.html",
                template: __dirname + "/src/html/index.html",
                favicon: __dirname + "/assets/images/favicon.ico",
                environment: mode,
            }),

            // These variables are essentially #define's accessible in Typescript.
            // Go add a declaration for them in WebpackEnvironmentVariables.ts.
            new webpack.DefinePlugin(getWebpackEnvironmentVariables(mode)),

            // Ignore the changes in any auto-created d.ts files for TypeScript (like typings-for-css-loader makes).
            new webpack.WatchIgnorePlugin([/\.d\.ts$/])
        ],

        node: {
            fs: "empty"
        },
    };

    return config;
};

function getMode(argv) {
    let mode = "development";

    if (argv !== undefined && argv.mode !== undefined) {
        mode = argv.mode;
    }

    return mode;
}

// NOTE: All values in the returned map should likely be run through `JSON.stringify`.
//       This holds true EVEN if they are already strings. This is a `webpack.DefinePlugin` thing.
//
// From the docs (https://webpack.js.org/plugins/define-plugin/):
//      If the value is a string it will be used as a code fragment.
//      If the value isn't a string, it will be stringified (including functions).
//      If the value is an object all keys are defined the same way.
//      If you prefix typeof to the key, it's only defined for typeof calls.
function getWebpackEnvironmentVariables(mode) {
    let environmentVariableMap = {
        "Webpack.ENVIRONMENT": JSON.stringify(mode)
    };

    switch (mode) {
        case "development":
            environmentVariableMap['Webpack.CONFIG_SERVER_URL'] = JSON.stringify(webpackDevServerUrl);
            break;

        case "production":
            environmentVariableMap['Webpack.CONFIG_SERVER_URL'] = JSON.stringify(productionServerUrl);
            break;
    }

    return environmentVariableMap;
}

function buildUrl(ip, port, useHTTPS = false) {
    return `http${useHTTPS ? "s" : ""}://` + ip + ":" + port + "/";
}
