FROM httpd:2.4
COPY ./backend/ /usr/local/apache2/htdocs/
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Use the official PHP image
FROM php:8.1-apache
# Use the official PHP image
#RUN docker-php-ext-install pdo_mysql

# Copy Laravel project to the container
COPY . /var/www/html

# Set working directory
WORKDIR /var/www/html

#install all the system dependencies and enable PHP modules 


# Update and install required dependencies, including libonig-dev for mbstring
RUN apt-get update -y && apt-get install -y \
    libicu-dev libpq-dev libmcrypt-dev libonig-dev git zip unzip \
    && rm -r /var/lib/apt/lists/*

# Configure and install PHP extensions
RUN docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd
RUN docker-php-ext-install \
    intl \
    mbstring \
    pcntl \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    zip \
    opcache


# Install MongoDB via PECL
RUN pecl install mongodb && docker-php-ext-enable mongodb
      
# Install composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
#install composer
# RUN php composer.phar install --ignore-platform-reqs

#set our application folder as an environment variable
ENV APP_HOME /var/www/html

#change uid and gid of apache to docker user uid/gid
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

#change the web_root to laravel /var/www/html/public folder
RUN sed -i -e "s/html/html\/public/g" /etc/apache2/sites-enabled/000-default.conf

# enable apache module rewrite
RUN a2enmod rewrite

#copy source files and run composer
COPY . $APP_HOME

# Verify that Composer is installed in your Docker container
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

# debugging line to check if the command is accessible
RUN composer --version

# install all PHP dependencies
RUN composer install --no-interaction  --ignore-platform-reqs

# RUN composer dump-autoload --optimize --classmap-authoritative

#change ownership of our applications
RUN chown -R www-data:www-data $APP_HOME

RUN php artisan key:generate

# Expose port
EXPOSE 80




