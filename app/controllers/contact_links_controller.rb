class ContactLinksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_resume
  before_action :set_contact_link, only: [ :show, :destroy ]

  def index
    render json: @resume.contact_links
  end

  def show
    render json: @contact_link
  end

  def create
    @contact_link = @resume.contact_links.build(contact_link_params)
    if @contact_link.save
      render json: @contact_link, status: :created
    else
      render json: @contact_link.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @contact_link.destroy
    head :no_content
  end

  private

  def set_resume
    @resume = Resume.find(params[:resume_id])
  end

  def set_contact_link
    @contact_link = @resume.contact_links.find(params[:id])
  end

  def contact_link_params
    params.require(:contact_link).permit(:platform, :url)
  end
end
