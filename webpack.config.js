module.exports = {
    entry: './client/index.tsx',
    output: {
        path: __dirname + '/public',
        filename: './bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: require.resolve('ts-loader'),
                exclude: [/node_modules/, /test/]
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        historyApiFallback: true,
    },
    externals: {
        'config': JSON.stringify(process.env.ENV === 'production' 
                    ? require('./client/config.prod.json')
                    : require('./client/config.dev.json'))
    }
}