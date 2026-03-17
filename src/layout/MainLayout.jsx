import { Outlet } from "react-router-dom";
import PlayerBar from "../components/player/PlayerBar";
import { Col, Row } from "antd";
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Library from "../components/Library";
import { Navbar } from "../components/Layout/components/Navbar";
import EditPlaylistModal from "../components/Modals/EditPlaylistModal";
import LoginModal from "../components/Modals/LoginModal";
import { useAuth } from "../context/AuthContext";
import { LoginFooter } from "../components/Layout/components/LoginFooter";
import { useModal } from "../context/ModalContext";

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const { modal, closeModal } = useModal();

    return (
        <div>
            {modal.type == "updatePlaylist" && (
                <EditPlaylistModal {...modal.props} onClose={closeModal}/>
            )}

            {modal.type == "login" && (
                <LoginModal {...modal.props} onClose={closeModal}/> 
            )}

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
                                <div className="Main-section">
                                    <div style={{ minHeight: 'calc(100vh - 230px)', width: '100%' }}>
                                        <Outlet />
                                    </div>
                                </div>
                            </Panel>
                        </PanelGroup>
                    </Col>
                </Row>
            </div>

            {<footer>{isAuthenticated ? <PlayerBar /> : <LoginFooter />}</footer>}
        </div>
    );
};

export default MainLayout;