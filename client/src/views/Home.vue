<template>
  <v-container class="container">
    <v-flex>
      <v-row>
        <v-col cols="12" md="5">
          <v-autocomplete
            max-width="144"
            v-model="defaultTimezone"
            item-text="name"
            item-value="name"
            :items="timeZoneDateset"
            @change="setTimeZone($event)"
            dense
            filled
            label="Timezone"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <Modal :timeChip="timeSelection" :timeZone="userTimeZone" />
        </v-col>
      </v-row>
    </v-flex>

    <v-layout wrap>
      <v-flex row class="justify-space-around">
        <v-date-picker
          ref="picker"
          v-model="picker"
          :picker-date.sync="pickerDate"
          @change="dateChange($event)"
          elevation="15"
          :min="presentDate"
          next-icon="mdi-arrow-right"
          prev-icon=" mdi-arrow-left"
        ></v-date-picker>

        <div class="slot-caontainer">
          <v-sheet elevation="10" rounded="xl">
            <v-sheet class="pa-1 primary text-right" dark rounded="t-xl"
              ><v-card-title>Available Slots</v-card-title>
            </v-sheet>
            <div class="flexcard" v-if="showSpinner">
              <v-flex>
                <v-progress-circular
                  class="ma-7 center"
                  :size="50"
                  color="primary"
                  indeterminate
                >
                </v-progress-circular>
              </v-flex>
            </div>

            <div class="pa-2 flexcard" v-if="!showSpinner">
              <v-card-text v-if="slots.length != 0">
                <v-chip-group
                  v-model="timeChip"
                  active-class="deep-purple accent-4 white--text"
                  column
                  @change="selectTime($event)"
                >
                  <v-chip v-for="(slot, i) in slots" :key="i">{{
                    slot
                  }}</v-chip>
                </v-chip-group>
              </v-card-text>
              <v-card-text v-else> No slots to show </v-card-text>
            </div>
          </v-sheet>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Modal from "@/components/modal.vue";
import moment from "moment";
import momenTZ from "moment-timezone";
import { getTimeZones, rawTimeZones, timeZonesNames } from "@vvo/tzdb";
const timeZones = getTimeZones();
import { mapActions, mapState } from "vuex";
import { DEFAULT_TIMEZONE } from '../components/config/constants';

export default {
  name: "Booking",
  components: { Modal },
  props: {
    msg: String,
  },
  data() {
    return {
      timeChip: "",
      searchInput: "",
      timeZoneDateset: timeZones,
      userTimeZone: "",
      defaultTimezone: DEFAULT_TIMEZONE,
      presentDate: new Date().toISOString().substr(0, 10),
      picker: '',
      pickerDate: null,
      slotDates: [],
      freeSlots: {},
      slots: [],
      timeSelection: "",
      showSpinner: false,
    };
  },

  methods: {
    ...mapActions(["getAllEvents", "createEvent", "getSlots"]),

    // Sets new timezone based on selection
    setTimeZone(timezone) {
      this.timeSelection = "";
      this.userTimeZone = timezone;
      this.slots = [];
      this.getFreeSlots(this.userTimeZone, this.picker);
      this.$forceUpdate();
    },

    // Returns true only for the dates to be enabled
    getAllowedDates(val) {
      if (this.slotDates.indexOf(val) !== -1) {
        return true;
      } else {
        return false;
      }
      this.$forceUpdate();
    },

    // Sets the selected slot
    selectTime(time) {
      
      this.timeSelection = this.freeSlots[time];
    },

    // Triggered during date change
    async dateChange(date) {
      this.slots = [];
      this.timeSelection = "";
      this.picker = date;
      this.getFreeSlots(this.userTimeZone, this.picker);
      this.timeChip = "";
    },

    // Fetch all the free slot for the selected month
    async getFreeSlots(timezone, date) {
      this.timeChip = "";
      this.showSpinner = true;
      let payload = {
        date: date,
        timezone: timezone,
      };
      await this.getSlots(payload).then((response) => {
        this.freeSlots = response;
        this.slots = [];
        response.map(async (slot) => {
          await this.slots.push(moment(slot).format("hh:mm A"));
        });

        this.showSpinner = false;
      });
      // this.dateChange(this.picker);
      this.$forceUpdate();
    },
  },
  
  mounted() {
    this.picker = this.presentDate;
    this.userTimeZone = this.defaultTimezone;
    this.getFreeSlots(this.userTimeZone, this.picker);
  },
  watch: {
    pickerDate(newval, oldval) {
      this.slots = [];
      this.timeSelection = "";
      // this.picker = `${newval}-01`;
     
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time-slot-card {
  overflow: scroll;
}

.flexcard {
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 250px;
}

.slot-caontainer {
  padding: 1rem;
}

@media (max-width: 769px) {
  .flexcard {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 250px;
    padding: 1rem;
  }
}

.flexcard .v-toolbar {
  flex: 0;
}
</style>


