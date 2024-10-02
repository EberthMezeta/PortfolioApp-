class SkillsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_resume
  before_action :set_skill, only: [ :show, :destroy ]

  def index
    render json: @resume.skills
  end

  def show
    render json: @skill
  end

  def create
    @skill = @resume.skills.build(skill_params)
    if @skill.save
      render json: @skill, status: :created
    else
      render json: @skill.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @skill.destroy
    head :no_content
  end

  private

  def set_resume
    @resume = Resume.find(params[:resume_id]) # Encuentra el CV relacionado
  end

  def set_skill
    @skill = @resume.skills.find(params[:id])
  end

  def skill_params
    params.require(:skill).permit(:name, :skill_type) # skill_type podría ser un campo que indica si es una habilidad técnica o blanda.
  end
end
