import { Iro } from "./types.mts";
import posts from "./posts";

/**
 * VitePress 主题 Sakurairo 的配置文件
 */
export default {
    title: "Suk的主页",
    titleTemplate: "天命之子的Suk",
    description: "天命之子Suk的主页",
    favicon: '/res/favicon.png',
    cover: {
        avatar: '/res/avatar.png',
        signature: '天不老，情难绝',
        background: {
            random: true,
            desktop: 'https://t.alcy.cc/fj/',
            mobile: 'https://t.alcy.cc/mp/',
        }
    },
    nav: {
        icon: '/res/icon.png',
        links: [
            { title: '博客', url: 'https://imsuk.cn' },
        ]
    },
    search: {
        path: '/',
        param: 's',
    },
    social: {
        links: [
            {
                icon: 'github',
                link: 'https://github.com/Suk-ldev',
                name: 'GitHub'
            },
            {
                icon: 'bilibili',
                link: 'https://space.bilibili.com/1549763683',
                name: 'Bilibili'
            },
            {
                icon: 'dy',
                link: 'https://www.douyin.com/user/MS4wLjABAAAAx2NtxCxp3eSxmZ4__vHHVUe5Niot1CXJdNlIuNiIIz6YhgE90VnWRP3ehD0Bhe3l',
                name: 'Douyin'
            },
            {
                icon: 'tw',
                link: 'https://x.com/SukBlog21',
                name: 'X'
            },
            {
                icon: 'zhihu',
                link: 'https://www.zhihu.com/people/xu-ming-88-36',
                name: 'Zhihu'
            },
            {
                icon: 'tg',
                link: 'https://t.me/Suk_2',
                name: 'telegram'
            },
            {
                icon: 'mail',
                link: 'mailto:Suk_blog@qq.com',
                name: 'E-mail'
            },
        ]
    },
    footer: {
        content: ''
    },
    style: {
        themeSkin: '#8e78c6',
        themeSkinMatching: '#5892eb',
        themeSkinDark: '#211a39',

        menuRadius: '10px',
        menuSelectionRadius: '10px',
    },
    posts: posts
} satisfies Iro.Config;
