class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :resumes, dependent: :destroy



  def admin?
    role == "admin" # o el valor que estés usando para el rol de administrador
  end
end
