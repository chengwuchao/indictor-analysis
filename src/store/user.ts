import { getInfo, login, logout } from '@/api/login';
import { LoginForm } from '@/types/login';
import { getToken, removeToken, setToken } from '@/utils/auth';
import { defineStore } from 'pinia';

interface UserState {
  token: string | undefined;
  name: string;
  avatar: string;
  roles: Array<string>;
  permissions: Array<string>;
}

const initState = (): UserState => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
  };
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => initState(),
  actions: {
    login(userInfo: LoginForm) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;

      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then((res) => {
            setToken(res.token);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user;
            const avatar =
              user.avatar == ''
                ? require('@/assets/images/profile.jpg')
                : process.env.VUE_APP_BASE_API + user.avatar;
            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles;
              this.permissions = res.permissions;
            } else {
              this.roles = ['ROLE_DEFAULT'];
            }
            this.name = user.userName;
            this.avatar = avatar;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出系统
    logOut() {
      return new Promise<void>((resolve, reject) => {
        logout()
          .then(() => {
            this.token = '';
            this.roles = [];
            this.permissions = [];
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 前端 登出
    fedLogOut() {
      return new Promise<void>((resolve) => {
        this.token = '';
        removeToken();
        resolve();
      });
    },
  },
});
