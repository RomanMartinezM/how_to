# Use the official PHP image
FROM php:8.1-apache
# Use the official PHP image
#RUN docker-php-ext-install pdo_mysql

# Copy Laravel project to the container
COPY . /var/www/html

# Set working directory
WORKDIR /var/www/html

#install all the system dependencies and enable PHP modules 
RUN apt-get update && apt-get install -y \
      libicu-dev \
      libpq-dev \
      libmcrypt-dev \
      git \
      zip \
      unzip \
    && rm -r /var/lib/apt/lists/* \
    && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-install \
      intl \
      mbstring \
      mcrypt \
      pcntl \
      pdo_mysql \
      pdo_pgsql \
      pgsql \
      zip \
      opcache \
      mongodb

# Install composer dependencies
#install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
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

# install all PHP dependencies
RUN composer install --no-interaction

# RUN composer dump-autoload --optimize --classmap-authoritative

#change ownership of our applications
RUN chown -R www-data:www-data $APP_HOME

RUN php artisan key:generate

# Expose port
EXPOSE 80




