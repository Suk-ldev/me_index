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
            { title: '导航站', url: 'https://www.imsuk.cn' },
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
                icon: 'mail',
                link: 'mailto:Suk_blog@qq.com',
                name: 'E-mail'
            },
            {
                icon: 'tg',
                link: 'https://t.me/Suk_2',
                name: 'telegram'
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
