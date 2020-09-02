<template>
  <div class="zhMessage">
    <div class="bell"
      :class="{'active':msgFlag}"
      @click="visible=true">
      <i class="el-icon-bell"></i>
    </div>
    <div class="msgCtn"
      v-show="visible">
      <div class="main">
        <div class="top">
          <span>编辑消息通知</span>
          <i class="el-icon-close"
            @click="closeWin"></i>
        </div>
        <div class="center">
          <div class="line">
            <span class="label">开启通知：</span>
            <div class="content">
              <el-switch v-model="msgFlag"></el-switch>
            </div>
          </div>
          <div class="line"
            v-show="showCheck">
            <span class="label">消息类型：</span>
            <div class="content">
              <div class="btnCtn">
                <span class="btn blue"
                  :class="{'active':tag==='工序'}"
                  @click="tag='工序'">工序</span>
              </div>
              <div class="btnCtn">
                <span class="btn green"
                  :class="{'active':tag==='审核'}"
                  @click="tag='审核'">审核</span>
              </div>
            </div>
          </div>
          <div class="line">
            <span class="label">紧急程度：</span>
            <div class="content">
              <div class="btnCtn">
                <span class="btn blue"
                  :class="{'active':type==='普通'}"
                  @click="type='普通'">普通</span>
              </div>
              <div class="btnCtn">
                <span class="btn yellow"
                  :class="{'active':type==='重要'}"
                  @click="type='重要'">重要</span>
              </div>
              <div class="btnCtn">
                <span class="btn red"
                  :class="{'active':type==='紧急'}"
                  @click="type='紧急'">紧急</span>
              </div>
            </div>
          </div>
          <div class="line">
            <span class="label">通知标题：</span>
            <div class="content">
              <el-input placeholder="请输入通知标题"
                v-model="title"></el-input>
            </div>
          </div>
          <div class="line">
            <span class="label">通知成员：</span>
            <div class="content">
              <div class="btnCtn"
                v-for="(item,index) in groupSelf"
                :key="index">
                <span class="btn normal"
                  @click="getUsers(index)"
                  :class="{'active':item.check}">{{item.name}}</span>
              </div>
            </div>
            <div class="content">
              <el-checkbox v-for="(item,index) in userListSelf"
                :key="index"
                v-model="item.check">{{item.name}}
              </el-checkbox>
            </div>
          </div>
          <div class="line">
            <span class="label">已选成员：</span>
            <div class="content">
              <el-tag size="mini"
                v-if="checkList.length===0"
                type="warning">无</el-tag>
              <el-tag v-for="(item,index) in checkList"
                :key="index"
                size="mini"
                @close="handleClose(item.id)"
                closable>{{item.name}}
              </el-tag>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="closeWin">取消</div>
            <div class="btn btnBlue"
              @click="saveMsg">确认</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { group, auth, notify } from '@/assets/js/api.js'
