<template>
  <div>
    <v-row class="">
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
    async getSelectedRange(dateRange) {
      if (dateRange.length == 2) {
        if (dateRange[0] > dateRange[1]) {
          let startInRange = dateRange[0];
          dateRange[0] = dateRange[1];
          dateRange[1] = startInRange;
        }
      }
      console.log('dateRange', dateRange)
      try {
        const payload = {
          startDate: dateRange[0],
          endDate: dateRange[1] ? dateRange[1] : dateRange[0],
        };
        await this.getEventsInRange(payload).then((response) => {
          response.map((event, index) => {
            event.date = moment(event.Date).format("DD-MM-YYYY");
            event.time = moment(event.Date).format("hh:mm A");
            event.rowIndex = index;
          });
          this.events = response;
        });
      } catch (error) {
        console.log("error", error);
      }
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


