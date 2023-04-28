FROM postgres:15

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB myiit_service

COPY ./init.sql /docker-entrypoint-initdb.d/