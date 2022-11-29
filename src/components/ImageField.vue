<template>
  <div class="bg-white relative py-4" :class="{ rtl: isRtl }">
    <label class="input-label" :class="{ 'text-red-500': error }">{{
      field.label
    }}</label>
    <div
      class="mt-[2px] border-2 border-gray-300 border-dashed rounded-md relative"
    >
      <file-upload @file="uploadImage" class="w-full"></file-upload>
      <p class="text-sm text-red-500" v-if="error">
        {{ field.label }} cannot be empty
      </p>
      <div
        class="bg-gray-400 h-full absolute top-0 left-0 rounded-md w-full bg-opacity-30"
        v-if="uploading"
      >
        <div
          class="bg-al-massira-blue h-full opacity-30"
          :style="progress"
        ></div>
      </div>
    </div>
    <img
      v-if="modelValue != ''"
      :src="modelValue"
      class="mt-1 w-auto h-48 rounded-md"
    />
  </div>
</template>

<script lang="ts">
import FileUpload from "./FileUpload.vue";
import { ref, PropType, onMounted, inject } from "vue";
import { FieldSpec, ImageProvider } from "../Interfaces";
import axios from "axios";

export default {
  emits: ["update:modelValue"],

  props: {
    field: {
      type: Object as PropType<FieldSpec>,
      required: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
    error: {
      type: Object,
      required: false,
    },
    isNested: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    // This can be replaced with a fancier progress bar. This is updated in onFileProgress, which hooks to the requestObj onFileProgress event.
    const progress = ref("width:0%");
    const provider = props.field["provider"];
    const uploading = ref(false);
    const encryptedSecret = ref("");
    const timestamp = Math.round(new Date().getTime() / 1000);

    // This hooks to the requestObj onFileProgress event so that we can indicate upload progress.

    const onFileProgress = (event: any) => {
      progress.value =
        "width:" + Math.round((event.loaded * 100.0) / event.total) + "%";
    };

    const secret: string = provider?.secret ?? "";
    //Create the string to sign for cloudinary signed uploads
    const secretToSign =
      "tags=browser-upload&timestamp=" +
      timestamp +
      "&upload_preset=" +
      props.field["uploadPreset"] +
      secret;
    const buffer = new TextEncoder().encode(secretToSign);

    const encryptSecret = () => {
      crypto.subtle.digest("SHA-1", buffer).then((value) => {
        encryptedSecret.value = Array.from(new Uint8Array(value))
          .map((x) => x.toString(16).padStart(2, "0"))
          .join("");
      });
    };

    const uploadImage = (files: FileList) => {
      if (!provider) return;
      uploading.value = true;
      let formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", props.field["uploadPreset"] ?? "");
      formData.append("tags", "browser-upload");
      formData.append("api_key", provider["apiKey"]);
      formData.append("api_secret", provider["secret"]);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", encryptedSecret.value);

      const requestObj = {
        url:
          "https://api.cloudinary.com/v1_1/" +
          provider["cloudName"] +
          "/image/upload",
        method: "POST",
        onUploadProgress: onFileProgress,
        data: formData,
      };

      axios(requestObj)
        .then((response) => {
          progress.value = "width:0%";
          emit("update:modelValue", response.data.url);
          uploading.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    onMounted(encryptSecret);

    const store = inject<any>("store");

    const isRtl = store.state.languageDirection == "rtl" ? true : false;

    return {
      uploadImage,
      onFileProgress,
      progress,
      uploading,
      isRtl,
    };
  },
  components: { FileUpload },
};
</script>

<style></style>
