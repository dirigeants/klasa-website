<template>
  <span class="docs-type-link">
    <span v-if="!link" :title="type[0] === '*' ? 'Any type' : null">{{ typeName }}</span><!--
  --><router-link :to="link" v-else-if="typeof link === 'object'">{{ typeName }}</router-link><!--
  --><a :href="link" v-else>{{ typeName }}</a><!--
  --><span v-if="type[1]">{{ type[1] }}</span>
  </span>
</template>

