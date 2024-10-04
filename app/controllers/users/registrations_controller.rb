class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [ :create ]
  before_action :configure_account_update_params, only: [ :update ]
   before_action :authorize_admin!, only: [ :custom_create ] # Asegúrate de que solo admin pueda acceder a custom_create
  # Sobrescribir el método de creación
  #

  def custom_view
    @user = User.new
    render "user_management/new"
  end

  def custom_create
    @user = User.new(user_params)

    if @user.save
      # Inicia sesión al usuario si la creación fue exitosa
      redirect_to root_path, notice: "¡Usuario registrado exitosamente!"
    else
      # Renderiza la vista de registro en caso de error
      puts "eg"
    end
  end

  protected

  # Permitir campos adicionales en el registro
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name, :occupation, :role ])
  end

  # Permitir campos adicionales en la actualización de cuenta
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [ :first_name, :last_name, :occupation ])
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role)
  end

  private

  def authorize_admin!
    puts "Rol del usuario actual: #{current_user.role}"
    authorize! :create, User # Esto levantará una excepción si el usuario no tiene permiso
  end
end
