import React, { useState } from 'react';
import { Avatar, Card, List, Input, message, Drawer, Button, Tabs, Tooltip, Image, Switch } from 'antd';
import { navigate } from "@reach/router"
import { PictureOutlined, SearchOutlined, GithubOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png';
import defaultHome from "../constant/defaultHome";
import defaultSearch from '../constant/defaultSearch';
import defaultTabPane, { DEFAULT_COVER } from "../constant/defaultTabPane";
import { CURRENT_COVER, GHOST_OPEN, PROJECT_GITHUB, WEB_HOST } from "../constant";
import axios from 'axios'
import './index.css';
import './ghost.css';

const { Search } = Input;

const listGrid = {
  gutter: 28,
  xxl: 4,
  xl: 4,
  lg: 4,
  md: 3,
  sm: 2,
  xs: 1,
};

const gridStyle = {
  width: '25%',
  textAlign: 'center',
  fontSize: '13px',
  color: '#555',
};

const localStorage = window.localStorage;

/**
 * 主页
 * @author codenav
 * @return {*}
 */
export default () => {

  const [tabKey, setTabKey] = useState('myLike');
  const [maskOpened, setMaskOpened] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [template, setTemplate] = useState(defaultHome);
  const [searchEngine, setsearchEngine] = useState(0);
  // 开启万能搜索
  // const currentSearchAll = localStorage.getItem(SEARCH_ALL_OPEN) ? JSON.parse(localStorage.getItem(SEARCH_ALL_OPEN)) : false;
  // const [searchAll, setSearchAll] = useState(currentSearchAll);
  // 当前封面
  const currentCover = localStorage.getItem(CURRENT_COVER) ? JSON.parse(localStorage.getItem(CURRENT_COVER)) : DEFAULT_COVER
  const [cover, setCover] = useState(currentCover);
  // 透明模式
  const currentGhostClose = localStorage.getItem(GHOST_OPEN) ? JSON.parse(localStorage.getItem(GHOST_OPEN)) : false;
  const [ghostClose, setGhostClose] = useState(currentGhostClose);

  const doSearch = value => {
    if (value.length < 1) {
      message.error('请输入搜索内容');
      return;
    }
    window.open(`${defaultSearch.site[searchEngine]}${value}`);

  }

  const changeCover = async (cover) => {
    setDrawerVisible(false);
    const newCover = { ...cover };
    setCover(newCover);
    localStorage.setItem(CURRENT_COVER, JSON.stringify(newCover));
  }

  const toggleGhost = (checked, e) => {
    localStorage.setItem(GHOST_OPEN, JSON.stringify(checked));
    setGhostClose(checked);
  }

  const handleSearchEngine = () => {
    let newL = searchEngine + 1
    if (newL >= 5) newL = 0
    setsearchEngine(newL)
  }

  const onClose = e => {
    setDrawerVisible(false)
  };

  const renderViewByTabKey = template.keyContentMap[tabKey].map((resource, index) =>
    <a href={resource.link} target="_blank" key={index}>
      <Card.Grid style={gridStyle}>
        <Avatar shape="square" src={resource.icon} />
        <div className="resource-name">{resource.name}</div>
      </Card.Grid>
    </a>
  )

  const drawerTitle = (
    <div className="drawer-title">
      <a href='*' target="_blank">
        <Avatar src={logo} shape="square" style={{ marginRight: 12 }} />
        <span className="site-title">挑选你喜欢的背景图片吧～</span>
      </a>
    </div>
  )

  const DrawerTabPanes = defaultTabPane.map((item, index) => {
    return (
      <Tabs.TabPane tab={item.name} key={item.key}>
        <List
          rowKey="id"
          grid={listGrid}
          dataSource={item.list}
          renderItem={(cover, index) => {
            return (
              <List.Item key={index} style={{ marginBottom: 28 }}>
                <Card
                  hoverable
                  key={index}
                  cover={<Image alt={cover.name} preview={false} placeholder
                    src={cover.preview} />}
                  bodyStyle={{ padding: 12, textAlign: 'center' }}
                  onClick={() => changeCover(cover)}
                >
                  {cover.name}
                </Card>
              </List.Item>
            );
          }}
        />
      </Tabs.TabPane>
    )
  })

  return (
    <div className={`index${ghostClose ? '' : ' ghost'}`}>
      <div style={{ textAlign: 'center', margin: '104px 0 34px' }}>
        <img src={`${defaultSearch.logo[searchEngine]}`} className="search-logo"
          onClick={handleSearchEngine} />
      </div>
      <div className="search-wrapper">
        <Search enterButton={<Button type={ghostClose ? 'primary' : 'ghost'}><SearchOutlined /></Button>} size="large"
          className="search"
          onSearch={doSearch} onFocus={() => setMaskOpened(true)}
          onBlur={() => setMaskOpened(false)}
        />
      </div>
      <div className={'card-wrapper' + (maskOpened ? ' hidden' : '')}>
        {
          template.keyList.length > 0 &&
          <Card className="card" bordered={false}>
            {renderViewByTabKey}
          </Card>
        }
      </div>
      <div className="fix-group">
        <Switch
          checkedChildren="白底"
          unCheckedChildren="透明"
          checked={ghostClose}
          onChange={toggleGhost}
        />
        <Tooltip title="切换封面">
          <Button type={ghostClose ? 'primary' : 'ghost'} size="small" shape="round" icon={<PictureOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => setDrawerVisible(true)} />
        </Tooltip>
        <Tooltip title="项目详情">
          <Button type={ghostClose ? 'primary' : 'ghost'} size="small" shape="round" icon={<GithubOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => window.open(PROJECT_GITHUB)} />
        </Tooltip>
      </div>
      <Drawer
        title={drawerTitle}
        placement="top"
        closable={true}
        height={document.body.clientHeight}
        headerStyle={{ padding: 16, background: 'rgba(0, 0, 0, 0.5)' }}
        bodyStyle={{ background: '#f5f5f5' }}
        visible={drawerVisible}
        onClose={onClose}
      >
        <div className="drawer-wrapper">
          <Tabs defaultActiveKey="1" type="card" centered>
            {DrawerTabPanes}
          </Tabs>
        </div>
      </Drawer>
      <div className={'mask' + (maskOpened ? '' : ' hidden')} />
      {
        cover.type === 'iframe' ?
          <iframe className="bg" title="myIframe" src={cover.src} marginWidth={0} marginHeight={0} /> :
          <img className="bg" src={cover.src} alt="bg" />
      }
    </div>
  )
}
