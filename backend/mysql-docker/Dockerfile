FROM mysql:8.0.30

COPY db.sql /docker-entrypoint-initdb.d
COPY my.cnf /etc/mysql/conf.d/

EXPOSE 3306