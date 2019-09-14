<template>
  <aside class="shortkey-guide">
    <ul>
      <li v-for="(key, index) in keys" :key="index" class="key-item">
        <img :src="key.icon" :alt="key.label" class="key-icon" />
        <span class="key-label subtle">{{ key.label || markAsLabel }}</span>
      </li>
    </ul>
  </aside>
</template>

<script>
import navigateIcon from "@/assets/key-navigate.svg";
import newIcon from "@/assets/key-new.svg";
import completeIcon from "@/assets/key-space.svg";
import editIcon from "@/assets/key-edit.svg";
import deleteIcon from "@/assets/key-delete.svg";

export default {
  props: {
    completed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      keys: [
        { icon: navigateIcon, label: "Select task" },
        { icon: newIcon, label: "New task" },
        { icon: completeIcon },
        { icon: editIcon, label: "Edit task" },
        { icon: deleteIcon, label: "Delete selected" }
      ]
    };
  },
  computed: {
    markAsLabel() {
      return this.completed ? "Mark as not done" : "Mark as completed";
    }
  }
};
</script>

<style lang="scss" scoped>
.shortkey-guide {
  position: fixed;
  top: 2rem;
  right: 1rem;
  font-size: 0.75rem;
  user-select: none;
  pointer-events: none;
}
.key-item {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 0.8rem;
}
.key-icon {
  margin-right: 1rem;
}
.key-label {
  display: block;
  width: 110px;
}
</style>
