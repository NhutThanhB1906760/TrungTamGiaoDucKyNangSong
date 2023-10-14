<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <va-select
      v-model="value"
      class="mb-6"
      label="'true' mode and single select"
      :options="options"
      :track-by="(option) => option.id"
      allow-create
      @create-new="addNewOption"
    />
  
      
    </div>
  </template>
  
  <script>
  export default {
    name: "AllowCreate",
    data() {
      return {
        options: [
          { id: "0", text: "tiếng anh", value: "tiếng anh" },
          { id: "1", text: "tin học", value: "tin học" },
          { id: "2", text: "three", value: "three" },
          { id: "3", text: "four", value: "four" },
          { id: "4", text: "five", value: "five" },
        ],
        value: "",
        allowUniqueValue: "",
        valueMultiple: [],
        allowUniqueValueMultiple: [],
      };
    },
    methods: {
      addNewOption(newOption) {
        const option = {
          id: String(this.options.length),
          text: newOption,
          value: newOption,
        };
        this.options = [...this.options, option];
      },
    },
  };
  </script>  