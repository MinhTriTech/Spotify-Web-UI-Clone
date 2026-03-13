import { Col, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
import { ARTISTS_DEFAULT_IMAGE, PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';
import { Link } from 'react-router-dom';

const PlaylistHeader = ({ container, sectionContainer, color, playlist, tracks }) => {
    const [headerWidth, setHeaderWidth] = useState(0);
    const [activeHeader, setActiveHeader] = useState(false);
    
    useEffect(() => {
        const ref = container.current;

        const handleScroll = () => {
            if (ref) {
                setActiveHeader(ref.scrollTop > 260);
            }
        };
        ref?.addEventListener('scroll', handleScroll);
        return () => {
            window.onresize = null;
            ref?.removeEventListener('scroll', handleScroll);
        };
    }, [container]);

    useEffect(() => {
        const ref = sectionContainer?.current;
        if (ref) {
            const observer = new ResizeObserver((entries) => {
                setHeaderWidth(entries[0].contentRect.width);
            });
            observer.observe(ref);
            return () => ref && observer.unobserve(ref);
        }
    }, [sectionContainer]);

    return (
        <div
        style={{
            overflow: 'auto',
            position: 'relative',
            background: `linear-gradient(180deg, transparent 0px, ${color} 100%)`,
        }}
        >
            <div
                className={`nav-header ${activeHeader ? 'active' : ''}`}
                style={{
                minHeight: 36,
                width: headerWidth,
                backgroundColor: !activeHeader
                    ? 'transparent'
                    : tinycolor(color).darken(10).toRgbString(),
                }}
            >
                <div
                className='nav-header-content'
                style={{
                    opacity: 1,
                }}
                >
                <div
                    style={{ padding: '0px 20px' }}
                    className={'nav-bar-header-table-container active'}
                >
                    {/* <PlaylistTableHeader /> */}
                </div>
                </div>
            </div>
        
            <div style={{ padding: 30, paddingTop: 30 }}>
                <Row gutter={[24, 24]} align={'middle'}>
                    <Col xs={24} sm={6} lg={5}>
                        <div>
                            <img
                                src={
                                playlist?.coverImage
                                    ? `${import.meta.env.VITE_URL}${playlist.coverImage}` 
                                    : PLAYLIST_DEFAULT_IMAGE
                                }
                                alt='Playlist image'
                                className='playlist-img'
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={18} lg={19}>
                        <Row justify='space-between'>
                            <Col span={24}>
                                <p className='text-white'>
                                    {'Playlist'}
                                </p>
                                <div>
                                    <h1 className='playlist-title'>{playlist?.title}</h1>
                                </div>
                            </Col>
                            <Col span={24}>
                                <Space className='owner'>
                                    {playlist?.owner ? (
                                        <Link to={`/user/${playlist.owner}`}>
                                            <img
                                                className='playlist-avatar'
                                                id='user-avatar'
                                                alt='User Avatar'
                                                src={ARTISTS_DEFAULT_IMAGE}
                                            />
                                        </Link>
                                    ) : null}
                                    <h3 className='text-sm font-semibold text-white'>
                                        <span className='songs-number'>
                                        {tracks?.length
                                            ? ` • ${tracks?.length} ${
                                                tracks?.length === 1 ? 'song' : 'songs'
                                            }`
                                            : ''}
                                        </span>
                                    </h3>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PlaylistHeader;