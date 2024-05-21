FROM python:3.9

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client netcat-openbsd
COPY requirements.txt .
COPY migrate.sh .

RUN pip install -r requirements.txt

RUN chmod +x migrate.sh

COPY . .

CMD ["./migrate.sh"]
