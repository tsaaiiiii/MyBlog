---
aside: false
---

<div class="project">
  <div class="project__container">
     <div class="project__project-frame">
     </div>
     <div class="project__project-frame">
     </div>
     <div class="project__project-frame">
     </div>
     <div class="project__project-frame">
     </div>
  </div>
</div>

<!-- The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button> -->

<script setup>
import { ref } from 'vue'

const count = ref(0)

</script>

<style lang="scss">
  .project{
    margin-top: 100px;

    &__container{
      display:flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    &__project-frame{
      width: 320px;
      height: 200px;
      border: solid 1px black;
      border-radius: 10px;
    }
  }

</style>
