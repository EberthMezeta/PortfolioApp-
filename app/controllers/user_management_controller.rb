# app/controllers/user_management_controller.rb
class UserManagementController < ApplicationController
  load_and_authorize_resource class: User

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end


def create
  puts params.inspect
  @user = User.new(user_params)
  if @user.save
    redirect_to user_management_index_path, notice: "Usuario creado exitosamente."
  else
    flash[:alert] = "Hubo un error al crear el usuario."
    render :new
  end
end


  def edit
    @user = User.find(params[:id])
  end

  def update
    if @user.update(user_params)
      redirect_to user_path(@user), notice: "Usuario actualizado exitosamente."
    else
      render :edit
    end
  end

  def destroy
    @user.destroy
    redirect_to users_url, notice: "Usuario eliminado exitosamente."
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role)
  end
end