export default {
  props: {
    msgSwitch: {
      type: Boolean,
      required: true
    }, // 发送消息开关，一旦接收到这个指令就发消息
    url: {
      type: String,
      required: false
    }, // 点击消息的路由
    content: {
      type: String,
      required: false
    }, // 消息内容
    afterClose: {
      type: Function,
      required: false
    },
    afterSave: {
      type: Function,
      required: false
    },
    afterSend: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      visible: false,
      title: '您有一条消息通知',
      groupSelf: JSON.parse(JSON.stringify(this.$store.state.group)),
      userListSelf: JSON.parse(JSON.stringify(this.$store.state.userList)),
      type: '普通',
      tag: '工序',
      msgFlag: false,
      defaultGroup: [],
      checkRouter: ['报价单添加', '合作公司财务操作记录'] // 需要审核的路由表,目前只有报价单
    }
  },
  computed: {
    group () {
      return this.$store.state.group
    },
    userList () {
      return this.$store.state.userList
    },
    checkList () {
      return this.userListSelf.filter((item) => {
        return item.check
      })
    },
    showCheck () {
      return this.checkRouter.find((item) => item === this.$route.name)
    }
  },
  watch: {
    group (val) {
      this.groupSelf = JSON.parse(JSON.stringify(val))
    },
    userList (val) {
      this.userListSelf = JSON.parse(JSON.stringify(val))
      this.getDefaultGroup()
    },
    msgSwitch (val) {
      if (val) {
        this.sendMsg()
      }
    },
    tag (val) {
      if (val === '审核') {
        this.userListSelf = this.userListSelf.filter((item) => item.has_check === 1)
      } else {
        auth.list().then((res) => {
          this.userListSelf = this.$store.commit('getUserList', res.data.data.map((item) => {
            return {
              station: item.station,
              group: item.group,
              id: item.id,
              name: item.name,
              has_check: item.has_check,
              check: false
            }
          }))
        })
      }
    }
  },
  methods: {
    init () {
      // 分组信息获取一次,保存在vuex里
      if (this.group.length === 0) {
        group.list().then((res) => {
          this.$store.commit('getGroup', [{ name: '所有人', check: false }].concat(res.data.data.map(item => {
            return {
              name: item.name,
              check: false
            }
          })))
        })
      }
      if (this.userList.length === 0) {
        auth.list().then((res) => {
          if (window.localStorage.getItem(this.$route.name) && JSON.parse(window.localStorage.getItem(this.$route.name)).tag === '审核') {
            this.$store.commit('getUserList', res.data.data.map((item) => {
              return {
                station: item.station,
                group: item.group,
                id: item.id,
                name: item.name,
                has_check: item.has_check,
                check: false
              }
            }).filter((item) => item.has_check === 1))
          } else {
            this.$store.commit('getUserList', res.data.data.map((item) => {
              return {
                station: item.station,
                group: item.group,
                id: item.id,
                name: item.name,
                has_check: item.has_check,
                check: false
              }
            }))
          }
        })
      }
      if (window.localStorage.getItem(this.$route.name)) {
        let data = JSON.parse(window.localStorage.getItem(this.$route.name))
        this.msgFlag = data.msgFlag
        this.title = data.title
        this.type = data.type
        this.tag = data.tag
        this.defaultGroup = data.receive_user
      }
    },
    getDefaultGroup () {
      if (this.defaultGroup.length && this.defaultGroup.length > 0) {
        this.userListSelf.forEach((item) => {
          if (this.defaultGroup.find((itemFind) => itemFind === item.id)) {
            item.check = true
          }
        })
      }
    },
    getUsers (index) {
      let group = this.groupSelf[index]
      this.groupSelf[index].check = !group.check
      this.userListSelf.forEach((item) => {
        if (index === 0) {
          item.check = group.check
        } else if (index !== 0 && (item.station === group.name || item.group === group.name)) {
          item.check = group.check
        }
      })
    },
    handleClose (id) {
      this.userListSelf.find((item) => item.id === id).check = false
    },
    closeWin () {
      this.visible = false
    },
    saveMsg () {
      let formData = {
        msgFlag: this.msgFlag,
        title: this.title,
        type: this.type,
        tag: this.tag,
        receive_user: this.checkList.map(item => item.id)
      }
      window.localStorage.setItem(this.$route.name, JSON.stringify(formData))
      if (typeof (this.afterSave) === 'function') {
        this.afterSave(formData)
      }
      this.$message.success({
        message: '编辑成功'
      })
      this.visible = false
    },
    sendMsg () {
      if (this.msgFlag) {
        let formData = {
          title: this.title,
          type: this.type,
          tag: this.tag,
          content: this.content,
          router_url: this.url,
          receive_user: this.checkList.map(item => item.id)
        }
        notify.create(formData).then((res) => {
          if (res.data.status) {
            // 一般情况下，页面发出通知后有两种情况
            // 1.刷新页面，执行afterSend
            // 2.跳转链接
            if (typeof (this.afterSend) === 'function') {
              this.afterSend()
            } else {
              this.$router.push(this.url)
            }
          }
        })
      }
      this.$emit('update:msgSwitch', false)
    }
  },
  mounted () {
    this.init()
    this.getDefaultGroup()
  }
}
</script>
<style lang="less" scroped>
@import "./zhMessage.less";
</style>
