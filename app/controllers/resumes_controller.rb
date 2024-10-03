class ResumesController < ApplicationController
before_action :authenticate_user!, except: [ :public ]
 before_action :set_resume, only: [ :edit, :update, :destroy, :generate_public_link ]

  def index
    @resumes = current_user.resumes
    render json: @resumes
  end

  def show
    @resume = Resume.find(params[:id])
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

  def download
     @resume = Resume.find(params[:id]) # Asegúrate de que este modelo esté definido y sea correcto.

    respond_to do |format|
     format.pdf do
        render pdf: "resume_#{@resume.id}", template: "resumes/show", formats: [ :html ], locals: { resume: @resume }
      end
    end
  end

def generate_public_link
  @resume = Resume.find(params[:id]) # Asegúrate de encontrar el currículum correcto

  if @resume.generate_hash_id
    render json: { success: true, message: "Enlace público generado con éxito.", url: public_resume_url(@resume.hash_id) }, status: :ok
  else
    render json: { success: false, message: "Error al generar el enlace público." }, status: :unprocessable_entity
  end
end

  # Acción para mostrar la versión pública del currículum
  def public
    @resume = Resume.find_by(hash_id: params[:id])
    if @resume.nil?
      redirect_to root_path, alert: "El currículum no existe."
    else
      render :show # Asegúrate de tener una vista llamada 'public.html.erb'
    end
  end

  private

  def set_resume
    @resume = current_user.resumes.find_by(id: params[:id]) # Asegúrate de que el usuario tenga acceso al CV
  end

  def resume_params
    params.require(:resume).permit(:nombre) # Asegúrate de incluir los atributos correctos aquí
  end
end
