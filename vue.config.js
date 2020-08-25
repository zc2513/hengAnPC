'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || '云平台' // 页面标题

const port = process.env.port || process.env.npm_config_port

module.exports = {
    publicPath: '/dev/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        after: require('./mock/mock-server.js')
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

        // svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // 去掉元素之间的空格
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
        // source-map
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial'
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // 将elementUI分割成一个单独的包
                                    priority: 20,
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'),
                                    minChunks: 3,
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    },
    css: {
        extract: false, // false表示开发环境,true表示生成环境
        sourceMap: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px-to-viewport')({
                        unitToConvert: 'px', // 需要转换的单位，默认为"px"
                        viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
                        viewportHeight: 1080, // 视窗的高度，对应的是我们设计稿的高度,我做的是大屏监控,高度就是1080
                        unitPrecision: 3, // 单位转换后保留的精度
                        propList: [ // 能转化为vw的属性列表
                            '*'
                        ],
                        viewportUnit: 'vw', // 希望使用的视口单位
                        fontViewportUnit: 'vw', // 字体使用的视口单位
                        selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
                        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
                        replace: true // 是否直接更换属性值，而不添加备用属性
                        // exclude: /(\/|\\)(node_modules)(\/|\\)/ // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                    })
                ]
            }
        }
    }
}
