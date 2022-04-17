<template>
  <div class="bg-white p-4">
    <Avatar
      :image-path="$auth.user.profile_picture"
      :image-class="'h-w-16 rounded-image-transform scale75'"
    >
      <template v-slot:add-content>
        <div class="inline-block pt-1">
          <span class="text-sm text-black font-semibold default-font">{{ $auth.user.full_name }} </span>
          <div class="text-tiny text-gray-600 default-font">
            Profile Completeness: 20%
          </div>
<!--          <ProfileCompleteness :progress-bar-class="'h-2 rounded-full bg-primarybuttoncolor w-1/5'" />-->
        </div>
      </template>
    </Avatar>
    <div class="py-3 p-8">
      <Button
        :title="'Edit My Profile'"
        :button-class="' py-2   font-semibold text-white  border w-full default-font  bg-blue-100'"
        :button-title-class="'text-center text-secondarybuttoncolor'"
        @click="editMyProfile()"
      />
    </div>
    <IconTextComponent
      :icon-path="$options.icons.uniMdiMapMarker"
      :icon-base-class="'icon-size-class'"
      :title-class="'size-font text-gray-600'"
      :content-class="'size-font text-black'"
      :title="'Current Address : '"
      :content="$auth.user.address || ''"
    />

    <IconTextComponent
      :icon-path="$options.icons.uniMdiCalendarMonthOutline"
      :icon-base-class="'icon-size-class'"
      :title-class="'size-font text-gray-600'"
      :content-class="'size-font text-black'"
      :title="'Age: '"
      :content="$auth.user.age || ''"
    />

    <IconTextComponent
      :icon-path="$options.icons.uniMdiEmailOutline"
      :icon-base-class="'icon-size-class'"
      :title-class="'size-font text-gray-600'"
      :content-class="'size-font text-black'"
      :title="'Email: '"
      :content="$auth.user.email || ''"
    />
    <IconTextComponent
      :icon-path="$options.icons.uniMdiMapMarker"
      :icon-base-class="'icon-size-class'"
      :title-class="'size-font text-gray-600'"
      :content-class="'size-font text-black'"
      :title="'Current Address : '"
      :content="''"
    />
    <IconTextComponent
      :icon-path="$options.icons.uniMdiEmailOutline"
      :icon-base-class="'icon-size-class'"
      :title-class="'size-font text-gray-600'"
      :content-class="'size-font text-black'"
      :title="'Email: '"
      :content="$auth.user.email || ''"
    />
    <div />
  </div>
</template>

<script>
import {
  uniMdiMapMarker, uniMdiCalendarMonthOutline, uniMdiEmailOutline
} from '../../icons'
import Avatar from '~/components/Common/Avatar.vue'
// import ProfileCompleteness from '~/components/EventFeed/ProfileCompleteness'
import Button from '~/components/Common/Button.vue'
 import IconTextComponent from '~/components/Common/IconTextComponent.vue'

export default {
  name: 'UserInfo',
  components: { IconTextComponent, Button, Avatar },
  icons: { uniMdiMapMarker, uniMdiCalendarMonthOutline, uniMdiEmailOutline },
  data () {
    return {

    }
  },
  computed: {
  },
  methods: {
    editMyProfile () {
      this.$router.push('/profile ')
    }
  }
}
</script>

<style scoped>

</style>
