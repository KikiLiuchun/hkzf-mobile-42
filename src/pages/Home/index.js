import React from 'react'
import { Route } from 'react-router-dom'
import Index from './Index/index.js'
import House from './House'
import News from './News'
import Profile from './Profile'
import './index.scss'
// 导入TabBar组件
import { TabBar } from 'antd-mobile'

// 抽取了所有的tabBar中的数据
const itemList = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/profile' }
]

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 设置默认高亮
      selectedTab: this.props.location.pathname,
      // 是否隐藏tabBar
      hidden: false
      // 是否全屏显示
      // fullScreen: true
    }
  }

  renderItem() {
    return itemList.map(item => (
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.props.history.push(item.path)
          this.setState({
            selectedTab: item.path
          })
        }}
      />
    ))
  }

  render() {
    return (
      <div className="home">
        {/* 路由规则 */}
        {/* route 只要path匹配上了，对应的组件就会渲染，但是如果path没有匹配上，对应的组件就不会渲染 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />
        {/* 导航链接 */}
        <div className="tabBar">
          {/* 
          unselectedTintColor：未选中的颜色
          tintColor：选中的颜色
          barTintColor：tabBar背景色
          hidden：显示隐藏
          onRenderContent={true} 不渲染内容
          删除renderContent的函数以及这个函数的调用
          调整了样式，吧tabBar放到最底部
          */}
          <TabBar
            unselectedTintColor="#888"
            tintColor="#21b97a"
            barTintColor="white"
            noRenderContent={true}
          >
            {/* 
            title：显示的文字
            icon: 未选中的图标
            selectedIcon：选中的图标
            selected：是否被选中
            badge：徽章，小脚标
            onPress：点击事件
            */}
            {this.renderItem()}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
