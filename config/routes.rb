Rails.application.routes.draw do
  resources :resumes do
    resources :experiences, only: [ :new, :create, :edit, :update, :destroy ]
    resources :skills, only: [ :new, :create, :destroy ]
    resources :projects, only: [ :new, :create, :destroy ]
    resources :contact_links, only: [ :new, :create, :destroy ]
    member do
      post "generate_public_link" # Ruta para generar el hash
    end
  end
  # Ruta para descargar el CV como PDF
  get "resumes/:id/download", to: "resumes#download", as: "download_resume"

  get "resumes/:id/public", to: "resumes#public", as: "public_resume"

  devise_for :users, controllers: { registrations: "users/registrations" }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  root "dashboard#index"
end
