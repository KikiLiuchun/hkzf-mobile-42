import React from 'react'

import { Carousel, Flex } from 'antd-mobile'
import axios from 'axios'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import { Link } from 'react-router-dom'
import './index.scss'

// 提取导航组件数据
const navList = [
  { title: '合租', img: Nav1, path: '/home/house' },
  { title: '整租', img: Nav2, path: '/home/house' },
  { title: '地图找房', img: Nav3, path: '/home/map' },
  { title: '去出租', img: Nav4, path: '/home/rent' }
]
class Index extends React.Component {
  state = {
    // 指的是轮播图的初始数据
    swipers: [],
    // 图片的初始高度
    imgHeight: 212,
    // 轮播图数据还没有加载完成
    isLoaded: false
  }

  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    // console.log(res)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        swipers: body,
        isLoaded: true
      })
    }
  }

  componentDidMount() {
    this.getSwipers()
  }

  renderSwiper() {
    // 如果数据还没有加载完成，不渲染
    if (!this.state.isLoaded) {
      return null
    }
    return (
      // Carousel 轮播图组件
      // autoplay 自动播放
      // infinite 循环播放
      <Carousel autoplay infinite>
        {this.state.swipers.map(item => (
          <a
            key={item.id}
            href="http://itcast.cn"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`http://localhost:8080${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              // 表示图片加载完成了，会自动调整图片的高度，而不是写死
              onLoad={() => {
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  // 渲染导航
  renderNav() {
    return navList.map(item => (
      <Flex.Item key={item.title}>
        <Link to={item.path}>
          <img src={item.img} alt="" />
          <p>{item.title}</p>
        </Link>
      </Flex.Item>
    ))
  }
  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        {/* 
          autoplay: 是否自动播放
          autoplayInterval: 切换的间隔
          infinite
        */}
        <div className="swiper" style={{ height: this.state.imgHeight }}>
          {this.renderSwiper()}
        </div>
        <div className="nav">
          {/* 导航菜单 */}
          <Flex>{this.renderNav()}</Flex>
        </div>
      </div>
    )
  }
}

export default Index
