<template>
  <div
    class="w-full bg-white rounded-lg p-5 md:p-6 shadow-md space-y-4 border border-gray-200 mx-2 md:mx-12"
  >
    <div>
      <WeatherForm :busy="forecasterFetch" @submit="handleSubmit" />
      <div v-if="busy" class="flex items-center justify-center">
        <loading-icon />
      </div>
      <template v-else>
        <div v-if="items.length > 0">
          <div
            class="grid grid-cols-1 2xl:grid-cols-4 lg:grid-cols-2 gap-4 pt-4"
          >
            <WeatherCard
              v-for="(item, index) in paginatedItems"
              :key="index"
              :item="item"
            />
          </div>
          <Pagination
            :length="items.length"
            :page="page"
            @paginate="handlePaginate"
          />
        </div>
        <div v-else>
          <empty-state
            title="No Data Generated"
            description="There is no data generated for the location, try another location!"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '../Common/Pagination'
import EmptyState from '../Common/EmptyState'
import LoadingIcon from '../Common/Icons/LoadingIcon'
import WeatherCard from './components/WeatherCard'
import WeatherForm from './components/WeatherForm'
export default {
  components: { LoadingIcon, EmptyState, Pagination, WeatherForm, WeatherCard },
  props: {
    busy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    ...mapState('forecaster', ['forecasterFetch', 'items']),
    paginatedItems() {
      return this.items.slice((this.page - 1) * 10, this.page * 10)
    },
  },
  methods: {
    handleSubmit(e) {
      this.$emit('submit', e)
    },
    handlePaginate(e) {
      this.page = e
    },
  },
}
</script>
