# Use the official PHP image
FROM php:8.1-apache
# Use the official PHP image
#RUN docker-php-ext-install pdo_mysql

# Copy Laravel project to the container
COPY . /var/www/html

# Set working directory
WORKDIR /var/www/html

# Install composer dependencies
RUN apt-get update && apt-get install -y unzip
RUN curl -sS https://getcomposer.org/installer | php
RUN php composer.phar install

# Expose port
EXPOSE 80