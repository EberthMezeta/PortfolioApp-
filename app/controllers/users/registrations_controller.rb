class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [ :create ]
  before_action :configure_account_update_params, only: [ :update ]
  before_action :authorize_admin!, only: [ :custom_create ] # Asegúrate de que solo admin pueda acceder a custom_create
  # Sobrescribir el método de creación
  #
  #


  def custom_index
      @users = User.all
      render "user_management/index"
  end

  # Mostrar formulario para crear un nuevo usuario
  def custom_view
    @user = User.new
    render "user_management/new"
  end

  def custom_edit
    @user = User.find(params[:id])
    render "user_management/edit"
  end


  def custom_update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to custom_index_path, notice: "¡Usuario actualizado exitosamente!"
    else
      render "user_management/edit", alert: "Hubo un error al actualizar el usuario."
    end
  end

# Eliminar un usuario
def custom_destroy
  @user = User.find(params[:id])

  if @user.destroy
    render json: { message: "Usuario eliminado exitosamente." }, status: :ok
  else
    render json: { error: "No se pudo eliminar el usuario." }, status: :unprocessable_entity
  end
end


  def custom_create
    @user = User.new(user_params)

    if @user.save
      # Inicia sesión al usuario si la creación fue exitosa
      redirect_to custom_index_path, notice: "¡Usuario registrado exitosamente!"
    else
      # Renderiza la vista de registro en caso de error
      redirect_to custom_view_path
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
  params.require(:user).permit(:email, :password, :password_confirmation, :role, :first_name, :last_name, :occupation)
end


  private

  def authorize_admin!
    puts "Rol del usuario actual: #{current_user.role}"
    authorize! :create,  User # Esto levantará una excepción si el usuario no tiene permiso
  end
end
