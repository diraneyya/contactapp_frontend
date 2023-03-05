import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootPage, { rootLoader, rootAction } from "./routes/RootPage";
import IndexPage from "./routes/IndexPage";
import ContactPage, {
  contactLoader,
  contactAction,
} from "./routes/ContactPage";
import EditContactPage, { editAction } from "./routes/EditContactPage";
import { destroyAction } from "./routes/DestroyContactPage";
import ErrorPage from "./routes/ErrorPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            path="/"
            loader={rootLoader}
            action={rootAction}
            element={<RootPage />}
            errorElement={<ErrorPage />}
          >
            {/* wrap in a pathless route with error page to make the 
            error appear with the sidebar intact (as outlet) */}
            <Route errorElement={<ErrorPage />}>
              <Route index element={<IndexPage />} />
              <Route
                path="/contacts/:contactId"
                loader={contactLoader}
                action={contactAction}
                element={<ContactPage />}
              />
              <Route
                path="contacts/:contactId/edit"
                loader={contactLoader}
                action={editAction}
                element={<EditContactPage />}
              />
              <Route
                path="contacts/:contactId/destroy"
                action={destroyAction}
                errorElement={<div>Oops! There was an error.</div>}
              />
            </Route>
          </Route>
        )
      )}
    />
  </React.StrictMode>
);
