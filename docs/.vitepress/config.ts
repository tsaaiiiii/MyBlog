import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "tsai",
  base: "/MyBlog/",
  description: "Ting's Blog",
  head: [["link", { rel: "icon", href: "/MyBlog/letter-t.png" }]],
  themeConfig: {
    siteTitle: "",
    logo: "/home.png",
    nav: [
      // {
      //   text: "Project",
      //   link: "/project",
      // },
      {
        text: "Note",
        link: "/note/index",
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/tsaaiiiii" }],
    sidebar: {
      "/note": [
        {
          text: "JavaScript",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "同步與非同步",
              link: "/note/javaScript/synchronous",
            },
            {
              text: "陣列與物件",
              link: "/note/javaScript/arrayAndObject",
            },
          ],
        },
        {
          text: "Vue",
          collapsible: true,
          collapsed: true,
          items: [
            { text: "Pinia 的兩種寫法", link: "/note/vue/pinia" },
            { text: "建立共用的 UI 組件", link: "/note/vue/component" },
            {
              text: "computed 與 watch",
              link: `/note/vue/computedAndWatch`,
            },
          ],
        },
        {
          text: "Deployment",
          collapsible: true,
          collapsed: true,
          items: [
            { text: "Github Actions", link: "/note/deployment/githubActions" },
          ],
        },
        {
          text: "Optimization",
          collapsible: true,
          collapsed: true,
          items: [{ text: "程式碼優化", link: "/note/optimization/code" }],
        },
      ],
    },
    footer: {
      message: " This site uses open-source libraries.",
      copyright: " © 2024 Ting. All rights reserved.",
    },
  },
});
