---
aside: false
---

<div class="home">
   <div class="home__personal-container">
     <img src="/image.jpg" class="home__personal-image"/>
   </div>
   <div class="home__intro">
     <p>Hi！我是 ting，歡迎來到我的筆記小天地！</p>
     <p>目前擔任前端工程師，主要使用 Vue 相關技術進行開發</p>
     <p>因對網頁開發產生興趣，透過線上課程自學，並於 2023 年參加培訓營後成功轉職為前端工程師。目前持續學習與精進技術中！</p>
   </div>
</div>

<style lang="scss">
.home {
   display: flex;
   gap: 50px;
   font-family: serif;
   align-items:center;
   @media (max-width: 512px){
    flex-wrap:wrap;
    justify-content:center;
    gap:0px;
   }

  &__personal-container{
    width: 150px;
    height: 150px;
    border-radius: 100%;
    overflow: hidden;
  }

  &__personal-image{
    position: relative;
    top: -110px;
    left: 60px;
    transform: scale(3.5, 3.5);
  }

  &__intro{
    width:70%;
    @media (max-width: 512px){
      width:100%;
    }
  }
}

</style>
