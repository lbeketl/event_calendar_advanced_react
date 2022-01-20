import React, { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { privateRoutes, publicRoutes, RouteNames } from "../routes";

const AppRouter = () => {
    const { isAuth } = useTypedSelector((state) => state.auth);

    return isAuth ? (
        <Switch>
            {privateRoutes.map(({ path, exact, component }) => (
                <Route
                    path={path}
                    exact={exact}
                    component={component}
                    key={path}
                />
            ))}
            <Redirect to={RouteNames.EVENT} />
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map(({ path, exact, component }) => (
                <Route
                    path={path}
                    exact={exact}
                    component={component}
                    key={path}
                />
            ))}
            <Redirect to={RouteNames.LOGIN} />
        </Switch>
    );
};
export default AppRouter;
