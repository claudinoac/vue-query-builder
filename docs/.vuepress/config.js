import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';

export default defineUserConfig({
    title: 'Vue Query Builder',
    theme: defaultTheme({
        locale: {
            '/': {
                lang: 'en-US',
                title: 'VuePress',
                description: 'A UI component for building complex queries with nested conditionals.',
                repo: 'dabernathy89/vue-query-builder',
                docsDir: 'docs',
                docsBranch: 'gh-pages',
                editLinks: true,
                sidebar: [
                    ['/', 'Introduction'],
                    ['/demos', 'Demos'],
                    ['/getting-started', 'Getting Started'],
                    ['/configuration', 'Configuration'],
                    ['/custom-templates', 'Custom Templates'],
                    ['/roadmap', 'Roadmap'],
                    ['/contributing', 'Contributing'],
                    ['/about', 'About'],
                ],
                nav: [],
            },
        },


    }),

    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             bootstrap: path.resolve(__dirname, 'node_modules/bootstrap'),
    //         }
    //     }
    // }

    // module.exports = {
    //   ...
    //   module: {
    //     rules: [{
    //       test: /\.less$/,
    //       loader: 'less-loader' // compiles Less to CSS
    //     }]
    //   }
    // };
});
