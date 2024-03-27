FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /bazar

COPY requirements.txt /bazar/
ADD wsgi-entrypoint.sh /bazar/

RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /bazar/