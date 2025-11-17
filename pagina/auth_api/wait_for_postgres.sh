#!/bin/sh
set -e

host="$DATABASE_HOST"
shift

until pg_isready -h "$host" -p 5432; do
  echo "Aguardando Postgres..."
  sleep 1
done

exec "$@"
