<template>
  <!-- MODAL CONTENT -->

  <div
    class="card"
  >
    <div class="">
      <div class="">
        <div
          class="card-header bg-dark bg-opacity-50 glass d-flex justify-content-center py-3"
        >
          <h5
            class="card-title text-black fw-bolder text-center"
            id="staticBackdropLiveLabel"
          >
            CREATE EVENT
          </h5>
        </div>
        <div class="card-body bg-white height-reduced overflow-y-scroll py-3">
          <p class="fw-bolder theme">
            <i class="fa-solid fa-circle-info"></i>
            <span class="text-black"> Event Details</span>
          </p>
          <form class="col-md-12 px-3 scrollspy" action="">
            <div class="form-group">
              <div class="alert alert-danger" v-if="message" role="alert">
                {{ message }}
              </div>
            </div>
            <!-- <div class="row px-3"> -->
            <div class="col-md-12 mb-3 m-auto">
              <label for="event_name" class="gray-3 fs-6"
                >Event Title<span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="input-theme"
                name="event_name"
                v-model="event_name"
              />
            </div>
            <div class="col-md-12 mb-3 m-auto">
              <label for="type" class="gray-3 fs-6"
                >Event Type<span class="text-danger">*</span>
              </label>
              <select
                class="input-theme"
                v-model="type"
                placeholder="Select Option..."
              >
                <option>free</option>
                <option>paid</option>
              </select>
            </div>
            <!-- </div> -->
            <!-- <div class="row m-auto"> -->
            <div class="col-md-12 mb-3 m-auto">
              <label for="date" class="gray-3 fs-6"
                >Event Date <span class="text-danger">*</span></label
              >
              <input type="date" v-model="event_date" class="input-theme" />
            </div>
            <div class="col-md-12 mb-3 m-auto">
              <label for="time" class="gray-3 fs-6"
                >Event Time <span class="text-danger">*</span></label
              >
              <input type="time" v-model="start_time" class="input-theme" />
            </div>
            <!-- </div> -->
            <div class="col-md-12 mb-3 m-auto">
              <label for="duration" class="gray-3 fs-6"
                >Seats Available <span class="text-danger">*</span></label
              >
              <input
                type="text"
                v-model="maximum_seats"
                class="input-theme"
              />
            </div>
            <div class="col-md-12 mb-3 m-auto">
              <label for="type" class="gray-3 fs-6"
                >Event Banner <i>(image only) </i>
                <span class="text-danger">*</span>
              </label>
              <input type="file" class="form-control input-theme" />
            </div>
            <div class="col-md-12 mb-3 m-auto">
              <label for="type" class="gray-3 fs-6"
                >Event Location
                <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control input-theme"
                v-model="location"
              />
            </div>
          </form>
        </div>
        <div
          class="modal-footer bg-dark bg-opacity-50 glass d-flex justify-content-center py-3"
        >
          <button type="button" class="button-danger" data-bs-dismiss="modal">
            CANCEL
          </button>
          <button
            type="button"
            class="button-theme"
            :disabled="loading"
            @click="onCreateEvent"
          >
            <!-- data-bs-dismiss="modal" -->
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm mx-2"
            ></span>
            <span> CREATE EVENT </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL END -->
</template>

<script>
import CreateEventMixins from "@/mixins/CreateEventMixins";
// import User from "@/models/user";
// import userService from '@/services/user.service';
import axiosInstance from "@/services/axiosInstance";
// import authHeader from "@/services/auth-header";

export default {
  name: "EventModal-vue",

  data() {
    return {
      // user: new User("", "", "", "", "", ""),
        event_name: "",
        type: "",
        event_date: "",
        start_time: "",
        maximum_seats: "",
        location: "",
      loading: false,
      message: "",
    };
  },

  methods: {

    onCreateEvent() {
      console.log(this.event_name, this.type)
      this.loading = true;
      let user = JSON.parse(localStorage.getItem("user"));
      let uid = JSON.parse(localStorage.getItem("uid"));
      

      const options = {
        method: "POST",
        url: "/api/event/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        data: {
          user_id: uid,
          event_name: this.event_name,
          location: this.location,
          event_date: this.event_date,
          type: this.type,
          status: 'active',
          start_time: this.start_time,
          maximun_seats: this.maximum_seats,
        },
      };

      axiosInstance
        .request(options)
        .then((response) => {
          console.log(response.data);
          if(response.data.status === 'Success'){
          this.$router.replace("/userpost");
          location.reload()
        }
      })
        .catch((error) => {
          console.error(error);
          // location.reload(false)
          window.stop()
          this.loading = false;
        });
    },
  },

  mixins: [CreateEventMixins],
};
</script>

<style scoped></style>
