<template>
  <div class="home">

    <Booking msg="Default Booking Template" />
    <v-btn elevation="2"></v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import Booking from "@/components/Booking.vue";

export default {
  name: "home",
  components: {
    Booking
  }
};
</script>
