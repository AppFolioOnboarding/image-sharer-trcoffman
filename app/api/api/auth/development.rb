module Api
  module Auth
    class Development
      def initialize(app)
        @app = app
      end
      def call(env)
        env['af_json_api.authenticated'] = true
        @app.call(env)
      end
    end
  end
end
