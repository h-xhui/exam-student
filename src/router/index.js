import Vue from 'vue'
import Router from 'vue-router'
import login from '@/containers/login/login'
import main from '@/containers/main/main'
import changePass from '@/containers/main/personalCenter/changePass'
import homepage from '@/containers/main/homepage/index'
import examCard from '@/containers/main/examCard/index';
import userExamList from "../containers/main/examCard/examList";
import welcomePage from "../containers/main/homepage/WelcomePage";
Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: 'exam/:paperId/:questionId',
          component: examCard,
        },
        {
          path: 'homepage',
          name: 'homepage',
          component: homepage,
        },
        {
          path: 'personalCenter/changePass',
          name: 'changePass',
          component: changePass,
        },
        {
          path:'examList',
          name:'examList',
          component:userExamList
        },{
          path:'welcomePage',
          name:'welcomePage',
          component:welcomePage
        }
      ]
    }
  ]
})
