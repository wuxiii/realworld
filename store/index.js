const cookieparser = process.server ? require("cookieparser") : undefined;
export const state = () => {
  return {
    user: null,
  };
};

export const mutations = {
  setUser(state, data) {
    state.user = data;
  },
};

export const actions = {
  nuxtServerInit({commit}, {req}) {
    let user = null;
    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 JavaScript 对象
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
      } catch (err) {
        console.log(err);
        // No valid cookie found
      }
    }

    // 提交 mutation 修改 state 状态
    commit("setUser", user);
  },
};
