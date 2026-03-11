import { memo } from 'react';
import { Col, Row, Space } from 'antd';
import Header from './Header';
import { Search } from './Search';
import NavigationButton from './NavigationButton';
import { FaSpotify } from 'react-icons/fa6';

export const Navbar = memo(() => {
  return (
    <Row
      align="middle"
      gutter={[16, 16]}
      className="navbar"
      justify="space-between"
      style={{ margin: '0 5px', padding: '3px 0' }}
    >
      <Col>
        <Space>
          <NavigationButton
            onClick={() => {
              window.location.href = '/home'
            }}
            icon={<FaSpotify size={25} fill="white" />}
          />
        </Space>
      </Col>

      <Col span={0} md={12} lg={10} xl={8} style={{ textAlign: 'center' }}>
        <Search />
      </Col>

      <Col>
        <Header opacity={1} />
      </Col>
    </Row>
  );
});
