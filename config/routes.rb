Rails.application.routes.draw do
  root to: 'home#home'
  resources :lists do
    resources :tasks do
      member do
        patch 'check'
      end
    end
  end
end
