<template>
  <div class="login">
    <div class="form">
      <div class="form-img"></div>
      <div class="form-form">
        <el-form
          :rules="dataRule"
          :model="dataForm"
          ref="dataForm"
          class="demo-form-inline"
          label-width="80px"
        >
          <br />
          <h1>登录</h1>
          <br />

          <el-form-item
            prop="userName"
            label="账号"
          >
            <el-input
              v-model="dataForm.userName"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <br />
          <el-form-item
            prop="password"
            label="密码"
          >
            <el-input
              v-model="dataForm.password"
              type="password"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <br />
          <br />
          <el-form-item label="验证码">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input
                  v-model="dataForm.captcha"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
              <el-col :span="12">
                <img
                  :src="captchaPath"
                  @click="getCaptcha()"
                  alt
                />
              </el-col>
            </el-row>
          </el-form-item>

          <br />
          <br />
          <el-row :gutter="20">
            <el-col :span="24">
              <el-button
                type="primary"
                style="width:100%"
                @click="loginAX('dataForm')"
              >登录</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
 
<script>
import { request } from "@/api/apiList";
import { getUUID } from "@/utils";
export default {
  name: "login",
  data() {
    var checkAge = (rule, value, callback) => {
      // console.log(value);
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            // callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      dataForm: {
        userName: "",
        password: "",
        uuid: "",
        captcha: ""
      },
      dataRule: {
        userName: [
          {
            // validator: checkAge,
            required: true,
            message: "帐号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            // required: validatePass,
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            // validator: checkAge,
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      },
      captchaPath: ""
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    // 提交表单
    loginAX() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          let pamData = {
            username: this.dataForm.userName,
            password: this.dataForm.password,
            uuid: this.dataForm.uuid,
            captcha: this.dataForm.captcha
          };
          request.login(pamData).then(data => {
            if (data && data.code === 200) {
              console.log("登陸成功");
              //储存 cookie
              this.$cookie.set("token", data.data.token);
              // 跳转页面
              this.$router.replace({ name: "main" });
            } else {
              this.getCaptcha();
              this.$message.error(data.message);
            }
          });
        }
      });
    },
    // 获取验证码
    getCaptcha() {
      this.dataForm.uuid = getUUID();
      //整理一个 img验证码 的路径
      this.captchaPath = `${this.GLOBAL.imgPathHead}/captcha.jpg?uuid=${this.dataForm.uuid}`;
    }
  }
};
</script>

<style lang="scss">
</style>