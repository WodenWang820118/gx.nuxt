<template>
  <!-- if user can navigate on the profile page, he/she must be logged in -->
  <navigation :isUserLogin="true" />
  <div class="profile">
    <modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      @close-modal="closeModal"
    />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ profileInitials }}</div>
        <div class="admin-badge">
          <img
            class="icon"
            src="../../assets/icons/user-crown-light.svg"
            alt=""
          />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="profileFirstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="profileLastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="profileUsername" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="profileEmail" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
  <footer-vue />
</template>

<script lang="ts">
import Navigation from "../../shared/components/navigation/navigation.vue";
import Footer from "../../shared/components/footer/footer.vue";
import Modal from "../../shared/components/modal/modal.vue";
import { useUserStore } from "../../stores/users";
import { ref, defineComponent, onBeforeMount } from "vue";
import { auth } from "../../shared/firebase/firebase-auth";
import { firestore } from "../../shared/firebase/firebase-firestore";
import { doc, updateDoc } from "firebase/firestore";
import { USERS_COLLECTION } from "../../shared/firebase/firebase-config";

export default defineComponent({
  name: "profile",
  components: {
    modal: Modal,
    navigation: Navigation,
    "footer-vue": Footer,
  },
  setup() {
    const store = useUserStore();
    const modalMessage = ref("Changes were saved");
    const modalActive = ref(false);
    const profileInitials = ref("");
    const profileFirstName = ref("");
    const profileLastName = ref("");
    const profileUsername = ref("");
    const profileEmail = ref("");

    function updateProfile() {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            await updateDoc(doc(firestore, USERS_COLLECTION, currentUser.uid), {
              firstName: profileFirstName.value,
              lastName: profileLastName.value,
              username: profileUsername.value,
            });
          } catch (error) {
            console.error(error);
            modalMessage.value = "An error occurred";
          } finally {
            modalActive.value = !modalActive.value;
          }
        }
      });
    }

    function closeModal() {
      modalActive.value = !modalActive.value;
    }

    function getProfileInfo() {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            await store.getProfileInfo(currentUser.uid);
            store.setUser(currentUser);
            store.setProfileInitials();
            profileInitials.value = store.profileInitials;
            profileFirstName.value = store.profileFirstName;
            profileLastName.value = store.profileLastName;
            profileUsername.value = store.profileUsername;
            profileEmail.value = store.profileEmail;
          } catch (error) {
            console.error(error);
          }
        }
      });
    }

    onBeforeMount(() => {
      getProfileInfo();
    });

    return {
      modalMessage,
      modalActive,
      profileInitials,
      profileFirstName,
      profileLastName,
      profileUsername,
      profileEmail,
      updateProfile,
      closeModal,
    };
  },
});
</script>
<style lang="scss" src="./profile.scss"></style>
