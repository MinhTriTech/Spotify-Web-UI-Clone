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

            <div style={{ height: "90px", background: "#000", color: "white" }}>
                Player
            </div>
        </div>
    );
};

export default MainLayout;