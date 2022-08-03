import React, { useCallback, useEffect, useState } from "react";
import Card from "../components/Card";
import Layout from "../components/Layout";
import vars from "../config/vars";
import { ApiHealtResponse } from "../models";
import getAllStatus from "../services/status.route";
import "./home.styles.css";

type ApiInfo = Array<ApiHealtResponse>;

export default function Home() {
  const [apiInfo, setApiInfo] = useState<ApiInfo>();

  const getStatus = useCallback(async () => {
    getAllStatus().then((status) => {
      setApiInfo(status);
    });
  }, []);

  useEffect(() => {
    const res = setInterval(() => {
      getStatus();
    }, vars.interval * 1000);

    return () => {
      clearInterval(res);
    };
  }, [getStatus]);

  useEffect(() => {
    //To load at first time
    getStatus();
  }, [getStatus]);

  return (
    <Layout>
      <main className="content">
        {apiInfo && apiInfo.map((value, i) => <Card key={i} {...value} />)}
      </main>
    </Layout>
  );
}
