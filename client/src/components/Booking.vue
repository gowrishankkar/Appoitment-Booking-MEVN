<template>
  <v-container class="container" >
    <v-col class="d-flex" cols="12" sm="6">
      <v-select :items="timeZoneDateset" label="Outlined style"  :search-input.sync="searchInput" outlined></v-select>
    </v-col>
    <v-layout wrap>
      <v-flex row class="justify-space-around">
        <v-date-picker v-model="picker"></v-date-picker>

        <!-- AM -->
        <div >
          <v-card-title>AM</v-card-title>
          <v-card max-width="144" outlined height="40%" class="time-slot-card flexcard">
            <v-card-text>
              <v-chip-group
                v-model="timeSelection"
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip v-for="fruit in time" :key="fruit">{{ fruit }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </div>

        <!-- PM -->
        <div >
          <v-card-title>PM</v-card-title>
          <v-card max-width="144" outlined height="40%" class="time-slot-card flexcard">
            
            <v-card-text>
              <v-chip-group
                v-model="timeSelection"
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip v-for="fruit in time" :key="fruit">{{ fruit }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { getTimeZones, rawTimeZones, timeZonesNames } from "@vvo/tzdb";
const timeZones = getTimeZones();

export default {
  name: "Booking",
  props: {
    msg: String,
  },
  data() {
    return {
      searchInput: '',
      timeZoneDateset: timeZones,
      picker: new Date().toISOString().substr(0, 10),
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      time: [
        "12:00 AM",
        "12:30 AM",
        "1:00 AM",
        "1:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 AM",
        "2:30 AM",
        "3:00 AM",
        "3:30 AM",
        "4:00 PM",
        "4:30 PM",
        "5:00 PM",
        "5:30 PM",
      ],
      timeSelection: "",
    };
  },
  watch: {
    timeSelection(value) {
      console.log("value", value, timeZones);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.time-slot-card {

  overflow: scroll;
}

.flexcard {
  display: flex;
  flex-direction: column;
}

.flexcard .v-toolbar {
  flex: 0;
}

.container{
  height: 55%;
}

</style>
