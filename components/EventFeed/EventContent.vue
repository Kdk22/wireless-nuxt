<template>
  <div v-if="postContent.user_details" class="fade-in bg-white shadow-xl">
    <div class="pl-4 ">
      <div class="flex flex-row">
        <Avatar
          :image-path="'profile.jpg'"
          :image-class="'h-w-16 rounded-image-transform scale75'"
        />
        <div class="inline-block px-4">
          <div class="text-tiny text-black pt-2">
            <span class="font-semibold default-font ">{{ postContent.user_details.full_name }}</span> has updated the status.
          </div>
          <div class="text-sm text-gray-600 ">
            {{ humanizeTime(postContent.modified_at) === 'Just Now' ? `${humanizeTime(postContent.modified_at)} `: `${humanizeTime(postContent.modified_at)} ago ` }}
            <Button
              v-if="postContent.user_details.pk === $auth.user.pk"
              :icon="$options.icons.mdiEdit"
              :button-class="'border-none text-gray-600 pt-1 pb-2 hover:text-gray-500 px-3'"
              :icon-class="'fill-current w-4 h-4 '"
              :icon-view-box="'0,-5,24,24'"
              @click="$emit('editPost')"
            />
            <Button
              v-if="postContent.user_details.pk === $auth.user.pk"
              :icon="$options.icons.mdiDelete"
              :button-class="'border-none text-gray-600 pt-1 pb-2 hover:text-gray-500'"
              :icon-class="'fill-current w-4 h-4 '"
              :icon-view-box="'0,-5,24,24'"
              @click="$emit('deletePost')"
            />
          </div>
        </div>
      </div>
      <div class="text-tiny default-font">
        {{ postContent.content }}
      </div>
      <div class="flex flex-row justify-end pt-5 pb-2 px-2">
        <div class="inline-block px-2">
          <Button
            :icon="$options.icons.uniMdiLike"
            :button-class="postLiked ? 'border-none text-blue-600  hover:text-blue-500':'border-none text-gray-600  hover:text-gray-500'"
            :icon-class="'fill-current w-6 h-6 '"
            @click="likeToggle"
          />
          <span class="text-sm text-gray-500 align-top mb-6"> {{ postDetails.liking_users ? postDetails.liking_users.length:'0' }} </span>
        </div>

        <div class="inline-block px-2">
          <Button
            :icon="$options.icons.uniMdiComment"
            :button-class="' border-none text-gray-600 hover:text-gray-500'"
            :icon-class="'fill-current w-6 h-6 '"
            @click="addComment()"
          />
          <span class="text-sm align-top text-gray-500">
            {{ commentData.length }}
          </span>
        </div>
        <div class="inline-block px-2">
          <Button
            :icon="$options.icons.uniMdiShare"
            :button-class="' border-none text-gray-600 hover:text-gray-500'"
            :icon-class="'fill-current w-6 h-6 '"
          />
          <span class="text-sm align-top text-gray-500" />
        </div>
      </div>
      <div v-if="showComment" class="w-full pr-4 py-2">
        <input
          v-model="commentPost"
          type="text"
          placeholder="Your Comment Here"
          class="appearance-none w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-300"
          name="message"
          @keyup.enter="submitComment()"
        >
        <transition-group name="list" tag="div">
          <div
            v-for="(comment, index) in commentData"
            :key="`${index}-ec`"
            class="py-1 px-2 "
          >
            <span class="text-tiny default-font box-declaration pt-2 pb-1">
              {{ comment.comment }}
            </span>
            <span class="text-sm text-gray-600 default-font px-2"> {{ humanizeTime(comment.modified_at) === 'Just Now' ? `${humanizeTime(comment.modified_at)} `: `${humanizeTime(comment.modified_at)} ago ` }}
            </span>
            <Button
              :icon="$options.icons.uniMdiLike"
              :button-class="'border-none text-gray-600 pt-1 pb-2 hover:text-gray-500 pl-2'"
              :icon-class="'fill-current w-4 h-4 '"
              :icon-view-box="'0,-5,24,24'"
              @click="likeToggle"
            />
            <Button
              :button-class="'border-none text-gray-600 hover:text-gray-500'"
              :title="'4'"
              :button-title-class="'text-tiny default-font pb-6 pr-4'"
              @click="commentLikedUsers"
            />
            <Button
              :icon="$options.icons.mdiMessageReply"
              :button-class="'border-none text-gray-600 pt-1 pb-2 hover:text-gray-500 '"
              :icon-class="'fill-current w-4 h-4 '"
              :icon-view-box="'0,-5,24,24'"
              @click="likeToggle"
            />
            <Button
              :button-class="'border-none text-gray-600 hover:text-gray-500'"
              :title="'4'"
              :button-title-class="'text-tiny default-font pb-6'"
              @click="commentReplyUsers"
            />
            <Button
              v-if="comment.user === $auth.user.pk"
              :icon="$options.icons.mdiEdit"
              :button-class="'border-none text-gray-600 pt-1 pb-2 hover:text-gray-500 px-3'"
              :icon-class="'fill-current w-4 h-4 '"
              :icon-view-box="'0,-5,24,24'"
              @click="editComment(index)"
            />
            <Button
              v-if="comment.user === $auth.user.pk"
              :icon="$options.icons.mdiDelete"
              :button-class="'border-none text-gray-600 pt-1 pb-2 hover:text-gray-500'"
              :icon-class="'fill-current w-4 h-4 '"
              :icon-view-box="'0,-5,24,24'"
              @click="deleteComment(comment.pk)"
            />
            <div v-if="index < commentData.length -1" class="w-full mt-1 border-1/2 block border-gray-400" />
          </div>
        </transition-group>
        <div />
      </div>
    </div>
  </div>
