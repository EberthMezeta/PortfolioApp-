class ResumesController < ApplicationController
  before_action :authenticate_user!
 before_action :set_resume, only: [ :edit, :update, :destroy ]

  def index
    @resumes = current_user.resumes
    render json: @resumes
  end

  def show
    render json: @resume
  end

  def edit
    # Aquí no necesitas hacer nada, ya que el resume se establece en el before_action
  end

  def create
    @resume = current_user.resumes.build(resume_params)

    if @resume.save
      render json: { success: true, resume: @resume }, status: :created
    else
      render json: { error: @resume.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def update
    if @resume.update(resume_params)
      render json: @resume # Devuelve el recurso actualizado
    else
      render json: @resume.errors, status: :unprocessable_entity # Devuelve errores con estado 422
    end
  end

  def destroy
    if @resume.destroy
    respond_to do |format|
      format.json { head :no_content } # Responde con un estado 204 No Content
    end
    else
    respond_to do |format|
      format.json { render json: { error: "Failed to delete resume." }, status: :unprocessable_entity }
    end
    end
  end

  private

  def set_resume
    Rails.logger.debug "Currículum ID: #{params[:id]}"
    @resume = current_user.resumes.find_by(id: params[:id]) # Asegúrate de que el usuario tenga acceso al CV
  end

  def resume_params
    params.require(:resume).permit(:nombre) # Asegúrate de incluir los atributos correctos aquí
  end
end
