import { Outlet } from "react-router-dom";
import PlayerBar from "../components/player/PlayerBar";
import { Col, Row } from "antd";
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Library from "../components/Library";
import { Navbar } from "../components/Layout/components/Navbar";
import EditPlaylistModal from "../components/Modals/EditPlaylistModal";

const MainLayout = () => {
    return (
        <div>
            {/* <EditPlaylistModal /> */}

            <div className='main-container'>
                <Row
                wrap
                justify='end'
                gutter={[6, 6]}
                style={{
                    overflow: 'hidden',
                    height: `calc(100vh - 115px)`,
                }}
                >
                    <Col span={24}>
                        <Navbar />
                    </Col>

                    <Col
                        span={24}
                        style={{
                        maxHeight: undefined,
                        }}
                    >
                        <PanelGroup direction='horizontal' autoSaveId='persistence'>
                            <Panel
                                id='left'
                                order={1}
                                className='mobile-hidden'
                                minSize={22}
                                maxSize={28}
                                defaultSize={22}
                                style={{
                                borderRadius: 5,
                                minWidth: 280,
                                maxWidth: undefined,
                                }}
                            >
                                <Library />
                            </Panel>

                            <PanelResizeHandle className='resize-handler' />
                            
                            <Panel id='center' order={2} style={{ borderRadius: 5 }}>
                                <Outlet />
                            </Panel>
                        </PanelGroup>
                    </Col>
                </Row>
            </div>

            <footer><PlayerBar /></footer>
        </div>
    );
};

export default MainLayout;