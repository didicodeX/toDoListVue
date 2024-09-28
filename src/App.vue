<template>
  <Layout>
    <!-- Remplacer le v-slot par le # -->
    <template #header> En tete</template>
    <template v-slot:aside> Sidebar</template>
    <template v-slot:main> Main</template>
    <template v-slot:footer> Footer</template>
  </Layout>
  <form action="" @submit.prevent="addTodo">
    <div class="input-box">
      <input type="text" placeholder="Entrer une tache" v-model="newTodo" />
      <button type="submit" :disabled="newTodo.trim().length === 0">Add</button>
    </div>

    <div v-if="todos.length === 0">Vous n'avez pas de tache a faire :(</div>
    <div v-else>
      <label>
        <input type="checkbox" v-model="hideCompleted" />
        Masquer les taches complete
      </label>
      <p>
        {{ remainingTodos }} tache{{ remainingTodos > 1 ? "s" : "" }} a faire
      </p>
      <ul>
        <li v-for="todo in sortTodo" :key="todo.id">
          <!-- J'ai remplacer par le composant checkbox -->
          <!-- 
          <input
            type="checkbox"
            :id="todo.id"
            v-model="todo.completed"
            :class="{ completed: todo.completed }"
          />
          <label :class="{ completed: todo.completed }" :for="todo.id">
            {{ todo.title }}</label
          >
           -->
          <Checkbox
            :label="todo.title"
            @check="console.log('coche')"
            @uncheck="console.log('decoche')"
          />
        </li>
      </ul>
    </div>
  </form>
  <Checkbox label="Bonjour" />
  <Button>AZEAZEA</Button>
  <input type="text"> Temps ecoule : {{ timer }}
</template>

<script setup>
import { ref, computed } from "vue";
import Checkbox from "./Checkbox.vue";
import Button from "./Button.vue";
import Layout from "./Layout.vue";
import { useTimer } from "./compasable/useTimer";

const newTodo = ref("");
const todos = ref([
  // {
  //   title: "Tache de test",
  //   completed: true,
  //   id: Math.floor(Math.random() * 100000000),
  // },
  // {
  //   title: "Tache a faire",
  //   completed: false,
  //   id: Math.floor(Math.random() * 100000000),
  // },
]);
const hideCompleted = ref(false);
// let taskName = ref("");
// let task = ref({
//   title: "Tache a faire",
//   complete: false,
//   date: Date.now(),
// });
const addTodo = () => {
  todos.value.push({
    title: newTodo.value,
    completed: false,
    date: Date.now(),
    id: Math.floor(Math.random() * 100000000),
  });
  newTodo.value = "";
};

const sortTodo = computed(() => {
  console.log("demo");

  const sortTodo = todos.value.toSorted((a, b) =>
    a.completed > b.completed ? 1 : -1
  );

  if (hideCompleted.value === true) {
    return sortTodo.filter((t) => t.completed === false);
  }
  return sortTodo;
});

const remainingTodos = computed(() => {
  return todos.value.filter((t) => t.completed === false).length;
});


const timer = useTimer();
</script>

<style scoped>
.input-box {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  /* max-width: 600px; */
  /* font-size: 19px; */
  justify-content: center;
  /* height: 100px; */
}

button {
  font-size: 19px;
  height: 50px;
  width: 100px;
  align-self: center;
}

li {
  display: flex;
  gap: 10px;
}

.completed {
  text-decoration: line-through;
  opacity: 0.5;
}

label {
  cursor: pointer;
}
</style>

<!-- Incompris -->

<!-- 
v-model
ref 
computed
-->
