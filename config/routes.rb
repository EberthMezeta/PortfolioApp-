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

   devise_scope :user do
    get "users/custom_view", to: "users/registrations#custom_view", as: :custom_view

    post "users/custom_create", to: "users/registrations#custom_create", as: "custom_create_user"
    get "users", to: "users/registrations#custom_index", as: :custom_index

    # Ruta para mostrar el formulario de creación de usuario


    # Ruta para editar un usuario
    get "users/:id/edit", to: "users/registrations#custom_edit", as: :custom_edit_user

    # Ruta para actualizar un usuario
    patch "users/:id", to: "users/registrations#custom_update", as: :custom_update_user
    put "users/:id", to: "users/registrations#custom_update"

   # Ruta para eliminar un usuario
   delete "users/:id", to: "users/registrations#custom_destroy", as: :custom_destroy_user
   end

  #  get "user_management", to: "user_management#index", as: "user_management_index"
  # get "user_management/new", to: "user_management#new", as: "new_user_management"
  # post "user_management", to: "user_management#create", as: "create_user_management"
  # get "user_management/:id", to: "user_management#show", as: "user_management"
  # get "user_management/:id/edit", to: "user_management#edit", as: "edit_user_management"
  # patch "user_management/:id", to: "user_management#update"
  # delete "user_management/:id", to: "user_management#destroy"

  # resources :users
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
