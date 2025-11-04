import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { firestore } from "../shared/firebase/firebase-firestore";
import { USERS_COLLECTION } from "../shared/firebase/firebase-config";

export const useUserStore = defineStore(
  "users",
  () => {
    // states
    const user = ref(null);
    const profileEmail = ref("");
    const profileFirstName = ref("");
    const profileLastName = ref("");
    const profileUsername = ref("");
    const profileId = ref("");
    const profileInitials = ref("");
    const isUserLogin = ref(false);
    const isAdmin = ref(false);

    // actions
    async function getProfileInfo(userUid: string) {
      if (!userUid) return;

      const docRef = doc(firestore, USERS_COLLECTION, userUid);
      const document = await getDoc(docRef);
      if (!document.exists()) return;

      setProfileId(document.data().uid);
      setProfileEmail(document.data().email);
      setFirstName(document.data().firstName);
      setLastName(document.data().lastName);
      setUsername(document.data().username);
      setUserLogin(true);
    }

    // mutations
    function setProfileId(payload: string) {
      profileId.value = payload;
    }

    function setProfileEmail(payload: string) {
      profileEmail.value = payload;
    }

    function setProfileInitials() {
      profileInitials.value =
        profileFirstName.value[0] + profileLastName.value[0];
    }

    function setUser(payload: any) {
      user.value = payload;
    }

    function setFirstName(payload: string) {
      profileFirstName.value = payload;
    }

    function setLastName(payload: string) {
      profileLastName.value = payload;
    }

    function setUsername(payload: string) {
      profileUsername.value = payload;
    }

    function setUserLogin(payload: boolean) {
      isUserLogin.value = payload;
    }

    function setIsAdmin(payload: boolean) {
      isAdmin.value = payload;
    }

    return {
      user,
      profileEmail,
      profileFirstName,
      profileLastName,
      profileUsername,
      profileId,
      profileInitials,
      isUserLogin,
      isAdmin,
      getProfileInfo,
      setProfileInitials,
      setUser,
      setFirstName,
      setLastName,
      setUsername,
      setUserLogin,
      setIsAdmin,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
