<template>
  <div
    class="relative flex flex-col rounded-2xl border border-gray-200 bg-white px-4 py-4 md:p-8 shadow-sm"
  >
    <div class="flex-1">
      <h3
        class="text-center md:text-left md:text-xl font-semibold text-gray-900"
      >
        {{ generateStringDate(item.dt_txt) }}
      </h3>
      <div
        class="flex flex-col md:flex-row items-center justify-center md:pt-4 md:gap-4"
      >
        <div>
          <p class="flex items-baseline text-gray-900">
            <span class="text-6xl font-bold tracking-tight"
              >{{ item.main.temp }}°</span
            >
            <span class="ml-1 text-xl font-semibold">C</span>
          </p>
        </div>
        <div>
          <p class="flex items-baseline text-gray-900">
            <span class="text-lg md:text-xl font-bold tracking-tight"
              >{{ item.main.temp_max }}°</span
            >
            <span class="ml-1 text-lg font-semibold">C</span>
            <span
              class="ml-2 text-xs text-red-600 font-bold p-1 bg-red-100 rounded-md"
              >MAX</span
            >
          </p>
          <p class="flex items-baseline text-gray-900">
            <span class="text-lg md:text-xl font-bold tracking-tight"
              >{{ item.main.temp_min }}°</span
            >
            <span class="ml-1 text-lg font-semibold">C</span>
            <span
              class="ml-2 text-xs text-green-600 font-bold p-1 bg-green-100 rounded-md"
              >MIN</span
            >
          </p>
        </div>
      </div>
      <p class="mt-2 text-gray-500 uppercase text-center md:text-left">
        {{ getWeatherDescription(item.weather) }}
      </p>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    generateStringDate(e) {
      return format(new Date(e), 'MMMM dd, yyyy hh:mm aa')
    },
    getWeatherDescription(e) {
      return e.length > 0
        ? e[0].description
        : 'No weather data description available'
    },
  },
}
</script>
