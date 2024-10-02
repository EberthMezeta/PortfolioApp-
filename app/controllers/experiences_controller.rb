class ExperiencesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_resume
  before_action :set_experience, only: [ :show, :update, :destroy ]

  def index
    render json: @resume.experiences
  end

  def show
    render json: @experience
  end

  def create
    @experience = @resume.experiences.build(experience_params)
    if @experience.save
      render json: @experience, status: :created
    else
      render json: @experience.errors, status: :unprocessable_entity
    end
  end

  def update
    if @experience.update(experience_params)
      render json: @experience
    else
      render json: @experience.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @experience.destroy
    head :no_content
  end

  private

  def set_resume
    @resume = Resume.find(params[:resume_id])
  end

  def set_experience
    @experience = @resume.experiences.find(params[:id])
  end

  def experience_params
    params.require(:experience).permit(:job_title, :company, :start_date, :end_date, :description)
  end
end
