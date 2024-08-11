import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "tsai",
  base: "/MyBlog/",
  description: "12",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  themeConfig: {
    siteTitle: "t",
    logo: "/logo.png",
    nav: [
      {
        text: "Project",
        link: "/project",
      },
      {
        text: "Note",
        link: "/note/index",
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
      "/note": [
        {
          text: "JavaScript",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "深拷貝與淺拷貝",
              link: "/note/javaScript/callByReference",
            },
          ],
        },
        {
          text: "Vue",
          collapsible: true,
          collapsed: true,
          items: [{ text: "Vite 與 CLI", link: "/note/vue/buildTool" }],
        },
      ],
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Evan You",
    },
  },
});
