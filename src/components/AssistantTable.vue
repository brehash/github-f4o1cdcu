<template>
  <table>
    <thead>
      <tr><th>Extension</th><th>Engine</th><th>Model</th><th>Actions</th></tr>
    </thead>
    <tbody>
      <tr v-for="a in assistants" :key="a._id">
        <td>{{ a.extension }}</td>
        <td>{{ a.engine }}</td>
        <td>{{ a.model }}</td>
        <td>
          <router-link :to="`/assistants/${a._id}`">Edit</router-link>
          <button @click="$emit('delete', a._id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({ assistants: Array })
</script>
