module Api
  module V1
    class Images < AfJsonApi::Base
      resources :images do
        desc 'Get all images.'
        get do
          present ::Image.all

        end

        desc 'Get one image.'
        params do
          requires :id, type: Integer, desc: 'Image ID.'
        end
        route_param :id do
          get do
            present ::Image.find(params[:id])
          end
        end

        desc 'Create an image.'
        # params do
        #   requires :url, type: String, desc: 'URL of image.'
        # end
        post do
          attrs = params[:data][:attributes]
          image = ::Image.create!({
                                   url: attrs[:url],
                              })
          present image
        end

      end
    end
  end
end
