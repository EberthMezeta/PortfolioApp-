class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @resumes = current_user.resumes

    respond_to do |format|
      format.html # Renderiza la vista por defecto (puedes eliminar esto si no quieres la vista HTML)
      format.json { render json: @resumes }
    end
  end
end
