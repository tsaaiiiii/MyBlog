import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "tsai",
  description: "12",
  base: "/MyBlog/",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  themeConfig: {
    siteTitle: "t",
    logo: "/logo.png",
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "Note",
        link: "/guide/test",
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
        },
        link: "...",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "前端",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "前端基础",
              link: "/frontend/index.md",
            },
            { text: "HTML", link: "/frontend/HTML" },
            { text: "CSS", link: "/frontend/CSS" },
          ],
        },
        {
          text: "javascript",
          collapsible: true,
          collapsed: true,
          items: [
            { text: "js 基础", link: "/frontend/javascript" },
            { text: "js 进阶", link: "/frontend/javascript2" },
          ],
        },
      ],
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Evan You",
    },
  },
});
