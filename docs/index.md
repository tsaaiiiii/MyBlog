---
aside: false
---

<div class="home">
   <div class="home__personal-container">
     <img src="/MyBlog/image.jpg" class="home__personal-image"/>
   </div>
   <div>
     <p>HI！ Front-End Developer</p>
   </div>
</div>

<style lang="scss">
.home {
   display: flex;
   gap: 50px;
   font-family: serif;

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
}

</style>
