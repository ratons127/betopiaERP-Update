FROM python:3.12-slim-bookworm

ENV PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /opt/betopiaerp

# System deps for common wheels and postgres client libs
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    libxml2-dev \
    libxslt1-dev \
    libsasl2-dev \
    libldap2-dev \
    libssl-dev \
    libffi-dev \
    zlib1g-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libfreetype6-dev \
    liblcms2-dev \
    libwebp-dev \
    libopenjp2-7-dev \
    libtiff6 \
    libharfbuzz0b \
    libfribidi0 \
    libart-2.0-dev \
    wkhtmltopdf \
    fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /opt/betopiaerp/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel \
    && python -m pip install -r /opt/betopiaerp/requirements.txt \
    && python -m pip install --no-cache-dir --only-binary=:all: --force-reinstall reportlab==4.1.0 \
    && python -m pip install --no-cache-dir rl-renderPM==4.0.3

COPY . /opt/betopiaerp

COPY betopiaerp.conf /etc/betopiaerp/betopiaerp.conf

EXPOSE 8069

CMD ["python", "/opt/betopiaerp/betopiaerp-bin", "-c", "/etc/betopiaerp/betopiaerp.conf"]
