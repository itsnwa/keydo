<template>
  <div id="app">
    <Logo />
    <Guide />
    <main
      class="main"
      :class="{ center: tasks.length < 1 || addNewActive || editActive }"
    >
      <h1 v-if="tasks.length < 1 && !addNewActive">
        Add your first task by hitting "/" on your keyboard.
      </h1>
      <TaskList
        v-if="tasks.length > 0 && !addNewActive && !editActive"
        :tasks="tasks"
        :selected="selectedTask"
      />
      <div class="input-wrapper" v-if="addNewActive">
        <input
          type="text"
          v-model="newTaskText"
          @keyup.enter.prevent.stop="addTask"
          placeholder="Add new task"
          ref="newTaskInput"
        />
      </div>
      <div class="input-wrapper" v-if="editActive">
        <input
          type="text"
          v-model="editTaskText"
          @keyup.enter.prevent.stop="updateTask"
          ref="editTaskInput"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { db } from "./db";
import Logo from "@/components/Logo";
import Guide from "@/components/Guide";
import TaskList from "@/components/TaskList";

export default {
  name: "app",
  components: {
    Logo,
    Guide,
    TaskList
  },
  data() {
    return {
      addNewActive: false,
      newTaskText: "",
      tasks: [],
      selectedTask: null,
      editActive: false,
      editTaskText: ""
    };
  },
  methods: {
    handleKeyUp(event) {
      if (this.editActive || this.addNewActive) {
        if (event.keyCode === 27) {
          this.editActive = false;
          this.addNewActive = false;
          this.newTaskText = "";
          this.editTaskText = "";
        } else {
          return;
        }
      }

      // New task ("/")
      if (event.keyCode === 191) {
        this.addNewActive = !this.addNewActive;
        this.$nextTick(() => {
          this.$refs.newTaskInput.focus();
          this.newTaskText = "";
        });
      }

      // Toggle completed ("space")
      if (event.keyCode === 32 && this.selectedTask != null) {
        const task = this.tasks[this.selectedTask];
        db.collection("tasks")
          .doc(task.id)
          .update({
            complete: !task.complete
          });
      }

      // Select Up
      if (event.keyCode === 38) {
        if (this.selectedTask && this.selectedTask >= 1) {
          this.selectedTask += -1;
        } else {
          this.selectedTask = 0;
        }
      }

      // Select Down
      if (event.keyCode === 40) {
        if (!this.selectedTask && this.selectedTask != 0) {
          this.selectedTask = 0;
        } else if (this.selectedTask < this.tasks.length - 1) {
          this.selectedTask++;
        }
      }

      // Edit (Enter)
      if (event.keyCode === 13 && this.selectedTask != null) {
        const task = this.tasks[this.selectedTask];
        this.editTaskText = task.title;
        this.editActive = true;
        this.$nextTick(() => {
          this.$refs.editTaskInput.focus();
        });
      }

      // Delete (Backspace, make sure it works with delete key as well)
      if (event.keyCode === 8) {
        this.deleteTask();
      }
    },
    addTask() {
      db.collection("tasks").add({
        title: this.newTaskText,
        complete: false,
        date_added: new Date()
      });
      this.addNewActive = false;
      this.newTaskText = "";
    },
    updateTask() {
      const task = this.tasks[this.selectedTask];
      db.collection("tasks")
        .doc(task.id)
        .update({
          title: this.editTaskText
        });
      this.editActive = false;
    },
    moveTask() {},
    deleteTask() {
      const task = this.tasks[this.selectedTask];
      db.collection("tasks")
        .doc(task.id)
        .delete();
    }
  },
  firestore: {
    tasks: db.collection("tasks")
  },
  created: function() {
    window.addEventListener("keyup", this.handleKeyUp);
  },
  beforeDestroy: function() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }
};
</script>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");

:root {
  --color-bg: #161616;
  --color-text: #fff;
  --color-subtle: #4e4e4e;
  --color-subtle-2: #1d1d1d;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  font-family: "Inter", sans-serif;
}

@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  margin: 0;
}

.main {
  width: 600px;
  max-width: 90%;
  min-height: 100vh;
  margin: 0 auto;
  &.center {
    display: flex;
    align-items: center;
  }
}

.subtle {
  color: var(--color-subtle);
}

ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}

.input-wrapper {
  width: 100%;
}

input {
  width: 100%;
  background: transparent;
  color: var(--color-text);
  font-size: 2rem;
  padding: 1rem 0.5rem;
  border: 0;
  border-bottom: 2px solid var(--color-subtle);
  outline: none;
  transition: border 0.15s ease;
  &:focus {
    border-bottom: 2px solid var(--color-text);
  }
}
</style>
