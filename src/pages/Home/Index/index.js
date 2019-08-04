import React from 'react'

import { Carousel, Flex, Grid } from 'antd-mobile'
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
    // 租房小组的数据
    groups: [],
    // 最新资讯
    message: [],
    // 图片的初始高度
    imgHeight: 212,
    // 轮播图数据还没有加载完成
    isLoaded: false,
    cityName: '北京'
  }

  // 轮播图ajax请求
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
  // 租房小组ajax请求
  async getGroup() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    // console.log(res)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        groups: body
      })
    }
  }
  // 最新资讯ajax请求
  async getMessage() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    // console.log(res)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        message: body
      })
    }
  }

  componentDidMount() {
    this.getSwipers()
    this.getGroup()
    this.getMessage()
  }
  // 渲染轮播图
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
  // 渲染搜索框
  renderSearch() {
    return (
      <Flex className="search-box">
        <Flex className="search-from">
          <div
            className="location"
            onClick={() => this.props.history.push('/city')}
          >
            <span className="name">{this.state.cityName}</span>
            <i className="iconfont icon-arrow" />
          </div>
          <div
            className="search-input"
            onClick={() => this.props.history.push('/search')}
          >
            <i className="iconfont icon-seach" />
            <span className="text">请输入小区地址</span>
          </div>
        </Flex>
        {/* 地图小图标 */}
        <i
          className="iconfont icon-map"
          onClick={() => this.props.history.push('map')}
        />
      </Flex>
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
  // 渲染最新资讯
  renderMessage() {
    return (
      <>
        <h3 className="message-title">最新资讯</h3>
        {this.state.message.map(item => (
          <div className="news-item" key={item.id}>
            <div className="imgwrap">
              <img
                className="img"
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
              />
            </div>
            <Flex className="content" direction="column" justify="between">
              <h3 className="title">{item.title}</h3>
              <Flex className="info" justify="between">
                <span>{item.from}</span>
                <span>{item.date}</span>
              </Flex>
            </Flex>
          </div>
        ))}
      </>
    )
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
          {/* 轮播图渲染 */}
          {this.renderSwiper()}
          {/* 渲染收搜框 */}
          {this.renderSearch()}
        </div>
        {/* 导航菜单 */}
        <div className="nav">
          <Flex>{this.renderNav()}</Flex>
        </div>
        {/* 租房小组 */}
        <div className="group">
          {/* 标题 */}
          <h3 className="group-title">
            租房小组
            <span className="more">更多</span>
          </h3>

          {/* 内容 */}
          <div className="group-content">
            {/* 
            data: 需要渲染的数据，一个数组
            activeStyle
            square: 控制九宫格是否是正方形
            hasLine: 没有边框
            */}
            <Grid
              data={this.state.groups}
              activeStyle
              columnNum={2}
              square={false}
              hasLine={false}
              renderItem={item => (
                <Flex className="group-item" justify="around">
                  <div className="desc">
                    <p className="title">{item.title}</p>
                    <span className="info">{item.desc}</span>
                  </div>
                  <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </Flex>
              )}
            />
          </div>
        </div>
        {/* 最新资讯 */}
        <div className="message">{this.renderMessage()}</div>
      </div>
    )
  }
}

export default Index
