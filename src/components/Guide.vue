<template>
  <aside class="shortkey-guide">
    <ul>
      <li v-for="(key, index) in keys" :key="index" class="key-item">
        <img :src="key.icon" :alt="key.label" class="key-icon" />
        <span class="key-label subtle">{{ key.label }}</span>
      </li>
    </ul>
  </aside>
</template>

<script>
import navigateIcon from "@/assets/key-navigate.svg";
import newIcon from "@/assets/key-new.svg";
import completeIcon from "@/assets/key-space.svg";
import editIcon from "@/assets/key-edit.svg";
import moveIcon from "@/assets/key-move.svg";
import deleteIcon from "@/assets/key-delete.svg";

export default {
  data() {
    return {
      keys: [
        { icon: navigateIcon, label: "Navigate" },
        { icon: newIcon, label: "New task" },
        { icon: completeIcon, label: "Mark as completed" },
        { icon: editIcon, label: "Edit task" },
        { icon: moveIcon, label: "Move task" },
        { icon: deleteIcon, label: "Delete selected" }
      ]
    };
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
