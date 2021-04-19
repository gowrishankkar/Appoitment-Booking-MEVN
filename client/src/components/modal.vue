<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Book On Selected Date
        </v-btn>
      </template>

      <v-card>
        <v-toolbar
              color="primary"
              dark
            >Book Appointment</v-toolbar>



        <v-card-text> provide </v-card-text>

        <v-col>
          <v-text-field label="Regular"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Regular"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Regular"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Regular"></v-text-field>
        </v-col>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
          <v-btn color="primary" text @click="dialog = false"> Book </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>