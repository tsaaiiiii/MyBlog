import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "tsai",
  base: "/MyBlog/",
  description: "12",
  head: [["link", { rel: "icon", href: "/letter-t.png" }]],
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
              text: "深拷貝與淺拷貝",
              link: "/note/javaScript/callByReference",
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
            { text: "Pinia 的兩種使用", link: "/note/vue/pinia" },
            { text: "響應式原理", link: "/note/vue/reactivity" },
            {
              text: "Vite 與 Webpack",
              link: `/note/vue/webpackAndVite`,
            },
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
        {
          text: "Achitecture",
          collapsible: true,
          collapsed: true,
          items: [{ text: "Monorepo", link: "/note/achitecture/monorepo" }],
        },
      ],
    },
    footer: {
      message: " This site uses open-source libraries.",
      copyright: " © 2024 Yun Ting. All rights reserved.",
    },
  },
});
