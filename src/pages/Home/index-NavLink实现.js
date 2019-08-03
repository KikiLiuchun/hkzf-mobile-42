import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import Index from './Index/index'
import House from './House'
import News from './News'
import Profile from './Profile'
import './index.scss'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        {/* 路由规则 */}
        <Route path="/home/index" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />
        {/* 导航链接 */}
        <div className="nav">
          <ul>
            <li>
              <NavLink to="/home/index">
                <i className="iconfont icon-ind" />
                <span>首页</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/house">
                <i className="iconfont icon-findHouse" />
                <span>找房</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/news">
                <i className="iconfont icon-infom" />
                <span>咨询</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/profile">
                <i className="iconfont icon-my" />
                <span>我的</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
