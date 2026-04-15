# Base image
FROM python:3.12-slim

# Prevent .pyc files + enable logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Expose port
EXPOSE 8080

# Run server (prod = gunicorn)
CMD ["gunicorn", "backend_server.wsgi:application", "--bind", "0.0.0.0:8080"]