<template>
  <div class="text-center">
    <v-dialog v-model="dialog"  width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          class="ma-4"
          :disabled="!isTimeSelected"
          :class="{ disableColor: !isTimeSelected }"
        >
          Book On Selected Date
        </v-btn>
      </template>

      <v-card v-if="dialog">
        <v-toolbar color="primary" dark>Book Appointment</v-toolbar>
        <v-flex row class="justify-space-between ma-4">
          <h4>{{ selectedTime }}</h4>
          <h4>{{ selectedDate }}</h4>
        </v-flex>

        <form class="pa-5">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>

          <v-btn class="mr-4" @click="submit"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </v-card>
    </v-dialog>
    <div class="text-center">
      <v-snackbar v-model="showSnackbar">
        {{ snackBarText }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  props: ["timeChip", "timeZone"],

  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
  },

  watch: {
    timeChip(selectedDateTime) {
      this.selectedTime = moment(selectedDateTime).format("hh:mm A");
      this.selectedDate = moment(selectedDateTime).format("ddd, DD MMMM YYYY");
      if (selectedDateTime) {
        this.isTimeSelected = true;
      } else {
        this.isTimeSelected = false;
      }
    },
    timeZone(selectedDateTime) {
      if (selectedDateTime) {
        this.isTimeZoneSelected = true;
      } else {
        this.isTimeZoneSelected = false;
      }
    },
  },
  data() {
    return {
      isTimeSelected: false,
      isTimeZoneSelected: false,
      dialog: false,
      name: "",
      email: "",
      showSnackbar: false,
      snackBarText: ``,
      selectedDate: "",
      selectedTime: "",
    };
  },

  methods: {
    ...mapActions(["createEvent"]),
    submit() {
      console.log(this.timeChip, "body");
      const V = this.$v;
      this.$v.$touch();

      if (!V.$error) {
        this.createEventFn(this.name, this.email);
      } else {
        this.showToaster("Please enter valid form details");
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
    },
    async createEventFn(name, email) {
      let body = {
        Date: moment(this.timeChip).format(),
        Timezone: this.timeZone,
        Name: name,
        Email: email,
      };
      console.log(this.timeChip, "body", body);
      try {
        await this.createEvent(body).then((response) => {
          console.log("post yes", response);
          this.dialog = false;
          this.$parent.getFreeSlots(this.timeZone, this.timeChip);
          this.clear();
          this.showToaster(response.data.message);
        });
      } catch (error) {
        console.log("post asdaerrors", error.response);
        this.showToaster(error.response);
      }
    },
    showToaster(msg) {
      this.showSnackbar = true;
      this.snackBarText = msg;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 3000);
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
};
</script>

<style scoped>
::v-deep .theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgb(209, 207, 207) !important;
}
</style>