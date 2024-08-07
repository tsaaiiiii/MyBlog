# Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>

<script setup>
import { ref } from 'vue'

const count = ref(0)

</script>

<style module>
.button {
  color: red;
  font-weight: bold;
  border: solid 1px black;
  width:100px;
  height:50px;
}
</style>
