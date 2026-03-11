import { Space, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { ArtistIcon } from '../../../Icons';

const Header = ({ opacity }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Đăng xuất")
  };

  const menuItems = [
    {
      key: 'profile',
      label: 'Trang cá nhân',
      icon: <ArtistIcon />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      label: <span style={{ color: '#ef4444' }}>Đăng xuất</span>,
      icon: "",
      onClick: handleLogout,
    },
  ];

  return (
    <div
      className="flex r-0 w-full flex-row items-center justify-between bg-gray-900 rounded-t-md z-10"
      style={{ backgroundColor: `rgba(12, 12, 12, ${opacity}%)` }}
    >
      <div className="flex flex-row items-center">
        <Space>
          <div className="avatar-container">
            <Dropdown 
              menu={{ items: menuItems }} 
              placement="bottomRight"
              trigger={['click']}
            >
              <div style={{ cursor: 'pointer' }}>
                <img
                  className="avatar"
                  id="user-avatar"
                  alt="Ảnh đại diện người dùng"
                  style={{ marginTop: -1 }}
                  src={ARTISTS_DEFAULT_IMAGE}
                />
              </div>
            </Dropdown>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Header;
