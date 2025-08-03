# Use the official PHP 8.1 image with Apache
FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl pdo_pgsql pgsql opcache

# Install MongoDB extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set user and group for Apache
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

# Copy existing application directory contents
COPY . /var/www/html

# # Copy .env as .env
# COPY --chown=www-data:www-data backend\.env /var/www/html/.env

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Enable Apache modules and configure virtual host
RUN a2enmod rewrite && \
    sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf && \
    sed -i 's!/var/www/!/var/www/html/public!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy virtual host config
COPY ./docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# Install application dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

# Expose port 80
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]



