
import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
        <Menu.Item key="home">
        <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="contact">
        <a href="/">Contact Us</a>
        </Menu.Item>
        <Menu.Item key="info">
        <a href="/">About Us</a>
        </Menu.Item>
    </Menu>
  )
}

export default LeftMenu