</template>

<script>
import { uniMdiComment, uniMdiLike, uniMdiShare, mdiMessageReply, mdiEdit, mdiDelete } from '../../icons'
import Avatar from '~/components/Common/Avatar.vue'
import Button from '~/components/Common/Button.vue'

export default {
  name: 'EevntContent',
  components: { Button, Avatar },
  props: {
    postContent: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  icons: { uniMdiComment, uniMdiLike, uniMdiShare, mdiMessageReply, mdiEdit, mdiDelete },
  data () {
    return {
      showComment: false,
      postDetails: {},
      commentPost: '',
      commentData: '',
      editCommentId: null
    }
  },
  computed: {
    postLiked () {
      if (this.postDetails.liking_users) {
        const liked = this.postDetails.liking_users.find(item => item === this.$auth.user.pk)
        if (liked) {
          return true
        }
      }
      return false
    }
  },
  mounted () {
    this.fadeInElements = Array.from(document.getElementsByClassName('fade-in'))
    document.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
    this.handleScroll()
    this.getLikes()
    this.getComments()
  },
  unmounted () {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      for (const i in this.fadeInElements) {
        const elem = this.fadeInElements[i]
        if (this.isElemVisible(elem)) {
          elem.style.opacity = '1'
          elem.style.transform = 'scale(1)'
          // this.fadeInElements.splice(i, 1) // only allow it to run once
        }
      }
    },
    isElemVisible (el) {
      const rect = el.getBoundingClientRect()
      const elemTop = rect.top + 200 // 200 = buffer
      const elemBottom = rect.bottom
      return elemTop < window.innerHeight && elemBottom >= 0
    },
    humanizeTime (absoluteTime) {
      let timeDelta = (new Date() - new Date(absoluteTime)) / 1000
      let string = ''
      if (timeDelta < 60) {
        return 'Just Now'
      }
      const days = Math.floor(timeDelta / 86400)
      timeDelta -= days * 86400
      const hours = Math.floor(timeDelta / 3600) % 24
      timeDelta -= hours * 3600
      const minutes = Math.floor(timeDelta / 60) % 60
      timeDelta -= minutes * 60
      string += days ? `${days} days ` : ''
      string += hours ? `${hours} hours ` : ''
      string += minutes ? `${minutes} minutes ` : ''
      return string
    },
    addComment () {
      this.showComment = !this.showComment
      this.getComments()
    },
    getLikes () {
      this.$axios
        .$get(`users/post/${this.postContent.pk}`)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.postDetails = response
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },
    deleteComment (commentId) {
      this.$axios
        .$delete(`users/comment/${commentId}`)
        .then(() => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          // console.log('data posted', response)
          // this.$router.push('/')
          // this.likesList = response
          this.getComments()
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },
    likeToggle () {
      const self = this
      if (!this.postLiked) {
        this.$axios
          .$post(`users/post/${this.postContent.pk}/like_post/`)
          .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
            console.log('data posted', response)
            // this.$router.push('/')
            self.postDetails.liking_users = response[0].liking_users
          })
          .catch((error) => {
            console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
          })
      } else {
        this.$axios
          .$post(`users/post/${this.postContent.pk}/unlike_post/`)
          .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
            console.log('data posted', response)
            // this.$router.push('/')
            self.postDetails.liking_users = response[0].liking_users
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

    submitComment () {
      let postData = ''
      if (this.editCommentId) {
        postData = {
          comment: this.commentPost,
          post: this.postContent.pk
        }
      } else {
        postData = {
          user: this.$auth.user.pk,
          post: this.postContent.pk,
          comment: this.commentPost
        }
      }
      if (this.editCommentId) {
        this.$axios
          .$put(`users/comment/${this.editCommentId}/`, postData)
          .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
            console.log('data posted', response)
            this.getComments()
            this.commentPost = ''
            this.editCommentId = null
          // this.$router.push('/')
          })
          .catch((error) => {
            console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
          })
      } else {
        this.$axios
          .$post('users/comment/', postData)
          .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
            console.log('data posted', response)
            this.getComments()
            this.commentPost = ''
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
    getComments () {
      this.$axios
        .$get(`users/post/${this.postContent.pk}/get_comments`)
        .then((response) => {
          // this.setNotifyMessage({
          //   message: 'Successfully Login. Enjoy Shopping.',
          //   color: 'green',
          // })
          console.log('data posted', response)
          // this.$router.push('/')
          this.commentData = response
        })
        .catch((error) => {
          console.log(error)
          // this.setNotifyMessage({
          //   message: 'Username or Password doesnot match.',
          //   color: 'red',
          // })
        })
    },
    editComment (index) {
      this.editCommentId = this.commentData[index].pk
      this.commentPost = this.commentData[index].comment
      this.commentData.splice(index, 1)
    },
    commentLikedUsers () {},
    commentReplyUsers () {}
  }
}
</script>

<style scoped>
.box-declaration {
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
.list-enter-active, .list-leave-active {
   transition: all 0.5s ease;
}
.list-leave-active {
  transition: all 0.7s ease;
}
.list-enter, .list-leave-to {
  position: absolute; /* add for smooth transition between elements */
  opacity: 0;
}
</style>
