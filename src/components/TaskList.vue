<template>
  <section class="task-list">
    <ul>
      <li
        class="task-item"
        :class="{
          complete: task.complete,
          selected: index === selected
        }"
        v-for="(task, index) in tasks"
        :key="task.id"
        v-html="markdown(task.text)"
      ></li>
    </ul>
  </section>
</template>

<script>
import marked from "marked";

export default {
  props: {
    tasks: {
      type: Array,
      required: true
    },
    selected: {
      type: Number,
      required: false
    }
  },
  methods: {
    markdown(text) {
      return marked(text);
    }
  }
};
</script>

<style lang="scss" scoped>
.task-list {
  padding-top: 100px;
}
.task-item {
  list-style: none;
  line-height: 1.5;
  padding: 1.5rem 0.5rem;
  border-bottom: 1px solid var(--color-subtle-2);

  &.selected {
    background-color: var(--color-subtle-2);
  }

  &.complete {
    text-decoration: line-through;
  }
}
</style>
