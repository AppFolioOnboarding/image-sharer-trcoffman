Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    mount AfJsonApi.root_endpoint => '/' # Mount the API endpoint tree.
    mount AfJsonApi.documentation => '/' # Mount the API endpoint tree.
  end

  root 'home#index'

  # get '*path', to: 'home#index', constraints: ->(request) do
  #   !request.xhr? && request.format.html?
  # end
  get '/images*all', to: 'home#index'
end
