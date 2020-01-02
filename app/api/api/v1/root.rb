
module Api
  module V1
    class Root < AfJsonApi::Base
      version :v1, using: :accept_version_header

      mount Images
    end
  end
end
