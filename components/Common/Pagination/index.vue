<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="bg-white px-4 py-3 flex flex-col md:flex-row flex-col-reverse items-center justify-between border-gray-200 sm:px-6"
  >
    <div
      class="sm:flex-1 sm:flex sm:items-center sm:justify-between pt-3 md:pt-0"
    >
      <div class="text-sm flex items-center text-gray-700 gap-1">
        <div>
          Showing
          <span class="font-medium">{{ currentPageMin }}</span>
          to
        </div>
        <div class="font-medium">
          {{ currentPageMax }}
        </div>
        <div>
          of
          <span class="font-medium">{{ length }}</span>
          results
        </div>
      </div>
      <div
        v-if="showLimiter"
        class="text-sm flex items-center text-gray-700 mt-2 md:mt-0"
      >
        <div>Rows per page:</div>
        <div class="w-20 mx-2">
          <form-select
            track-by="name"
            label="name"
            :searchable="false"
            :allow-empty="false"
            :value="value"
            :options="pageLimitItems"
            name="used"
            @input="(e) => $emit('input', e)"
          />
        </div>
      </div>
    </div>
    <div class="sm:flex-1 sm:flex sm:items-center sm:justify-end pt-2 md:pt-0">
      <nav
        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          :class="
            page === 1
              ? 'border-gray-200 text-gray-400'
              : 'text-gray-500 border-gray-300 hover:bg-gray-50'
          "
          :disabled="page === 1"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border bg-white text-sm font-medium"
          @click="$emit('paginate', page - 1)"
        >
          <span class="sr-only">Previous</span>
          <!-- Heroicon name: solid/chevron-left -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <template v-if="pages > 6">
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <button
            aria-current="page"
            :class="
              page === 1
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            :disabled="page === 1"
            class="cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="handleClick(1)"
          >
            1
          </button>
          <button
            :class="
              page === 2
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            :disabled="page === 2"
            class="hidden lg:block cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="handleClick(2)"
          >
            2
          </button>
          <button
            v-if="page === 3"
            :class="
              page === 3
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            :disabled="page === 3"
            class="hidden lg:block cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="handleClick(3)"
          >
            3
          </button>
          <span
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            ...
          </span>
          <span
            v-if="page > 3 && page < pages - 2"
            :class="
              page > 3 && page < pages - 2
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            class="hidden lg:block cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            {{ page }}
          </span>
          <span
            v-if="page > 3 && page < pages - 2"
            class="hidden lg:block relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            ...
          </span>
          <button
            v-if="page == pages - 2"
            :class="
              page == pages - 2
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            :disabled="page === pages - 2"
            class="hidden lg:block cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="handleClick(pages - 2)"
          >
            {{ pages - 2 }}
          </button>
          <button
            :class="
              page == pages - 1
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            :disabled="page === pages - 1"
            class="hidden lg:block cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="handleClick(pages - 1)"
          >
            {{ pages - 1 }}
          </button>
          <button
            :class="
              page == pages
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            :disabled="page === pages"
            class="cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="handleClick(pages)"
          >
            {{ pages }}
          </button>
        </template>
        <template v-else>
          <button
            v-for="item in pages"
            :key="item"
            :disabled="page === item"
            :class="
              page == item
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            "
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="handleClick(item)"
          >
            {{ item }}
          </button>
        </template>
        <button
          :class="
            page === pages
              ? 'border-gray-200 text-gray-400'
              : 'text-gray-500 border-gray-300 hover:bg-gray-50'
          "
          :disabled="page === pages"
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white text-sm font-medium text-gray"
          @click="$emit('paginate', page + 1)"
        >
          <span class="sr-only">Next</span>
          <!-- Heroicon name: solid/chevron-right -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import FormSelect from '@/components/Common/Inputs/FormSelect'
export default {
  components: { FormSelect },
  props: {
    length: {
      type: Number,
      default: 0,
    },
    showLimiter: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => {
        return {
          value: 10,
          name: '10',
        }
      },
    },
    pageLimitItems: {
      type: Array,
      default: () => [
        { value: 10, name: '10' },
        { value: 25, name: '25' },
        { value: 50, name: '50' },
        { value: 100, name: '100' },
      ],
    },
    limit: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.length / this.value.value)
    },
    currentPageMin() {
      return this.page === 1
        ? 1
        : this.page * this.value.value + 1 - this.value.value
    },
    currentPageMax() {
      return this.page < this.pages ? this.page * this.value.value : this.length
    },
  },
  methods: {
    handleClick(page) {
      this.$emit('paginate', page)
    },
  },
}
</script>
