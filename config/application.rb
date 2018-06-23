require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Skeleton
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.action_cable.url = ENV['WEB_SOCKET_URL'] + '/cable' 
    config.load_defaults 5.2
    config.paths['app/views'].unshift("app/frontend")
    config.autoload_paths += ['lib/']

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
