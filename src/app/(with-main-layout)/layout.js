import NavbarPage from "../../Components/NavbarPage";

const layout = ({children}) => {
    return (
        <div>
            <NavbarPage />
            {children}
        </div>
    );
};

export default layout;