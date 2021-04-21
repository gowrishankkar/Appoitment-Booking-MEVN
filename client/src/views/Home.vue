<template>
  <v-container class="container">
    <v-flex>
      <v-row>
        <!--               timeZoneDateset.map((timezone) => {
                return timezone.name;
              }) -->
        <v-col cols="12" md="6">
          <v-autocomplete
            max-width="144"
            v-model="defaultTimezone"
            :items="timezoneList"
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

          :allowed-dates="getAllowedDates"
          elevation="15"
          next-icon="mdi-arrow-right"
          prev-icon=" mdi-arrow-left"
        ></v-date-picker>

        <!-- AM -->
        <div>
          <v-sheet elevation="10" rounded="xl">
            <v-sheet class="pa-1 primary text-right" dark rounded="t-xl"
              ><v-card-title>Available Slots</v-card-title>
            </v-sheet>

            <div class="pa-2 flexcard">
              <v-card-text>
                <v-chip-group
                  v-model="timeChip"
                  active-class="deep-purple accent-4 white--text"
                  column
                  @change="selectTime($event)"
                  
                >
                  <v-chip v-for="(slot,i ) in slots" :key="i">{{
                    slot
                  }}</v-chip>
                </v-chip-group>
              </v-card-text>
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
import { getTimeZones, rawTimeZones, timeZonesNames } from "@vvo/tzdb";
const timeZones = getTimeZones();
import { mapActions, mapState } from "vuex";

export default {
  name: "Booking",
  components: { Modal },
  props: {
    msg: String,
  },
  data() {
    return {
      timeChip:'',
      searchInput: "",
      timeZoneDateset: timeZones,
      userTimeZone : '',
      defaultTimezone: "America/Los_Angeles",
      picker: new Date().toISOString().substr(0, 10),
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      pickerDate: null,
      slotDates: [],
      freeSlots: {},
      slots: [],
      timeSelection: "",
      timezoneList : ["America/Los_Angeles", "Canada/Pacific", "Europe/Sarajevo", "	US/Michigan"] 

      
    };
  },

  methods: {
    ...mapActions(["getAllEvents", "createEvent", "getSlots"]),
    setTimeZone(timezone){
      console.log(timezone)
      this.userTimeZone = timezone;
      this.getFreeSlots(this.userTimeZone, this.picker)
    },
    getAllowedDates(val) {
      if (this.slotDates.indexOf(val) !== -1) {
        return true;
      } else {
        return false;
      }
      this.$forceUpdate();
    },
    selectTime(time){
      this.timeSelection = this.freeSlots[this.picker].slots[time]
        console.log('change', moment(this.timeSelection).format("DD-MM-YYYY hh:mm A"))
    },
    dateChange(date) {
      // console.log('date',date)
      this.timeChip=""
      this.slots = [];
      this.freeSlots[this.picker].slots.map((slot) => {
        this.slots.push(moment(slot).format("hh:mm A"));
      });
    },

    async getFreeSlots(timezone, date) {
      try {
        let payload = {
          date: date,
          timezone: timezone
        }
       await  this.getSlots(payload).then((response) => {
          // console.log("slots api", response);
          this.freeSlots = response;
          this.slotDates = Object.keys(response);
        });
      } catch (error) {
        console.log("error", error);
      }
    },

  },
  
  created(){
    console.log('picker', this.picker)
  },
  beforeUpdate(){
    this.picker = new Date().toISOString().substr(0, 10)
    // this.dateChange(this.picker)
  },
  watch: {
    picker(value){
      // console.log('picker', value)
    },
        pickerDate (newval,oldval) {
          this.slots = [];
          console.log('pickerDate', newval,oldval)
          this.picker= `${newval}-01`
          console.log('pickerDate',this.userTimeZone, this.picker)
          this.getFreeSlots(this.userTimeZone,  this.picker)
          this.dateChange(this.picker)
      // here you can check if month changed using newval and oldval
    },
    timeSelection(value) {
      // console.log("value", value);
      // this.fetchOtherEvents();
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
  width: 500px;
  height: 250px;
}

.flexcard .v-toolbar {
  flex: 0;
}

</style>


