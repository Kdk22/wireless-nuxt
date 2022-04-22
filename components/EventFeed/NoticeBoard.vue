<template>
  <div class=" container max-w-full bg-gray-200">
    <div class="flex flex-row">
      <div class=" md:w-2/7 my-8 lg:w-2/7 xl:w-2/7">
        <div class="mr-4  rounded-full">
          <UserInfo />
        </div>
      </div>
      <div class=" md:w-3/7 lg:w-3/7 xl:w-3/7">
        <div class="mx-4 mt-4 py-4">
          <input
            id="post"
            v-model="statusPost"
            class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
            type="text"
            :placeholder="`What's on your mind, ${$auth.user.full_name} ?`"
            @keyup.enter="submit()"
          >
        </div>
        <div
          v-for="(item, index) in postData"
          :key="index"
          class="mx-4 py-4 rounded-full "
        >
          <EventContent
            :post-content="item"
            @editPost="editPost(index)"
            @deletePost="deletePost(index)"
          />
          <div
            v-if="postData && postData.length-1 === index && nextPostUrl"
            class="flex flex-row justify-center my-4"
          >
            <svg
              class="spinner"
              width="60px"
              height="60px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
            >
              <circle
                class="spinner__circle"
                cx="50"
                cy="50"
                r="40"
                stroke="#999999"
                fill="none"
                stroke-width="8"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        class=" md:w-2/7  lg:w-2/7 xl:w-2/7"
      >
        <div class="my-8">
          <div class="pb-2">
            People You May Know
          </div>
          <div class="bg-white rounded">
<!--            <div v-for="(item, index) in peopleToFollow" :key="index">-->
<!--              <people-to-follow-list-->
<!--                :followed-by-me="followingList"-->
<!--                :user-to-follow="item"-->
<!--                @follow="follow(item)"-->
<!--                @unfollow="unFollow(item)"-->
<!--              />-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from '../../components/EventFeed/UserInfo.vue'
// import PeopleToFollowList from '~/components/EventFeed/PeopleToFollowList'
import EventContent from '../../components/EventFeed/EventContent.vue'

export default {
  name: 'NoticeBoard',
  components: {  UserInfo, EventContent },
  data () {
    return {
      statusPost: '',
      postData: [],
      nextPostUrl: 'users/post/',
      fadeInElements: [],
      peopleToFollow: [
      ],
      editPostId: null,
      followingList: [],
      followedUserDetail: {}
    }
  },
  computed: {

  },
  created () {
    // this.getPostData(this)
    // this.getRecommendedFollowList()
    // this.getFollowers()
  },
  mounted () {
    // const wrapper = document.getElementById('scroll-element')
    const self = this
    window.addEventListener('scroll', (event) => {
      const element = event.target
      const elemScrollPosition = element.scrollHeight - element.scrollTop - element.clientHeight
      console.log('elem scroll ', elemScrollPosition)
      if ((window.innerHeight + window.scrollY) >= element.body.offsetHeight) {
        if (self.nextPostUrl) {
          self.getPostData(self)
        }
      }
    })
  },
  methods: {
    submit () {
      let statusFormData = {}
      if (this.editPostId) {
        statusFormData = {
          content: this.statusPost
        }
      } else {
        statusFormData = {
          user: this.$auth.user.pk,
          content: this.statusPost
        }
      }
      if (this.editPostId) {
        this.$axios.$put(`users/post/${this.editPostId}/`, statusFormData)
          .then(() => {
            this.getPostData()
            this.statusPost = ''
            this.editPostId = null
          })
          .catch(() => {
            this.setNotifyMessage('Something went wrong.', 'red')
          })
      } else {
        this.$axios
          .$post('users/post/', statusFormData)
          .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
            console.log('data posted', response)
            this.getPostData()
            this.statusPost = ''
            this.editPostId = null
          // this.$router.push('/')
          })
          .catch((error) => {
            console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
          })
      }
    },
    async getPostData (self) {
      await self.$axios
        .$get(self.nextPostUrl)
        .then((response) => {
          // self.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // self.$router.push('/')
          self.nextPostUrl = response.next
          self.postData = self.postData.concat(response.results)
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },
    editPost (index) {
      this.editPostId = this.postData[index].pk
      this.statusPost = this.postData[index].content
      this.postData.splice(index, 1)
    },
    deletePost (index) {
      this.$axios.$delete(`users/post/${this.postData[index].pk}/`)
        .then(() => {
          // this.notifyMessage.display = false
          // this.setNotifyMessage({ message: 'Successfully delete sub category.', color: 'green' })
          this.getPostData()
        })
    },
    getFollowers () {
      this.$axios
        .get(`users/follow-un-follow/?source_user=${this.$auth.user.pk}`)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          this.followingList = response.data
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },
    follow (user) {
      const formData = {
        source_user: this.$auth.user.pk,
        target_user: user.pk
      }
      this.$axios
        .$post('users/follow-un-follow/', formData)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          this.followingList.push(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    unFollow (user) {
      const self = this
      const followedUserDetail = this.followingList.find(item => item.target_user === user.pk)
      this.$axios
        .$delete(`users/follow-un-follow/${followedUserDetail.id}`)
        .then(() => {
          const itemIndex = self.followingList.findIndex(item => item === followedUserDetail)
          self.followingList.splice(itemIndex, 1)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getRecommendedFollowList () {
      this.$axios
        .$get('users/users')
        .then((response) => {
          this.peopleToFollow = response.slice(0, 10)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.fade-in {
    opacity: 0;
    transition: 0.3s all ease-out;
    transform: scale(0.8);
    box-sizing: border-box;
  }
   .scrollbar-md {
  max-height: 450px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.scrollbar-md::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}
.scrollbar-md::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #d3d3d3;
}
  @keyframes spinning-circle {
  0% {
    stroke-dashoffset: 0;
    stroke-dasharray: 150.6, 100.4;
  }
  50% {
    stroke-dasharray: 1, 250;
  }
  100% {
    stroke-dashoffset: 502;
    stroke-dasharray: 150.6, 100.4;
  }
}

.spinner__circle {
  animation: 2s linear spinning-circle infinite;
}
</style>

