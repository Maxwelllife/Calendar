import { ClipLoader } from "react-spinners";

const SpinnerOverlay: React.FC = () => (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    }}>
        <ClipLoader color="#3498db" loading={true} size={50} />
    </div>
);

export default SpinnerOverlay;
