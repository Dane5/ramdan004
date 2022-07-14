Rails.application.routes.draw do
  resources :meals
  resources :users
  delete "/meal", to: "meals#destroy"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
end
