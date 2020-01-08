module Api
  module Resources
    module V1
      class Image < AfJsonApi::Resource
        version :v1
        type 'image'

        attribute :url
        attribute :tag_list
        attribute :created_at
        attribute :updated_at
      end
    end
  end
end
