Rails.application.routes.draw do
  root to: 'feeds#index'

  resources :users do
    resources :feeds
  end
  
end
