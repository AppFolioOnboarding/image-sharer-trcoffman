Rails.application.config.to_prepare do
  Grape::Middleware::Auth::Strategies.add(:development, Api::Auth::Development)
  AfJsonApi::Base.send(:include, Api::Auth::Injections)
end
