import React from "react";
import { ApiHealtResponse } from "../../models";
import "./card.style.css";

export default function Card(data: ApiHealtResponse) {
  const { hostname, message, name, success, time } = data;

  return (
    <section className={`card ${success ? "card--success" : "card--fail"}`}>
      <header>
        <h3 className="card__name">{name}</h3>
      </header>
      <div>
        <p className={`card__state  ${success ? "success" : "fail"}`}>
          <b>Status: </b>
          <span>{formatMessage(success)}</span>
        </p>
      </div>
      <div className="card__body">
        {hostname !== "" && (
          <div>
            <span>
              <b>Hostname: </b>
            </span>
            <span className="card__host">{hostname}</span>
          </div>
        )}
        {!success && (
          <p>
            <b>{message}</b>
          </p>
        )}
        {time !== 0 && (
          <div>
            <b>Time: </b>
            <span className="card__time">{formatDate(time)}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function formatMessage(status: boolean) {
  return status ? "Healthy" : "OUTAGE";
}

function formatDate(time: number) {
  const date = new Date(time);

  return `${date.getHours()}:${
    (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
  }:${(date.getSeconds() < 10 ? "0" : "") + date.getSeconds()}`;
}
