import { Iro } from "./types.mts";

/**
 * 个人主页配置入口。
 *
 * 常用开关：
 * - home.showPostList：是否在首页封面下显示文章列表
 * - home.showContent：是否显示 index.md 里封面之后的内容
 * - features.cherryBlossom：是否开启樱花飘落动画
 */
const randomWallpaperApi = 'https://api.imsuk.cn/RandomImg';
const randomSignatureApi = 'https://api.imsuk.cn/hitokoto/index.php';

export default {
    title: "Suk的主页",
    titleTemplate: "",
    description: "天命之子Suk的主页",
    favicon: '/res/favicon.png',
    home: {
        showContent: false,
        showPostList: true,
        postListTitle: '文章',
    },
    features: {
        cherryBlossom: true,
    },
    cover: {
        avatar: '/res/avatar.png',
        signature: '',
        signatureApi: randomSignatureApi,
        background: {
            random: true,
            desktop: randomWallpaperApi,
            mobile: randomWallpaperApi,
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
        iconUrl: 'https://s.nmxc.ltd/sakurairo_vision/@3.0/display_icon/',
        iconPkg: 'fluent_design',
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
        enabled: false,
        content: ''
    },
    style: {
        themeSkin: '#8e78c6',
        themeSkinMatching: '#5892eb',
        themeSkinDark: '#211a39',

        menuRadius: '10px',
        menuSelectionRadius: '10px',
    },
    posts: []
} satisfies Iro.Config;
