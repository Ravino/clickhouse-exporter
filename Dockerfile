FROM node:14


ENV CLICKHOUSE_EXPORTER_PATH_CONFIG=
ENV CLICKHOUSE_EXPORTER_HOST=
ENV CLICKHOUSE_EXPORTER_PORT=
ENV CLICKHOUSE_EXPORTER_ENDPOINT=
ENV CLICKHOUSE_EXPORTER_REFRESH=
ENV CLICKHOUSE_EXPORTER_DEBUG=


ENV CLICKHOUSE_HOST=
ENV CLICKHOUSE_PORT=
ENV CLICKHOUSE_USER=
ENV CLICKHOUSE_PASSWORD=
ENV CLICKHOUSE_DB=


RUN mkdir /app
WORKDIR /app


COPY package.json .
RUN npm install


COPY . .
EXPOSE 9333


ENTRYPOINT ["npm", "start"]
CMD [""]
