<template>
  <b-alert show>Sua busca por "{{ alertMessage }}", não retornou nenhum resultado.</b-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    alertMessage: {
      type: Number,
      required: true,
    },
  },
};
</script>
