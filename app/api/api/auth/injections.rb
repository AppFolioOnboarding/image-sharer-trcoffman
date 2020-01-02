module Api
  module Auth
    module Injections
      extend ActiveSupport::Concern
      included do
        #
        # Allow authentication as arbitrary users in development mode
        #
        auth :development if Rails.env.development?
      end
    end
  end
end
