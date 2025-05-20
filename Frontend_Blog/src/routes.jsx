import Layout from "./components/layout/Layout";
import Publicaciones from "./pages/Publicaciones";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "publicaciones", element: <Publicaciones /> },
            { index: true, element: <Publicaciones /> },
        ],
    },
];

export default routes;