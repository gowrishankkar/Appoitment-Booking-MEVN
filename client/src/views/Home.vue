<template>
  <div class="home" data-app>
    <Booking  />
    <Modal />
  </div>
</template>

<script>
// @ is an alias to /src
import Booking from "@/components/Booking.vue";
import Modal from "@/components/modal.vue";

export default {
  name: "home",
  
  components: {
     Modal,Booking
  },
    data () {
    return {
      
    }
  },
  methods: {
     
    },
};
</script>
