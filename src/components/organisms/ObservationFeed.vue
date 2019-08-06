<template>
  <div id="observation-feed">
    <pre class="bg-gray-400">
      <code class="text-indigo-800">
        {{ observationFeed }}
      </code>
    </pre>
  </div>
</template>

<script>
export default {
  name: 'ObservationFeed',
  props: [ 'observationFeed' ]
}
</script>

<style>

</style>
