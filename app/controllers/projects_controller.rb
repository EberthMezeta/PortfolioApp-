class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_resume
  before_action :set_project, only: [ :show, :update, :destroy ]

  def index
    render json: @resume.projects
  end

  def show
    render json: @project
  end

  def create
    @project = @resume.projects.build(project_params)
    if @project.save
      render json: @project, status: :created # Devuelve el nuevo recurso con estado 201
    else
      render json: @project.errors, status: :unprocessable_entity # Devuelve errores con estado 422
    end
  end

  def update
    if @project.update(project_params)
      render json: @project # Devuelve el recurso actualizado
    else
      render json: @project.errors, status: :unprocessable_entity # Devuelve errores con estado 422
    end
  end

  def destroy
    @project.destroy
    head :no_content # Devuelve un 204 No Content
  end

  private

  def set_resume
    @resume = Resume.find(params[:resume_id]) # Encuentra el CV relacionado
  end

  def set_project
    @project = @resume.projects.find(params[:id]) # Encuentra el proyecto específico dentro del CV
  end

  def project_params
    params.require(:project).permit(:title, :description, :url) # Ajusta los atributos según tu modelo
  end
end
