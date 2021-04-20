<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title range scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn
              text
              color="primary"
              @click="
                $refs.menu.save(date);
                getSelectedRange(date);
              "
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-container>
      <div>
        <v-data-table
          dense
          :headers="headers"
          :items="events"
          item-key="name"
          class="elevation-1"
        ></v-data-table>
      </div>
    </v-container>
  </div>
  <!-- <v-container class="container">
    <v-flex> -->

  <!-- </v-flex> -->

  <!-- <v-layout wrap>
 
    </v-layout>
  </v-container> -->
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {
  name: "Booking",
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      events: [],
      headers: [
        {
          text: "Index",
          align: "start",
          sortable: false,
          value: "rowIndex",
        },
        { text: "Name", value: "Name" },
        { text: "Email", value: "Email" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
      ],
    };
  },

  methods: {
    ...mapActions(["getAllEvents", "getEventsInRange"]),
    async getSelectedRange(date) {
      console.log("date", date);
      try {
        const payload = { startDate: date[0], endDate: date[1] };
        await this.getEventsInRange(payload).then((response) => {
          response.map((event, index) => {
            event.date = moment(event.Date).format("DD-MM-YYYY");
            event.time = moment(event.Date).format("hh:mm A");
            event.rowIndex = index;
          });
          console.log("yes getEventsInRange", response);
          this.events = response;
        });
      } catch (error) {
        console.log("error", error);
      }

      // this.fetchAllEvents();
    },
    async fetchAllEvents() {
      try {
        await this.getAllEvents().then((response) => {
          response.map((event, index) => {
            event.date = moment(event.Date).format("DD-MM-YYYY");
            event.time = moment(event.Date).format("hh:mm A");
            event.rowIndex = index;
          });
          this.$forceUpdate();
          console.log("yes", response);
          this.events = response;
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


