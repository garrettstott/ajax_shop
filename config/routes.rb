Rails.application.routes.draw do

  root 'products#index'

  resources :products

  get '/product_card', to: 'products#product_card'
end
