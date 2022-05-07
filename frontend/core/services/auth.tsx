import Router from "next/router";
import nextCookie from "next-cookies";
import { Component } from 'react';
import { NextPage } from 'next';
import cookie from 'component-cookie';

const getDisplayName = Component =>
  Component.displayName || Component.name || "Component";

export const withAuthSync = (WrappedComponent: NextPage) =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const token = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

const auth = ctx => {
  const { token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }

  if (!token) {
    Router.push("/login");
  }

  return token;
};

export const logout = () => {
  cookie("token", null);
  // To trigger the event listener we save some random data into the `logout` key
  window.localStorage.setItem("logout", Date.now().toString());
  Router.push("/login");
};

export const login = (session: {
  userId: string,
  token: string,
}) => {
  cookie("token", session.token);
  cookie("userId", session.userId);

  Router.push('/app');
}

export const getToken = () => cookie("token");

export const getUserId = () => cookie("userId");
