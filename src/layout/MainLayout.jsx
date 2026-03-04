import PlayerBar from "../components/player/PlayerBar";

const MainLayout = ({ children }) => {
    return (
        <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            <div style={{ display: "flex", flex: 1 }}>
                <div style={{ width: "250px", background: "#111", color: "white" }}>
                Sidebar
                </div>

                <div style={{ flex: 1, background: "#181818", color: "white", padding: "20px" }}>
                    {children}
                </div>
            </div>

            <PlayerBar />
        </div>
    );
};

export default MainLayout;