require 'af_json_api/orm_adapters/active_record'

Rails.application.config.to_prepare do
  AfJsonApi.setup do |config|
    #
    # API Base URL. Used when generating links to API resources
    #
    config.base_url = -> { '/api' }

    #
    # The API orm adapter to use when processing data. This configuration
    # uses the ActiveRecord ORM.
    config.orm_adapter = AfJsonApi::OrmAdapters::ActiveRecord.new

    #
    # Namespaces to search for API resource classes. This allows the API to automatically
    # look up resources by class name.
    #
    config.resource_namespaces = [
      'Api::Resources::V1'
    ]

    #
    # The API root endpoint class. This tells the API documentation where to look for
    # endpoints.
    #
    config.root_endpoint = Api::V1::Root

    #
    # API documentation configuration
    #
    config.documentation_title = 'Image Sharer Pro'
    config.documentation_description = <<~DESCRIPTION
      <div>
        A detailed description that can include HTML markup.
      </div>
    DESCRIPTION
  end
end
