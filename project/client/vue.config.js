module.exports = {
    // publicPath:'./',
    devServer: {
        proxy: {
            '/server': {
                target: "http://192.168.1.108:3000/api",
                // target: "http://localhost:1024/api",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/server": '/'
                }
            }
        }
    }
}