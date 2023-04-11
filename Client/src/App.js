import { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Route from "./Router/Route";
import { useDispatch } from "react-redux";
import { getVisitor } from "./Redux/VisitorSlice";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVisitor());
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        return () => {
            document.removeEventListener('contextmenu', (event) => {
                event.preventDefault();
            });
        };
    }, [dispatch]);

    return (
        <Fragment>
            <ToastContainer />
            <Route />
        </Fragment>
    );
}

export default App;
